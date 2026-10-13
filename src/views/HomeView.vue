<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/AppBaseButton.vue'
import BaseBadge from '@/components/ui/AppBaseBadge.vue'
import ContactMenu from '@/components/ContactMenu.vue'
import { useHomeAnimation } from '@/composables/useHomeAnimation.js'

const GITHUB_USER = 'haikallfzikra'
const EMAIL = 'soulsindeks@gmail.com'
const WHATSAPP = ''
const CV_URL = ''

const contact = {
  email: EMAIL,
  whatsapp: WHATSAPP,
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

const root = ref(null)
const { enterRow, leaveRow, skip, playing } = useHomeAnimation(root)
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
                class="caret absolute right-[0.01em] bottom-[0.1em] top-[0.12em] w-[0.03em] bg-black opacity-0"
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
            <ContactMenu :email="contact.email" :whatsapp="contact.whatsapp" />
          </div>
          <div class="cta-item">
            <BaseButton
              variant="outline"
              :href="contact.github"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </BaseButton>
          </div>
          <div v-if="CV_URL" class="cta-item">
            <BaseButton variant="outline" :href="CV_URL" download aria-label="Unduh CV">
              CV
            </BaseButton>
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

    <BaseButton
      v-if="playing"
      variant="outline"
      size="sm"
      class="fixed bottom-4 right-4 z-30"
      @click="skip"
    >
      Lewati animasi
    </BaseButton>
  </div>
</template>
