<template>
  <div data-theme="dark" class="overflow-y-hidden h-screen">
    <NavBar>
      <template v-slot:nav-link>
        <div class="flex items-center gap-2">
          <button class="btn btn-ghost hover:text-red-400">
            <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
          </button>
          <button class="btn hover:text-green-400">
            <v-icon name="ri-save-3-line" />
            <h2 class="hidden md:block">Save Changes</h2>
          </button>
          <button class="btn">Preview</button>
        </div>
      </template>
    </NavBar>
    <MarkdownParser />
  </div>
</template>

<script setup>
import MarkdownParser from '@/components/MarkdownParser.vue'
import NavBar from '@/components/NavBar.vue'
// import Sidebar from '@/components/SideBar.vue'
</script>

<style lang="scss" scoped></style>
