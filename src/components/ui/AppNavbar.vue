<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/ui/AppBaseButton.vue'

defineProps({
  brand: { type: String, required: true },
  links: { type: Array, default: () => [] },
  cta: { type: Object, default: null },
})
</script>

<template>
  <header class="border-b border-black bg-[#f4f4f0]">
    <nav
      class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3"
      aria-label="Utama"
    >
      <RouterLink to="/" class="text-xl font-bold text-black">{{ brand }}</RouterLink>

      <ul class="hidden items-center gap-6 sm:flex">
        <li v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" class="font-medium text-black underline-offset-4 hover:underline">
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>

      <BaseButton v-if="cta" :href="cta.href" size="sm" variant="pink">
        {{ cta.label }}
      </BaseButton>
    </nav>
  </header>
</template>
