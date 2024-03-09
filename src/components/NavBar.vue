<template>
  <Sidebar :is-sidebar-open="isSidebarOpen">
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
      <nav class="flex justify-between">
        <div class="flex items-center p-2">
          <SwapIcon :swap="true" @toggle="toggleSidebar">
            <template #swap-off>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
            </template>
            <template #swap-on>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </template>
          </SwapIcon>
          <router-link to="/">
            <h1 class="text-2xl font-bold pl-5 hover:scale-110 transition-all duration-300">
              Markable
            </h1>
          </router-link>
        </div>

        <div class="flex items-center p-2 justify-center">
          <slot name="nav-link"></slot>
        </div>
      </nav>
      <MarkdownParser />
    </template>
  </Sidebar>

  <div class="bg-primary" v-show="isSidebarOpen">
    <h1>TEST</h1>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SwapIcon from './SwapIcon.vue'
import Sidebar from './SideBar.vue'
import MarkdownParser from '@/components/MarkdownParser.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
watch(isSidebarOpen, () => {
  // console.log(isSidebarOpen.value)
})
</script>

<style lang="scss" scoped>

</style>
