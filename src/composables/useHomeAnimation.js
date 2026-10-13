import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { shouldPlayIntro, markIntroSeen } from '@/composables/introState.js'

const TYPE_STEP = 0.08
const SLOW = 1.1
const HOVER = 0.5

const canAnimate = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useHomeAnimation(root) {
  const playing = ref(false)
  let mm = null
  let ready = false
  let tl = null
  let blink = null

  function enterRow(e) {
    if (!ready) return
    const li = e.currentTarget
    const fill = li.querySelector('.fill')
    const content = li.querySelector('.row-content')
    const d = canAnimate() ? HOVER : 0
    gsap.set(fill, { transformOrigin: '0% 50%' })
    gsap.to(fill, { scaleX: 1, duration: d, ease: 'power3.out', overwrite: true })
    gsap.to(li, { color: '#fff', duration: d })
    gsap.to(content, { x: canAnimate() ? 12 : 0, duration: d, ease: 'power3.out' })
  }

  function leaveRow(e) {
    if (!ready) return
    const li = e.currentTarget
    const fill = li.querySelector('.fill')
    const content = li.querySelector('.row-content')
    const d = canAnimate() ? HOVER : 0
    gsap.set(fill, { transformOrigin: '100% 50%' })
    gsap.to(fill, { scaleX: 0, duration: d, ease: 'power3.out', overwrite: true })
    gsap.to(li, { color: '#000', duration: d })
    gsap.to(content, { x: 0, duration: d, ease: 'power3.out' })
  }

  function syncHover() {
    root.value.querySelectorAll('.row').forEach((li) => {
      if (li.matches(':hover')) enterRow({ currentTarget: li })
    })
  }

  function skip() {
    if (!tl) return
    blink?.kill()
    tl.progress(1)
    gsap.set(gsap.utils.selector(root.value)('.caret'), { autoAlpha: 0 })
  }

  const onPointer = () => skip()
  const onKey = (e) => {
    if (e.key === 'Escape') skip()
  }

  function removeSkipListeners() {
    window.removeEventListener('pointerdown', onPointer)
    window.removeEventListener('keydown', onKey)
  }

  onMounted(() => {
    const q = gsap.utils.selector(root.value)

    gsap.set(q('.fill'), { scaleX: 0 })

    const play = shouldPlayIntro()
    ready = !canAnimate() || !play
    mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!play) return

      const chars = q('.ch')
      const carets = q('.caret')
      tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          ready = true
          playing.value = false
          markIntroSeen()
          removeSkipListeners()
          syncHover()
        },
      })
      playing.value = true
      window.addEventListener('pointerdown', onPointer)
      window.addEventListener('keydown', onKey)

      gsap.set(chars, { autoAlpha: 0 })
      const start = 0.2
      chars.forEach((c, i) => {
        const t = start + i * TYPE_STEP
        tl.set(c, { autoAlpha: 1 }, t)
        tl.set(carets[i], { autoAlpha: 1 }, t)
        if (i > 0) tl.set(carets[i - 1], { autoAlpha: 0 }, t)
      })

      const lastCaret = carets[carets.length - 1]
      const lastT = start + (chars.length - 1) * TYPE_STEP
      blink = gsap.to(lastCaret, {
        autoAlpha: 0,
        duration: 0.45,
        repeat: 5,
        yoyo: true,
        ease: 'steps(1)',
        delay: lastT + 0.2,
        onComplete: () => gsap.set(lastCaret, { autoAlpha: 0 }),
      })

      tl.from(q('.intro'), { opacity: 0, y: 12, duration: 0.6 * SLOW }, '+=0.05')
        .from(
          q('.cta-item'),
          {
            opacity: 0,
            y: 12,
            duration: 0.5 * SLOW,
            stagger: 0.18,
            clearProps: 'transform,opacity',
          },
          '-=0.3',
        )
        .from(
          q('.sec-work'),
          { opacity: 0, x: -16, duration: 0.5 * SLOW, clearProps: 'transform,opacity' },
          '-=0.2',
        )
        .from(
          q('.line'),
          {
            scaleX: 0,
            transformOrigin: '0% 50%',
            duration: 0.8 * SLOW,
            stagger: 0.2,
            ease: 'power2.inOut',
          },
          '<0.1',
        )
        .from(
          q('.row-content'),
          { opacity: 0, duration: 0.5 * SLOW, stagger: 0.18, clearProps: 'opacity' },
          '<0.2',
        )
        .from(
          q('.sec-tech'),
          { opacity: 0, x: -16, duration: 0.5 * SLOW, clearProps: 'transform,opacity' },
          '-=0.3',
        )
        .from(
          q('.tech'),
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4 * SLOW,
            stagger: 0.1,
            ease: 'back.out(2)',
            clearProps: 'transform,opacity',
          },
          '<0.2',
        )

      return () => {
        removeSkipListeners()
        playing.value = false
      }
    })
  })

  onUnmounted(() => {
    mm?.revert()
  })

  return { enterRow, leaveRow, skip, playing }
}
