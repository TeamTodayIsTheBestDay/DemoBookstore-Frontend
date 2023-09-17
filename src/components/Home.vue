<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Book } from "../model/quicktype/Book.ts"
import axios from "axios"
import BookComponent from "./BookComponent.vue"
import { useRouter } from "vue-router"

const books = ref<Book[]>([])
const router = useRouter()

onMounted(() => {
  axios.get("https://book.cinea.cc/book").then((res) => {
    books.value = res.data
    console.log(books.value)
  })
})

const goTOBookDetailWsy = () => {
  router.push("/DetailWsy")
}

const goTOBookManageWsy = () => {
  router.push("/ManageWsy")
}
</script>

<template>
  <a-card>
    <h1 class="text-2xl font-bold">欢迎来到小书店!</h1>
    <a-divider />
    <a-space wrap>
      <BookComponent v-for="book in books" :book="book" :key="book.id" />
    </a-space>
  </a-card>
  <div :style="{ background: 'rgb(190, 200, 200)', padding: '16px 16px' }">
    <a-space>
      <a-button type="primary" ghost @click="goTOBookDetailWsy">wsy的图书详情页</a-button>
    </a-space>
  </div>
  <div :style="{ background: 'rgb(190, 200, 200)', padding: '16px 16px' }">
    <a-space>
      <a-button type="primary" ghost @click="goTOBookManageWsy">wsy的图书管理页</a-button>
    </a-space>
  </div>
</template>

<style scoped></style>
