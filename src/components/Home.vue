<script setup lang="ts">
import {onMounted, ref} from "vue"
import {Book} from "../model/quicktype/Book.ts"
import axios from "axios"
import BookComponent from "./BookComponent.vue"
import {ImportOutlined} from '@ant-design/icons-vue';
import BackStage from "./BackStageComponent.vue";
import addBook from "./addBook.vue";

const books = ref<Book[]>([])

const BF = ref<Boolean>(false)

const changeCom = () => {
  BF.value = !BF.value
}

onMounted(() => {
  axios.get("/book").then((res) => {
    books.value = res.data
    console.log(books.value)
  })
})
</script>

<template>
  <a-card>
    <a-row class="flex flex-row">
      <h1 class="text-2xl font-bold" v-if="!BF">欢迎来到小书店!</h1>
      <h1 class="text-2xl font-bold basis-4/5" style="width: 500px" v-else>这里是后台</h1>
      <div class="basis-1/5 flex items-center">
        <addBook v-if="BF" />
      </div>
    </a-row>
    <a-divider/>
    <a-space wrap>
      <BookComponent v-if="!BF" v-for="book in books" :book="book" :key="book.id"/>
      <BackStage v-else v-for="book in books" :book="book" :key="book.id"/>
    </a-space>
    <a-float-button @click="changeCom">
      <template #icon>
        <ImportOutlined/>
      </template>
    </a-float-button>
  </a-card>
</template>

<style scoped></style>
