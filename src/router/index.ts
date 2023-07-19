import { createRouter, createWebHistory } from 'vue-router'
import EventCardsView from '../components/EventCardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cards',
      component: EventCardsView
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../components/EventTable.vue')
    }
  ]
})

export default router
