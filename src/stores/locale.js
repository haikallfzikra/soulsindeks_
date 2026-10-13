import { ref } from 'vue'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null
export const locale = ref(stored === 'en' ? 'en' : 'id')

export function setLocale(value) {
  locale.value = value === 'en' ? 'en' : 'id'
  try {
    localStorage.setItem('locale', locale.value)
    document.documentElement.lang = locale.value
  } catch {
    // abaikan: storage/document tak tersedia (private mode/SSR)
  }
}

try {
  document.documentElement.lang = locale.value
} catch {
  // abaikan: document tak tersedia (SSR)
}
