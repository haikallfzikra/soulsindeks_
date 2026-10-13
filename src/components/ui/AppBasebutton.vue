<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'pink' },
  size: { type: String, default: 'md' },
  href: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})

// Jadi <a> kalau ada href, selain itu <button>
const tag = computed(() => (props.href ? 'a' : 'button'))

const variants = {
  pink: 'bg-[#ff90e8] text-black',
  yellow: 'bg-[#ffc900] text-black',
  teal: 'bg-[#23a094] text-black',
  dark: 'bg-black text-white',
  outline: 'bg-white text-black',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :type="href ? undefined : type"
    :disabled="!href && disabled"
    :aria-disabled="disabled || undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded border border-black font-semibold',
      'transition-[transform,box-shadow] duration-100 motion-reduce:transition-none',
      'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]',
      'active:translate-x-0 active:translate-y-0 active:shadow-none',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
      'disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
    ]"
  >
    <slot />
  </component>
</template>
