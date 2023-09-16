import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"

import "./helper/axios.ts"
import router from "./helper/router.ts"

createApp(App).use(router).mount("#app")
