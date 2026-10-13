import { describe, it, expect } from 'vitest'

import { projects, getProject } from '../data/projects.js'
import routes from '../router/routes.js'

describe('projects', () => {
  it('finds a known slug', () => {
    expect(getProject('aqms')?.title).toBe('AQMS')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProject('tidak-ada')).toBeUndefined()
  })

  it('every project has a slug', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const p of projects) expect(p.slug).toBeTruthy()
  })

  it('has index and detail routes under /proyek', () => {
    const proyek = routes[0].children.find((r) => r.path === 'proyek')
    expect(proyek.children.map((r) => `${r.path}:${r.name}`).sort()).toEqual([
      ':Projects',
      ':slug:Project',
    ])
  })
})
