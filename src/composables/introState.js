const KEY = 'intro-seen'

export function shouldPlayIntro() {
  if (import.meta.env.DEV) return true
  try {
    if (new URLSearchParams(window.location.search).has('intro')) return true
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    return
  }
}
