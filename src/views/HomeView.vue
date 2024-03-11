<template>
  <div data-theme="dark" class="overflow-y-hidden h-screen">
    <SideBar :is-sidebar-open="isSidebarOpen">
      <template v-slot:sidebar-content>
        <div>
          <div class="flex justify-center mt-4"><h1 class="text-2xl">My Document</h1></div>
          <div class="flex justify-center mt-4">
            <button class="flex items-center bg-cyan-600 px-4 py-2 rounded-md text-white">
              + New Document
            </button>
          </div>
        </div>
      </template>
      <template v-slot:main-content>
        <NavBar @toggle-sidebar="toggleSidebar">
          <template v-slot:nav-link>
            <div class="flex items-center gap-2">
              <button class="btn btn-ghost hover:text-red-400">
                <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
              </button>
              <button class="btn hover:text-green-400">
                <v-icon name="ri-save-3-line" />
                <h2 class="hidden md:block">Save Changes</h2>
              </button>
              <button class="btn" @click="openPreview"
                >Preview</button>
            </div>
          </template>
        </NavBar>
        <MarkdownParser v-model:title="title" v-model:content="content" @passParsedMd = "setParsedMarkdown"/>
      </template>
    </SideBar>
  </div>
</template>

<script setup>
import MarkdownParser from '@/components/MarkdownParser.vue'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const isSidebarOpen = ref(false)

let parsedMarkdown = ref('')
const setParsedMarkdown = (md) => {
  if(md === undefined){
    return
  }
  parsedMarkdown.value = md
}

const router = useRouter()
function openPreview() {
  const routeData = router.resolve({ name: 'preview', params:{document: title.value, parsedMarkdown: (parsedMarkdown.value === '') ? ' ' : encodeURI(parsedMarkdown.value.value)}})
  window.open(routeData.href)
}

const title = ref('untitled')
const content = ref('')

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style lang="scss" scoped></style>
