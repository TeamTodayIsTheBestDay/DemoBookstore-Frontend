<script setup lang="ts">
import { ref } from "vue"
import { Book } from "../../model/quicktype/Book.ts"
import axios from "axios"

const book = ref<Book>({
  id: 0,
  name: "",
  photo: "",
  author: "",
  press: "",
  publishYear: new Date().getFullYear(),
  isbn: "",
  intro: "",
})
const submitForm = async (event: Event) => {
  event.preventDefault() // 防止页面刷新
  try {
    const response = await axios.put("/book", book.value)

    if (response.status !== 200) {
      throw new Error("Network response was not ok")
    }

    console.log(response.data)
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error)
  }
}
const open = ref<boolean>(true) //ref，用于控制Modal显示还是隐藏
const showModal = () => {
  open.value = true
}
//这个方法用来隐藏Modal
const closeModal = () => {
  open.value = false
}
</script>

<template>
  <div>
    <a-modal title="增加书籍" v-model:open="open" @cancel="closeModal" :width="800" @ok="closeModal">
      <a-form @submit="submitForm">
        <a-form-item label="书名">
          <a-input v-model:value="book.name" placeholder="请输入书名" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="book.author" placeholder="请输入作者" />
        </a-form-item>
        <a-form-item label="出版社">
          <a-input v-model:value="book.press" placeholder="请输入出版社" />
        </a-form-item>
        <a-form-item label="出版年份">
          <a-input-number v-model:value="book.publishYear" />
        </a-form-item>
        <a-form-item label="ISBN">
          <a-input v-model:value="book.isbn" placeholder="请输入ISBN" />
        </a-form-item>
        <a-form-item label="简介">
          <a-textarea v-model:value="book.intro" placeholder="请输入简介" />
        </a-form-item>
        <a-form-item label="图片链接">
          <a-input v-model:value="book.photo" placeholder="请输入图片链接" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
