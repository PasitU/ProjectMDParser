<template>
  <nav class="flex justify-between">
    <div class="flex items-center p-2">
      <v-icon name="co-hamburger-menu" scale="2" />
    </div>
    <div class="flex items-center p-2 justify-center">
      <div class="flex items-center gap-2">
        <button class="btn btn-ghost">
          <v-icon name="ri-delete-bin-5-fill" />
        </button>
        <button class="btn">
          <v-icon name="ri-save-3-line" />
          <h2 class="text-xl md:hidden">Save</h2>
        </button>
        <button class="btn">Preview</button>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped></style>
