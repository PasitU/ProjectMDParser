<script setup>
defineProps({
  content: {
    type: String
  }
})
</script>

<template>
  <article
    v-html="content"
    class="p-5 preview min-w-full bg-base-300 h-screen prose-slate prose overflow-y-auto overflow-x-hidden"
  ></article>
</template>

<style></style>
