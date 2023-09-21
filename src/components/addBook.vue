<script setup lang="ts">
import {reactive, ref} from "vue";
import {Book} from "../model/quicktype/Book.ts";
import axios from "axios";
import {FormInstance} from "ant-design-vue";

const open_add = ref<Boolean>(false)
const loading = ref<Boolean>(false)
const buttonActive = ref<Boolean>(true)

let newbook = reactive<Book>({
  id: 0,
  name: '',
  photo: '',
  author: '',
  press: '',
  publishYear: 0,
  isbn: '',
  intro: '',
})

const addModal = () => {
  open_add.value = true
}

const addBook = (newbook: Book) => {
  buttonActive.value = !buttonActive.value  // 关闭按钮
  loading.value = true
  axios.put("/book", newbook).then(
      (res) => {
        if (res.data) {
          console.log(res.data)  // 成功添加后重新获得书籍信息
          window.location.reload()
        }
      }
  )
  setTimeout(() => {
    open_add.value = false
    loading.value = false
  }, 2000)
}

const newBook = ref<FormInstance>()

const reset = () => {
  newBook.value?.resetFields()
}
</script>

<template>
  <a-button type="primary" @click="addModal">添加</a-button>
  <a-modal v-model:open="open_add" title="添加书本" @cancel="reset">
    <template #footer>
      <a-button type="primary" :loading="loading" @click="addBook(newbook)">更新</a-button>
    </template>
    <a-form :model="newbook" ref="newBook" autocomplete="off" :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }" name="newbook">
      <a-form-item label="书名" name="name">
        <a-input v-model="newbook.name"/>
      </a-form-item>
      <a-form-item label="作者" name="author">
        <a-input v-model="newbook.author"/>
      </a-form-item>
      <a-form-item label="出版年份" name="publishYear">
        <a-input v-model="newbook.publishYear"/>
      </a-form-item>
      <a-form-item label="出版社" name="press">
        <a-input v-model="newbook.press"/>
      </a-form-item>
      <a-form-item label="ISBN" name="isbn">
        <a-input v-model="newbook.isbn"/>
      </a-form-item>
      <a-form-item label="简介" name="intro">
        <a-textarea :rows="5" v-model="newbook.intro"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>

</style>