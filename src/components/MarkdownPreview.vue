<script setup>
defineProps({
  content: {
    type: String
  }
})
</script>

<template>
  <article v-html="content"></article>
</template>

<style></style>
