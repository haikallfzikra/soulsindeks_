<script setup>
defineProps({
  color: { type: String, default: 'yellow' },
})

const colors = {
  yellow: 'bg-[#ffc900]',
  pink: 'bg-[#ff90e8]',
  teal: 'bg-[#23a094]',
  white: 'bg-white',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full border border-black px-2.5 py-0.5 text-xs font-semibold text-black',
      colors[color],
    ]"
  >
    <slot />
  </span>
</template>
