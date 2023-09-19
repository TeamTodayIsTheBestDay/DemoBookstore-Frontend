import Home from "../components/Home.vue"
import AddBook from "../components/BookManagement/AddBook.vue"
import ModifyBook from "../components/BookManagement/ModifyBook.vue"
import DeleteBook from "../components/BookManagement/DeleteBook.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/add",
    component: AddBook, //图书管理页面
  },
  {
    path: "/modify",
    component: ModifyBook, //图书管理页面
  },
  {
    path: "/delete",
    component: DeleteBook, //图书管理页面
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
