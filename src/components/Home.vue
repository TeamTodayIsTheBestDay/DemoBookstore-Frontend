<script setup lang="ts">
import { onMounted, ref } from "vue"
import { Book } from "../model/quicktype/Book.ts"
import axios from "axios"
import BookComponent from "./BookComponent.vue"

const books = ref<Book[]>([])

onMounted(() => {
  axios.get("/book").then((res) => {
    books.value = res.data
    console.log(books.value)
  })
})
</script>

<template>
  <a-card>
    <h1 class="text-2xl font-bold">欢迎来到小书店</h1>
    <a-divider />
    <a-space wrap>
      <BookComponent v-for="book in books" :book="book" :key="book.id" />
    </a-space>
  </a-card>
</template>

<style scoped></style>
