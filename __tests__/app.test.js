import { mount, createLocalVue } from '@vue/test-utils'
import App from './../src/App.vue'
import Documents from './../src/views/Documents.vue'
import RecycleBin from './../src/views/RecycleBin.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import router from "@/router/index.js"
Vue.use(Vuetify)

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App tests', () => {

    let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })


 test('Is a Vue Instance', () => {
        const wrapper = mount(App,{
            localVue,
            vuetify,
            router})

        expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('Renders a child component via routing', async () => {
    const wrapper = mount(App, { 
      localVue,
      vuetify,
      router
    })
    router.push('/recycleBin')
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(RecycleBin).exists()).toBe(true)
  })
})