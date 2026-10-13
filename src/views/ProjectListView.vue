<script setup>
import { RouterLink } from 'vue-router'
import BaseBadge from '@/components/ui/AppBaseBadge.vue'
import { projects, projText } from '@/data/projects.js'
import { strings } from '@/i18n/strings.js'

// Navigasi ala menu pilih game: panah pindah kartu, Enter buka (bawaan RouterLink).
// shortcut: jumlah kolom hardcode mengikuti grid di bawah (sm:2, lg:3).
const onKey = (e, i) => {
  const w = window.innerWidth
  const cols = w >= 1024 ? 3 : w >= 640 ? 2 : 1
  const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key]
  if (step === undefined) return
  e.preventDefault()
  const next = Math.min(Math.max(i + step, 0), projects.length - 1)
  document.querySelectorAll('[data-card]')[next]?.focus()
}
</script>

<template>
  <main class="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6 sm:py-8 lg:max-w-6xl lg:px-8">
    <RouterLink to="/" class="w-fit font-semibold underline underline-offset-4">
      {{ strings.back }}
    </RouterLink>

    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-bold lg:text-3xl">{{ strings.pickTitle }}</h1>
      <p class="text-sm text-black/60">{{ strings.pickHint }}</p>
    </div>

    <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(p, i) in projects" :key="p.slug" class="h-full">
        <RouterLink
          :to="{ name: 'Project', params: { slug: p.slug } }"
          data-card
          @keydown="(e) => onKey(e, i)"
          class="flex h-full flex-col overflow-hidden rounded border border-black bg-white transition-[transform,box-shadow] duration-100 motion-reduce:transition-none hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] focus-visible:-translate-x-1 focus-visible:-translate-y-1 focus-visible:shadow-[4px_4px_0_0_#000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
          <div class="relative aspect-video w-full border-b border-black bg-[#f4f4f0]">
            <img
              v-if="p.image"
              :src="p.image"
              :alt="p.title"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-5xl font-bold text-black/20"
              aria-hidden="true"
            >
              {{ p.title.charAt(0) }}
            </div>
            <span
              class="absolute left-2 top-2 rounded border border-black bg-[#ffc900] px-2 py-0.5 text-xs font-bold"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>

          <div class="flex flex-1 flex-col gap-2 p-4">
            <h2 class="font-bold">{{ p.title }}</h2>
            <p class="text-sm leading-relaxed text-black/70">{{ projText(p) }}</p>
            <ul v-if="p.tags.length" class="mt-auto flex flex-wrap gap-2 pt-2">
              <li v-for="tag in p.tags" :key="tag">
                <BaseBadge color="yellow">{{ tag }}</BaseBadge>
              </li>
            </ul>
          </div>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
