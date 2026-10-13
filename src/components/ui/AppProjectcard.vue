<script setup>
import BaseCard from './AppBasecard.vue'
import BaseBadge from './AppBaseBadge.vue'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  href: String,
  image: String,
})
</script>

<template>
  <BaseCard :href="href" class="flex h-full flex-col gap-4 !p-0 overflow-hidden">
    <div v-if="image" class="aspect-video w-full border-b border-black bg-[#f4f4f0]">
      <img :src="image" :alt="title" class="h-full w-full object-cover" loading="lazy" />
    </div>
    <div class="flex flex-1 flex-col gap-3 p-5">
      <h3 class="text-lg font-semibold leading-snug">{{ title }}</h3>
      <p class="text-sm leading-relaxed text-black/70">{{ description }}</p>
      <ul v-if="tags.length" class="mt-auto flex flex-wrap gap-2 pt-2">
        <li v-for="tag in tags" :key="tag">
          <BaseBadge color="yellow">{{ tag }}</BaseBadge>
        </li>
      </ul>
    </div>
  </BaseCard>
</template>
