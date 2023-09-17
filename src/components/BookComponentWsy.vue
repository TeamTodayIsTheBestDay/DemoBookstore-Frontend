<script setup lang="ts">
import { Book } from "../model/quicktype/Book.ts"
import { ref, watch } from "vue"

const activeKey = ref(["1"])

watch(activeKey, (val) => {
  console.log(val)
})
interface Props {
  book: Book
}

const props = defineProps<Props>()
</script>

<template>
  <a-card class="wsy-container">
    <div class="flex">
      <a-image :src="book.photo" style="height: 250px; width: 150px" class="object-contain" />
      <div class="mx-5">
        <h2 class="font-normal text-xl">{{ book.name }}</h2>
        <p class="text-gray-400">{{ book.author }} 著</p>
        <p class="text-gray-400">{{ book.publishYear }}年</p>
        <p class="text-gray-400">{{ book.press }}</p>
        <p class="text-gray-400">ISBN编号 {{ book.isbn }}</p>
        <p>
          <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="0" header="简介">
              <div style="max-height: 200px; overflow: scroll">
                <p>{{ book.intro }}</p>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </p>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.wsy-container {
  background: #ffeeee; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ddefbb, #ffeeee); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ddefbb,
    #ffeeee
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
