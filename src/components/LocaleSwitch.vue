<script setup>
import { locale, setLocale } from '@/stores/locale.js'
</script>

<template>
  <div
    class="fixed right-4 top-4 z-30 flex overflow-hidden rounded border border-black bg-white text-sm font-bold"
    role="group"
    aria-label="Language / Bahasa"
  >
    <button
      type="button"
      class="px-3 py-1.5"
      :class="locale === 'id' ? 'bg-black text-white' : ''"
      :aria-pressed="locale === 'id'"
      @click="setLocale('id')"
    >
      ID
    </button>
    <button
      type="button"
      class="border-l border-black px-3 py-1.5"
      :class="locale === 'en' ? 'bg-black text-white' : ''"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>
