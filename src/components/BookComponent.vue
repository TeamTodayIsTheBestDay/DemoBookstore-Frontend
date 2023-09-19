<script setup lang="ts">
import { Book } from "../model/quicktype/Book.ts"
import { ref } from "vue"
interface Props {
  book: Book
}
const open = ref<boolean>(false) //ref，用于控制Modal显示还是隐藏
//这个方法用来显示Modal
const showModal = () => {
  open.value = true
}
//这个方法用来隐藏Modal
const closeModal = () => {
  open.value = false
}
const props = defineProps<Props>()
</script>

<template>
  <a-card @click="showModal">
    <div class="flex">
      <a-image :src="book.photo" :preview="false" style="height: 250px; width: 150px" class="object-contain" />
      <div class="mx-5">
        <h2 class="font-normal text-xl">{{ book.name }}</h2>
        <p class="text-gray-400">{{ book.author }} 著</p>
        <p class="text-gray-400">{{ book.publishYear }}年</p>
        <p class="text-gray-400">{{ book.press }}</p>
      </div>
    </div>
    <!--这里用于点击图片后展示图书详情-->
    <a-modal title="书籍详情" v-model:open="open" @cancel="closeModal" :width="800" @ok="closeModal">
      <div class="flex">
        <a-image :src="book.photo" style="height: 250px; width: 150px" class="object-contain mr-5" />
        <div>
          <p><strong>书名：</strong>{{ book.name }}</p>
          <p><strong>作者：</strong>{{ book.author }}</p>
          <p><strong>出版社：</strong>{{ book.press }}</p>
          <p><strong>出版年份：</strong>{{ book.publishYear }}</p>
          <p><strong>ISBN：</strong>{{ book.isbn }}</p>
          <p><strong>简介：</strong>{{ book.intro }}</p>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<style scoped></style>
