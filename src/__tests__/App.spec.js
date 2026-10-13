import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import routes from '../router/routes.js'

describe('App', () => {
  it('mounts renders properly', async () => {
    window.matchMedia ??= () => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    })
    const router = createRouter({ history: createWebHistory(), routes })
    router.push('/')
    await router.isReady()
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: { BackgroundField: { template: '<div />' } },
      },
    })
    expect(wrapper.find('main').exists()).toBe(true)
  })
})
