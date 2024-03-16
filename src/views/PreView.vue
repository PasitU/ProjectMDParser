<script setup>
import MarkdownPreview from '@/components/markdown/MarkdownPreview.vue'
defineProps({
  parsedMarkdown: {
    type: String,
    required: true
  }
})
</script>

<template>
  <MarkdownPreview
    :content="decodeURI(parsedMarkdown)"
    :class="'md:mx-auto md:min-w-[45rem]'"
  ></MarkdownPreview>
</template>

<style scoped></style>
