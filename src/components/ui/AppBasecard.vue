<script setup>
defineProps({
  interactive: { type: Boolean, default: false },
  href: { type: String, default: undefined },
})
</script>

<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="[
      'block rounded-md border border-black bg-white p-5 text-black',
      (interactive || href) && [
        'transition-[transform,box-shadow] duration-100 motion-reduce:transition-none',
        'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
      ],
    ]"
  >
    <slot />
  </component>
</template>
