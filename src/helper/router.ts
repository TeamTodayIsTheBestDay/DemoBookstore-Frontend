import Home from "../components/Home.vue"
import BookDetailWsy from "../components/BookDetailWsy.vue"
import BookManageWsy from "../components/BookManageWsy.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  { path: "/", component: Home },
  { path: "/DetailWsy", component: BookDetailWsy },
  { path: "/ManageWsy", component: BookManageWsy },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
