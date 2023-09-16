<script setup lang="ts"></script>

<template>
  <div class="content-container">
    <div class="bg-white border-b-gray-300 border-b-2" style="height: 60px">
      <div class="flex h-full items-center">
        <span class="mx-5 font-bold">Demo小书店</span>
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
