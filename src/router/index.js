import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/entry',
    name: 'Entry',
    component: () => import('../views/Entry.vue')
  },
  {
    path: '/prvoTromjesecje',
    name: 'PrvoTromjesecje',
    component: () => import('../views/PrvoTromjesecje.vue')
  },
  {
    path: '/drugoTromjesecje',
    name: 'DrugoTromjesecje',
    component: () => import('../views/DrugoTromjesecje.vue')
  },
  {
    path: '/treceTromjesecje',
    name: 'TreceTromjesecje',
    component: () => import('../views/TreceTromjesecje.vue')
  },
  {
    path: '/mojDnevnik',
    name: 'MojDnevnik',
    component: () => import('../views/MojDnevnik.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
