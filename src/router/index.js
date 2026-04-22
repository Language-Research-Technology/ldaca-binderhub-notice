import { createRouter, createWebHistory } from 'vue-router'
import NoticeView from '../views/NoticeView.vue'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notice',
    component: NoticeView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
