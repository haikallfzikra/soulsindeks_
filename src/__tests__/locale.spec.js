import { describe, it, expect } from 'vitest'

import { locale, setLocale } from '../stores/locale.js'
import { strings } from '../i18n/strings.js'
import { getProject, projText } from '../data/projects.js'

describe('locale', () => {
  it('defaults to Indonesian', () => {
    setLocale('id')
    expect(locale.value).toBe('id')
    expect(strings.value.projectsTitle).toBe('Proyek')
  })

  it('switches strings to English', () => {
    setLocale('en')
    expect(strings.value.projectsTitle).toBe('Projects')
    expect(projText(getProject('aqms'))).toBe('Sensor-based air quality monitoring system.')
    setLocale('id')
  })

  it('falls back to Indonesian text without textEn', () => {
    setLocale('en')
    expect(projText({ text: 'Halo', textEn: '' })).toBe('Halo')
    setLocale('id')
  })
})
