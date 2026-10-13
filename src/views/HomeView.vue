<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import BaseButton from '@/components/ui/AppBaseButton.vue'
import BaseBadge from '@/components/ui/AppBaseBadge.vue'

const GITHUB_USER = 'haikallfzikra'

const contact = {
  email: 'mailto:soulsindeks@gmail.com',
  github: `https://github.com/${GITHUB_USER}`,
}

const headline = ['Halo,', 'saya', 'Haikal.']

const projects = [
  {
    title: 'AQMS',
    text: 'Sistem pemantauan kualitas udara berbasis data sensor.',
    tags: [],
    href: '',
  },
  {
    title: 'WQMS',
    text: 'Sistem pemantauan kualitas air berbasis data sensor.',
    tags: [],
    href: '',
  },
  {
    title: 'Report Data',
    text: 'Pelaporan data untuk memantau nilai hasil pengukuran.',
    tags: [],
    href: '',
  },
  {
    title: 'Pemantauan ISPU',
    text: 'Grafik untuk memantau Indeks Standar Pencemar Udara (ISPU).',
    tags: [],
    href: '',
  },
]

const stack = [
  'Flutter',
  'Go',
  'Python',
  'Vue',
  'Ubuntu',
  'JavaScript',
  'MySQL',
  'Docker',
  'Git',
  'GitHub',
  'Linux',
]

const TYPE_STEP = 0.08
const SLOW = 1.1
const HOVER = 0.5

const root = ref(null)
let mm = null
let ready = false

const canAnimate = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

onMounted(() => {
  const q = gsap.utils.selector(root.value)

  gsap.set(q('.fill'), { scaleX: 0 })

  ready = !canAnimate()
  mm = gsap.matchMedia()
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const chars = q('.ch')
    const carets = q('.caret')
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        ready = true
        syncHover()
      },
    })

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
    gsap.to(lastCaret, {
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
        { opacity: 0, y: 12, duration: 0.5 * SLOW, stagger: 0.18, clearProps: 'transform,opacity' },
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
  })
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <div ref="root" class="flex min-h-dvh items-center">
    <main
      class="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:py-8 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8"
    >
      <section class="flex flex-col gap-4 sm:gap-6">
        <h1
          class="text-[clamp(2.25rem,min(11vw,9vh),5rem)] font-bold leading-[1.05] tracking-tight"
          aria-label="Halo, saya Haikal."
        >
          <span
            v-for="(word, i) in headline"
            :key="i"
            aria-hidden="true"
            class="mr-[0.25em] inline-block"
          >
            <span v-for="(ch, j) in word" :key="j" class="relative inline-block">
              <span class="ch">{{ ch }}</span>
              <span
                class="caret absolute -right-[0.05em] bottom-[0.1em] top-[0.12em] w-[0.06em] bg-black opacity-0"
              ></span>
            </span>
          </span>
        </h1>

        <p class="intro text-base leading-relaxed sm:text-lg lg:text-xl">
          Saya software developer di sekitar Bandung. Saya membuat aplikasi mobile, layanan backend,
          dan sistem pemantauan lingkungan.
        </p>

        <div class="flex flex-wrap gap-3">
          <div class="cta-item">
            <BaseButton variant="dark" :href="contact.email">Hubungi saya</BaseButton>
          </div>
          <div class="cta-item">
            <BaseButton variant="outline" :href="contact.github">GitHub</BaseButton>
          </div>
        </div>
      </section>

      <div class="flex flex-col gap-6 sm:gap-8">
        <section class="flex flex-col gap-3">
          <h2 class="sec-work text-xl font-bold lg:text-2xl">Proyek</h2>
          <div>
            <div class="line h-px bg-black"></div>
            <ul>
              <li
                v-for="item in projects"
                :key="item.title"
                class="row relative overflow-hidden"
                @pointerenter="enterRow"
                @pointerleave="leaveRow"
                @focusin="enterRow"
                @focusout="leaveRow"
              >
                <div class="fill absolute inset-0 bg-black"></div>
                <component
                  :is="item.href ? 'a' : 'div'"
                  :href="item.href || undefined"
                  :target="item.href ? '_blank' : undefined"
                  :rel="item.href ? 'noopener noreferrer' : undefined"
                  class="row-content relative z-10 flex flex-col gap-1 px-4 py-3 focus-visible:outline-none"
                >
                  <h3 class="font-semibold">{{ item.title }}</h3>
                  <p
                    class="text-sm leading-relaxed opacity-70 sm:text-base [@media(max-height:760px)_and_(max-width:1023px)]:hidden"
                  >
                    {{ item.text }}
                  </p>
                  <ul v-if="item.tags.length" class="mt-1 hidden flex-wrap gap-2 lg:flex">
                    <li v-for="tag in item.tags" :key="tag">
                      <BaseBadge color="white">{{ tag }}</BaseBadge>
                    </li>
                  </ul>
                </component>
                <div class="line absolute inset-x-0 bottom-0 h-px bg-black"></div>
              </li>
            </ul>
          </div>
        </section>

        <section class="flex flex-col gap-3">
          <h2 class="sec-tech text-xl font-bold lg:text-2xl">Teknologi yang saya pakai</h2>
          <ul class="flex flex-wrap gap-2">
            <li v-for="t in stack" :key="t" class="tech">
              <BaseBadge color="white">{{ t }}</BaseBadge>
            </li>
          </ul>
        </section>
      </div>
    </main>
  </div>
</template>
