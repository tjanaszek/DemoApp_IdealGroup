import Vue from 'vue'
import VueRouter from 'vue-router'
import Documents from '../views/Documents.vue'
import RecycleBin from '../views/RecycleBin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Documents',
    component: Documents
  },
  {
    path: '/recycleBin',
    name: 'RecycleBin',
    component: RecycleBin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
