<script setup lang="ts">
import BookComponent from "./BookComponent.vue";
import {Book} from "../model/quicktype/Book";
import {ref} from "vue";
import {Modal, Result} from "ant-design-vue";

interface Props {
  book: Book
}

const open = ref<Boolean>(false)
const loading = ref<Boolean>(false)

const prop = defineProps<Props>()

const openModal = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  loading.value = true
  setTimeout(() => {
    open.value = false
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <a-button type="primary" @click="openModal">Preview</a-button>
    <div class="flex">
      <a-modal v-model:open="open" width="80em" :title="book.name" :centered="true" @ok="handleOk">
        <template #footer>
          <a-button key="buy" type="primary" :loading="loading" @click="handleOk">Buy it, Just Buy it!</a-button>
        </template>
        <a-card>
          <div class="flex">
            <a-image :src="book.photo" style="height: 250px; width: 150px" class="object-contain" />
            <div class="mx-5">
              <h2 class="font-normal text-xl">{{ book.name }}</h2>
              <p class="text-gray-400">{{ book.author }} 著</p>
              <p class="text-gray-400">{{ book.publishYear }}年 {{ book.press }}</p>
              <p class="text-gray-400">{{book.intro}}</p>
            </div>
          </div>
        </a-card>
      </a-modal>
    </div>
  </div>
</template>

<style scoped>

</style>