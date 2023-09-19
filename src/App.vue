<script setup lang="ts">
import { h, ref } from "vue"
import { MenuProps } from "ant-design-vue"
import { useRouter } from "vue-router"
const current = ref<string[]>(["BookShow"])
const router = useRouter()
const items = ref<MenuProps["items"]>([
  {
    key: "BookShow",
    label: "图书展示",
    title: "图书展示",
    onClick: () => router.push("/"),
  },
  {
    key: "BookManagement",
    label: "图书管理",
    title: "图书管理",
    onClick: () => router.push("/add"),
    children: [
      {
        key: "AddBooks",
        label: "增加书籍",
        title: "增加书籍",
        onClick: () => router.push("/add"),
      },
      {
        key: "ModifyBook",
        label: "修改书籍信息",
        title: "修改书籍信息",
        onClick: () => router.push("/modify"),
      },
      {
        key: "DeleteBook",
        label: "删除书籍",
        title: "删除书籍",
        onClick: () => router.push("/delete"),
      },
    ],
  },
])
</script>

<template>
  <div class="content-container">
    <div class="bg-white border-b-gray-300 border-b-2" style="height: 60px">
      <div class="flex h-full items-center">
        <a-menu mode="horizontal" v-model:selectedKeys="current" :items="items"> </a-menu>
      </div>
    </div>
    <div class="flex">
      <div class="grow" />
      <div class="m-5" style="width: 1024px">
        <router-view />
      </div>
      <div class="grow" />
    </div>
  </div>
</template>

<style scoped>
.content-container {
  background: #b3ffab; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #12fff7, #b3ffab); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #12fff7,
    #b3ffab
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
}
</style>
