<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { shouldPlayIntro } from '@/composables/introState.js'

const canvas = ref(null)

const GAP_DESKTOP = 40
const GAP_MOBILE = 32
const BASE_ALPHA = 0.05
const LINE_ALPHA = 0.3
const DOT_ALPHA = 0.6
const STOPS = 8
const FADE_DELAY = 1.6

const cursor = { x: -9999, y: -9999 }
const state = { strength: 0 }

let ctx = null
let width = 0
let height = 0
let radius = 220
let xs = []
let ys = []
let basePath = null
let active = false
let running = false
let resizeFrame = 0
let moveX = null
let moveY = null

function build() {
  const el = canvas.value
  width = el.clientWidth
  height = el.clientHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(width * dpr)
  el.height = Math.round(height * dpr)
  ctx = el.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const gap = width < 640 ? GAP_MOBILE : GAP_DESKTOP
  radius = Math.min(220, Math.max(width, height) * 0.22)

  const cols = Math.floor(width / gap) + 1
  const rows = Math.floor(height / gap) + 1
  const x0 = (width - (cols - 1) * gap) / 2
  const y0 = (height - (rows - 1) * gap) / 2
  xs = Array.from({ length: cols }, (_, c) => Math.round(x0 + c * gap) + 0.5)
  ys = Array.from({ length: rows }, (_, r) => Math.round(y0 + r * gap) + 0.5)

  basePath = new Path2D()
  xs.forEach((x) => {
    basePath.moveTo(x, 0)
    basePath.lineTo(x, height)
  })
  ys.forEach((y) => {
    basePath.moveTo(0, y)
    basePath.lineTo(width, y)
  })
}

function falloff(d, r) {
  if (d >= r) return 0
  const t = 1 - d / r
  return t * t * (3 - 2 * t)
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = 1
  ctx.strokeStyle = `rgba(0, 0, 0, ${BASE_ALPHA})`
  ctx.stroke(basePath)

  const k = state.strength
  if (k <= 0.001) return
  const cx = cursor.x
  const cy = cursor.y

  for (const x of xs) {
    const dx = cx - x
    if (Math.abs(dx) >= radius) continue
    const h = Math.sqrt(radius * radius - dx * dx)
    const g = ctx.createLinearGradient(0, cy - h, 0, cy + h)
    for (let i = 0; i <= STOPS; i++) {
      const f = i / STOPS
      const a = falloff(Math.hypot(dx, (f * 2 - 1) * h), radius) * LINE_ALPHA * k
      g.addColorStop(f, `rgba(0, 0, 0, ${a})`)
    }
    ctx.strokeStyle = g
    ctx.beginPath()
    ctx.moveTo(x, cy - h)
    ctx.lineTo(x, cy + h)
    ctx.stroke()
  }

  for (const y of ys) {
    const dy = cy - y
    if (Math.abs(dy) >= radius) continue
    const h = Math.sqrt(radius * radius - dy * dy)
    const g = ctx.createLinearGradient(cx - h, 0, cx + h, 0)
    for (let i = 0; i <= STOPS; i++) {
      const f = i / STOPS
      const a = falloff(Math.hypot(dy, (f * 2 - 1) * h), radius) * LINE_ALPHA * k
      g.addColorStop(f, `rgba(0, 0, 0, ${a})`)
    }
    ctx.strokeStyle = g
    ctx.beginPath()
    ctx.moveTo(cx - h, y)
    ctx.lineTo(cx + h, y)
    ctx.stroke()
  }

  const dotRadius = radius * 0.75
  for (const x of xs) {
    if (Math.abs(cx - x) >= dotRadius) continue
    for (const y of ys) {
      const d = Math.hypot(cx - x, cy - y)
      if (d >= dotRadius) continue
      ctx.fillStyle = `rgba(0, 0, 0, ${falloff(d, dotRadius) * DOT_ALPHA * k})`
      ctx.fillRect(x - 1.5, y - 1.5, 3, 3)
    }
  }
}

function tick() {
  draw()
  if (!gsap.isTweening(cursor) && !gsap.isTweening(state)) stop()
}

function start() {
  if (running) return
  running = true
  gsap.ticker.add(tick)
}

function stop() {
  running = false
  gsap.ticker.remove(tick)
}

function onMove(e) {
  if (!active) {
    active = true
    gsap.set(cursor, { x: e.clientX, y: e.clientY })
    gsap.to(state, { strength: 1, duration: 0.5, ease: 'power2.out' })
  } else {
    moveX(e.clientX)
    moveY(e.clientY)
  }
  start()
}

function onDown(e) {
  if (e.pointerType === 'touch') onMove(e)
}

function release() {
  if (!active) return
  active = false
  gsap.to(state, { strength: 0, duration: 0.8, ease: 'power2.out' })
  start()
}

function onUp(e) {
  if (e.pointerType === 'touch') release()
}

function onResize() {
  cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(() => {
    build()
    draw()
  })
}

onMounted(() => {
  build()
  draw()
  window.addEventListener('resize', onResize)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(canvas.value, { opacity: 1 })
    return
  }

  moveX = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' })
  moveY = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' })

  const firstVisit = shouldPlayIntro()
  gsap.fromTo(
    canvas.value,
    { opacity: 0 },
    {
      opacity: 1,
      duration: firstVisit ? 1.4 : 0.6,
      delay: firstVisit ? FADE_DELAY : 0,
      ease: 'power1.out',
    },
  )

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onDown, { passive: true })
  window.addEventListener('pointerup', onUp, { passive: true })
  window.addEventListener('pointercancel', onUp, { passive: true })
  window.addEventListener('blur', release)
  document.documentElement.addEventListener('pointerleave', release)
})

onUnmounted(() => {
  stop()
  cancelAnimationFrame(resizeFrame)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerdown', onDown)
  window.removeEventListener('pointerup', onUp)
  window.removeEventListener('pointercancel', onUp)
  window.removeEventListener('blur', release)
  document.documentElement.removeEventListener('pointerleave', release)
  gsap.killTweensOf([cursor, state, canvas.value])
})
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0"
  ></canvas>
</template>
