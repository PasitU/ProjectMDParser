import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import {
  CoHamburgerMenu,
  RiSave3Line,
  BiEyeFill,
  RiDeleteBin5Fill,
  BiEyeSlashFill,
  CoList,
  MdLogin,
  FaEdit,
  CoUser,
  IoArrowBackOutline,
  MdArrowback,
  IoDocument,
  FaUserAlt
} from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'

addIcons(
  CoHamburgerMenu,
  RiDeleteBin5Fill,
  RiSave3Line,
  BiEyeFill,
  BiEyeSlashFill,
  CoList,
  MdLogin,
  FaEdit,
  CoUser,
  IoArrowBackOutline,
  MdArrowback,
  IoDocument,
  FaUserAlt
)
const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')
