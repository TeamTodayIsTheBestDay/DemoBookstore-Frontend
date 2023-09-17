<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"
import BookComponentWsy from "./BookComponentWsy.vue"
import { Book } from "../model/quicktype/Book.ts"

const textValue = ref<number>(0)
const book = ref<Book | null>(null)
const open = ref<boolean>(false)
const selectedBook = ref<Book | null>(null)
const editModalVisible = ref<boolean>(false)
//弹窗
const showModal = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
const onSearch = async (searchValue: number) => {
  console.log("use value", searchValue)

  try {
    const response = await axios.get(`https://book.cinea.cc/book/${searchValue}`)
    book.value = response.data
    console.log(book.value)
  } catch (error) {
    console.error(error)
  }
  if (book.value == null) {
    //这个条件一直进不去？？
    console.log(1)
    showModal()
  }
}

const onUpdate = () => {
  selectedBook.value = book.value
  editModalVisible.value = true
}

const onDelete = async (id: number) => {
  console.log("Delete button clicked")
  try {
    const response = await axios.delete(`https://book.cinea.cc/book?bookId=${id}`)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
//填修改信息
const onEditFinish = async (values: any) => {
  console.log("Edit Success:", values)
  try {
    console.log(values.newBook)
    const response = await axios.post("https://book.cinea.cc/book", values.newBook)
    // console.log(response.data)
    if (response.data == 1) {
      console.log(123)
      editModalVisible.value = false
      //infoSuccess() 弹窗不显示，不知道为啥
      message.info("修改成功")
    } else {
      //infoFail()
      message.info("修改失败")
    }
  } catch (error) {
    console.error(error)
    //infoFail()
    message.info("修改失败")
  }
}

//输入框
import { reactive } from "vue"
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const validateMessages = {
  required: "${label} is required!",
  types: {
    isbn: "${label} is not a valid ISBN!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}

const formState = reactive({
  newBook: {
    id: undefined,
    name: "",
    photo: "",
    isbn: "",
    author: "",
    press: "",
    publishYear: undefined,
    intro: "",
  },
})
const onFinish = async (values: any) => {
  console.log("Success:", values)
  try {
    console.log(values)
    const response = await axios.put("https://book.cinea.cc/book", values.newBook)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<script lang="ts">
import { message } from "ant-design-vue"

const [messageApi, contextHolder] = message.useMessage()

const infoSuccess = () => {
  messageApi.info("修改成功")
}

const infoFail = () => {
  messageApi.info("修改失败")
}
</script>

<template>
  <div>
    <p class="text-3xl font-bold">wsy的图书管理页面</p>
    <div>
      <p class="text-violet-200xl">请输入要修改或删除的图书编号</p>
      <a-space direction="vertical">
        <a-input-search
          v-model:value="textValue"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      </a-space>

      <a-row style="margin-left: 100px; margin-top: 30px; margin-bottom: 30px">
        <div v-if="book" class="book-container">
          <a-col :span="24">
            <div class="height-100">
              <BookComponentWsy :book="book" />
            </div>
          </a-col>
          <a-col :span="10">
            <div class="button-container height-50">
              <a-button ghost @click="onUpdate" style="margin-left: 100px; margin-top: 80px; margin-bottom: 50px"
                >修改</a-button
              >

              <a-button type="primary" danger ghost @click="onDelete(book.id)" style="margin-left: 100px"
                >删除</a-button
              >
            </div>
          </a-col>
        </div>
      </a-row>
    </div>
    <div>
      <p class="text-violet-200xl" style="margin-left: 100px; margin-top: 30px; margin-bottom: 30px">
        新加书目请输入如下信息
      </p>
      <div style="margin-left: -200px; margin-top: 30px; margin-bottom: 30px; margin-right: 100px">
        <a-form
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish"
        >
          <a-form-item :name="['newBook', 'id']" label="BookID" :rules="[{ required: true }]">
            <a-input-number v-model:value="formState.newBook.id" />
          </a-form-item>
          <a-form-item :name="['newBook', 'name']" label="BookName" :rules="[{ required: true }]">
            <a-input v-model:value="formState.newBook.name" />
          </a-form-item>
          <a-form-item :name="['newBook', 'photo']" label="Photourl" :rules="[{ type: 'url' }]">
            <a-input v-model:value="formState.newBook.photo" />
          </a-form-item>

          <a-form-item :name="['newBook', 'isbn']" label="ISBN" :rules="[{ type: 'string' }]">
            <a-input v-model:value="formState.newBook.isbn" />
          </a-form-item>
          <a-form-item :name="['newBook', 'publishYear']" label="Publishyear" :rules="[{ type: 'number' }]">
            <a-input-number v-model:value="formState.newBook.publishYear" />
          </a-form-item>

          <a-form-item :name="['newBook', 'author']" label="Author">
            <a-input v-model:value="formState.newBook.author" />
          </a-form-item>
          <a-form-item :name="['newBook', 'press']" label="Press">
            <a-input v-model:value="formState.newBook.press" />
          </a-form-item>
          <a-form-item :name="['newBook', 'intro']" label="Introduction">
            <a-textarea v-model:value="formState.newBook.intro" />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>

  <!--修改书籍-->
  <a-modal v-model:visible="editModalVisible" title="修改书籍信息" @ok="handleOk">
    <a-form
      :model="selectedBook"
      v-bind="layout"
      name="edit-messages"
      :validate-messages="validateMessages"
      @finish="onEditFinish"
    >
      <div>
        <a-form
          :model="formState"
          v-bind="layout"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onEditFinish"
        >
          <a-form-item :name="['newBook', 'id']" label="BookID" :rules="[{ required: true }]">
            <a-input-number v-model:value="formState.newBook.id" />
          </a-form-item>
          <a-form-item :name="['newBook', 'name']" label="BookName" :rules="[{ required: true }]">
            <a-input v-model:value="formState.newBook.name" />
          </a-form-item>
          <a-form-item :name="['newBook', 'photo']" label="Photourl" :rules="[{ type: 'url' }]">
            <a-input v-model:value="formState.newBook.photo" />
          </a-form-item>

          <a-form-item :name="['newBook', 'isbn']" label="ISBN" :rules="[{ type: 'string' }]">
            <a-input v-model:value="formState.newBook.isbn" />
          </a-form-item>
          <a-form-item :name="['newBook', 'publishYear']" label="Publishyear" :rules="[{ type: 'number' }]">
            <a-input-number v-model:value="formState.newBook.publishYear" />
          </a-form-item>

          <a-form-item :name="['newBook', 'author']" label="Author">
            <a-input v-model:value="formState.newBook.author" />
          </a-form-item>
          <a-form-item :name="['newBook', 'press']" label="Press">
            <a-input v-model:value="formState.newBook.press" />
          </a-form-item>
          <a-form-item :name="['newBook', 'intro']" label="Introduction">
            <a-textarea v-model:value="formState.newBook.intro" />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-form>
  </a-modal>
</template>

<style scoped>
.book-container {
  display: flex;
  justify-content: space-between;
}

.button-container {
  display: flex;
  flex-direction: column;
}
</style>
