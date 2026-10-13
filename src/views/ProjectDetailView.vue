<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BaseBadge from '@/components/ui/AppBaseBadge.vue'
import { getProject, projText } from '@/data/projects.js'
import { strings } from '@/i18n/strings.js'

const route = useRoute()
const router = useRouter()
const project = computed(() => getProject(route.params.slug))

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'Projects' })
}
</script>

<template>
  <main class="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6 sm:py-8 lg:max-w-3xl lg:px-8">
    <button
      type="button"
      class="w-fit cursor-pointer font-semibold underline underline-offset-4"
      @click="goBack()"
    >
      {{ strings.back }}
    </button>

    <template v-if="project">
      <div
        class="aspect-video w-full overflow-hidden rounded border border-black bg-[#f4f4f0]"
      >
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="h-full w-full object-cover"
        />
        <div
          v-else
          class="flex h-full w-full items-center justify-center text-5xl font-bold text-black/20"
          aria-hidden="true"
        >
          {{ project.title.charAt(0) }}
        </div>
      </div>

      <h1 class="text-2xl font-bold lg:text-3xl">{{ project.title }}</h1>
      <p class="leading-relaxed text-black/70">{{ projText(project) }}</p>

      <ul v-if="project.tags.length" class="flex flex-wrap gap-2">
        <li v-for="tag in project.tags" :key="tag">
          <BaseBadge color="yellow">{{ tag }}</BaseBadge>
        </li>
      </ul>
    </template>

    <p v-else class="leading-relaxed">
      {{ strings.notFound }}
      <RouterLink to="/" class="underline underline-offset-4">{{ strings.backHome }}</RouterLink>
    </p>
  </main>
</template>
