<script setup>
import BackgroundField from '@/components/BackgroundField.vue'
import LocaleSwitch from '@/components/LocaleSwitch.vue'
</script>

<template>
  <div class="min-h-dvh text-black">
    <BackgroundField />
    <LocaleSwitch />
    <router-view />
  </div>
</template>
