<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"

const bookId = ref<number | null>(null)

const submitForm = async () => {
  if (bookId.value === null) {
    console.error("书籍ID是必须的")
    return
  }

  try {
    //const response = await axios.delete(`/book/delete?bookId=${bookId.value}`)
    const response = await axios.delete(`/book/delete?bookId=${bookId.value}`)

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
    <a-modal title="删除书籍" v-model:open="open" @cancel="closeModal" :width="800" @ok="closeModal">
      <a-form @submit="submitForm">
        <a-form-item label="书籍ID">
          <a-input v-model:value="bookId" placeholder="请输入书籍ID" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">删除</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
