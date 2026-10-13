<script setup>
defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  id: String,
  error: String,
})

const model = defineModel({ type: String })
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-semibold text-black">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :aria-invalid="!!error || undefined"
      class="rounded border border-black bg-white px-3 py-2.5 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#ff90e8] focus:ring-offset-0 aria-[invalid=true]:border-red-600"
    />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>
