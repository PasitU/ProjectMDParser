import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { CoHamburgerMenu, RiSave3Line } from "oh-vue-icons/icons";
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiDeleteBin5Fill } from "oh-vue-icons/icons";

addIcons(CoHamburgerMenu, RiDeleteBin5Fill, RiSave3Line)
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')