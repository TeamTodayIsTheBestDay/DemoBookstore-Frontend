<script setup lang="ts">
import { Book } from "../model/quicktype/Book.ts"
import Preview from "./Preview.vue";

interface Props {
  book: Book
}

const props = defineProps<Props>()
</script>

<template>
  <a-card>
    <div class="flex">
      <a-image :src="book.photo" style="height: 250px; width: 150px" class="object-contain" />
      <div class="mx-5">
        <h2 class="font-normal text-xl">{{ book.name }}</h2>
        <p class="text-gray-400">{{ book.author }} 著</p>
        <p class="text-gray-400">{{ book.publishYear }}年</p>
        <p class="text-gray-400">{{ book.press }}</p>
        <Preview :book="book" />
      </div>
    </div>
  </a-card>
</template>

<style scoped></style>
