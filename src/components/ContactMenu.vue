<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/AppBaseButton.vue'

const props = defineProps({
  email: { type: String, required: true },
  whatsapp: { type: String, default: '' },
  message: {
    type: String,
    default: 'Halo Haikal, saya melihat portofoliomu dan ingin berdiskusi.',
  },
})

const open = ref(false)
const status = ref('idle')
const wrap = ref(null)
let timer = 0

const itemClass =
  'flex w-full flex-col rounded px-3 py-2 text-left text-sm font-semibold text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none'

const mailUrl = computed(() => `mailto:${props.email}`)

const whatsappUrl = computed(() => {
  const digits = props.whatsapp.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  return `https://wa.me/${intl}?text=${encodeURIComponent(props.message)}`
})

const copyLabel = computed(
  () => ({ idle: 'Salin email', copied: 'Tersalin', failed: 'Gagal, salin manual' })[status.value],
)

function close(returnFocus = false) {
  open.value = false
  if (returnFocus) wrap.value?.querySelector('button')?.focus()
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
    document.body.appendChild(el)
    el.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    el.remove()
    return ok
  }
}

async function copy() {
  const ok = await copyText(props.email)
  status.value = ok ? 'copied' : 'failed'
  clearTimeout(timer)
  timer = setTimeout(() => {
    status.value = 'idle'
    if (ok) close()
  }, 1400)
}

function onPointerDown(e) {
  if (open.value && !wrap.value.contains(e.target)) close()
}

function onKeyDown(e) {
  if (e.key === 'Escape' && open.value) close(true)
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  clearTimeout(timer)
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div ref="wrap" class="relative">
    <BaseButton
      variant="dark"
      :aria-expanded="open"
      aria-controls="contact-panel"
      @click="open = !open"
    >
      Hubungi saya
    </BaseButton>

    <Transition
      enter-active-class="transition duration-150 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <ul
        v-if="open"
        id="contact-panel"
        class="absolute left-0 top-full z-20 mt-3 w-64 rounded-md border border-black bg-white p-1 shadow-[4px_4px_0_0_#000]"
      >
        <li>
          <button type="button" :class="itemClass" @click="copy">
            <span>{{ copyLabel }}</span>
            <span class="text-xs font-normal opacity-70">{{ email }}</span>
          </button>
        </li>
        <li>
          <a :href="mailUrl" :class="itemClass" @click="close()">
            <span>Kirim email</span>
            <span class="text-xs font-normal opacity-70">Buka aplikasi email</span>
          </a>
        </li>
        <li v-if="whatsapp">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            :class="itemClass"
            @click="close()"
          >
            <span>WhatsApp</span>
            <span class="text-xs font-normal opacity-70">Kirim pesan langsung</span>
          </a>
        </li>
      </ul>
    </Transition>

    <span class="sr-only" role="status">{{ status === 'copied' ? 'Email tersalin' : '' }}</span>
  </div>
</template>
