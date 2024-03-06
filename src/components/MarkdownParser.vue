<script setup>
import { parseToMarkdown, initialText } from '@/utils/parser'
import { ref, onMounted, onUpdated } from 'vue'
const markdown = ref(initialText)

const parsedMarkdown = ref('')

onMounted(parseMarkdown)
onUpdated(parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = parseToMarkdown(markdown.value)
}
</script>

<template>
  <section class="grid grid-cols-2 justify-center">
    <div class="flex flex-col h-screen border-r-2 border-base-100">
      <h2 class="text-center bg-base-200 p-2 text-2xl">Markdown</h2>
      <textarea
        class="bg-base-300 leading-relaxed h-screen border-none resize-none outline-none break-words overflow-y-auto p-4"
        v-model="markdown"
      />
    </div>
    <div class="flex flex-col">
      <h2 class="text-center bg-base-200 p-2 text-2xl">Preview</h2>
      <article
        class="p-5 preview w-full bg-base-300 min-w-full h-screen prose-slate prose overflow-y-auto"
        v-html="parsedMarkdown"
      ></article>
    </div>
  </section>
</template>

<style scoped>
  .preview {
    height: calc(100vh - 7rem);
  }
</style>
