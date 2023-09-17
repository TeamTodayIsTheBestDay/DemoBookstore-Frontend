<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Book } from "../model/quicktype/Book.ts"
import axios from "axios"
import BookComponentWsy from "./BookComponentWsy.vue"

const books = ref<Book[]>([])

onMounted(() => {
  axios.get("https://book.cinea.cc/book").then((res) => {
    books.value = res.data
    console.log(books.value)
  })
})
</script>

<template>
  <div>
    <p class="text-2xl font-bold">wsy的图书详情页面</p>
    <a-divider />
    <a-space wrap>
      <BookComponentWsy v-for="book in books" :book="book" :key="book.id" />
    </a-space>
  </div>
  <!--改个配色-->
</template>

<style scoped></style>
