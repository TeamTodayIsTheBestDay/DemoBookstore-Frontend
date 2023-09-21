<script setup lang="ts">
import axios from "axios"
import {Book} from "../model/quicktype/Book.ts"
import {reactive, ref} from "vue";
import {FormInstance} from "ant-design-vue";

interface Props {
  book: Book,
}

const prop = defineProps<Props>()

const open_update = ref<Boolean>(false)
const loading = ref<Boolean>(false)
const buttonActive = ref<Boolean>(true)

const nullBook = {
    id: prop.book.id,
    name: '',
    photo: '',
    author: '',
    press: '',
    publishYear: 0,
    isbn: '',
    intro: '',
}

let newbook = reactive<Book>({
  id: prop.book.id,
  name: '',
  photo: '',
  author: '',
  press: '',
  publishYear: 0,
  isbn: '',
  intro: '',
})

const updateModal = () => {
  open_update.value = true
}

const updateBook = (newbook: Book) => {
  buttonActive.value = !buttonActive.value  // 关闭按钮
  loading.value = true
  axios.post("/book", newbook).then(
      (res) => {
        if (res.data) {
          console.log(res.data)  // 更新后重新获得书籍信息
          window.location.reload()
        }
      }
  )
  setTimeout(() => {
    open_update.value = false
    loading.value = false
  }, 2000)
}

const deleteBook = (book: Book) => {
  axios.delete("/book", {
    params: {
      bookId: book.id,
    }
  }).then(
      (res) => {
        if (res.data) {
          console.log(res.data)  // 删除后重新获得书籍信息
          window.location.reload()
        }
      }
  )
}

const newBook = ref<FormInstance>()

const reset = () => {
  newbook = nullBook;
  newBook.value?.resetFields()
}
</script>

<template>
  <a-row>
    <a-card class="flex">
      <div class="mx-5">
        <h2 class="font-normal text-xl">{{ book.name }}</h2>
        <p class="text-gray-400">{{ book.author }} 著</p>
        <p class="text-gray-400">{{ book.publishYear }}年</p>
        <p class="text-gray-400">{{ book.press }}</p>
        <p class="text-gray-400">{{ book.intro }}</p>
        <a-button type="primary" @click="updateModal">更新</a-button>
        <a-modal v-model:open="open_update" title="更新书本信息" @cancel="reset">
          <template #footer>
            <a-button type="primary" :loading="loading" @click="updateBook(newbook)">更新</a-button>
          </template>
          <a-form :model="newbook" ref="newBook" autocomplete="off" :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 16 }" name="newbook">
            <a-form-item label="书名" name="name">
              <a-input v-model="newbook.name" :placeholder="book.name"/>
            </a-form-item>
            <a-form-item label="作者" name="author">
              <a-input v-model="newbook.author" :placeholder="book.author"/>
            </a-form-item>
            <a-form-item label="出版年份" name="publishYear">
              <a-input v-model="newbook.publishYear" :placeholder="book.publishYear"/>
            </a-form-item>
            <a-form-item label="出版社" name="press">
              <a-input v-model="newbook.press" :placeholder="book.press"/>
            </a-form-item>
            <a-form-item label="ISBN" name="isbn">
              <a-input v-model="newbook.isbn" :placeholder="book.isbn"/>
            </a-form-item>
            <a-form-item label="简介" name="intro">
              <a-textarea :rows="5" v-model="newbook.intro" :placeholder="book.intro"/>
            </a-form-item>
          </a-form>
        </a-modal>
        <a-button class="mx-2" type="primary" @click="deleteBook(book)" danger>删除</a-button>
      </div>
    </a-card>
  </a-row>
</template>

<style scoped>

</style>