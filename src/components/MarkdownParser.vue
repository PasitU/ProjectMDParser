<script setup>
import { parseToMarkdown, initialText } from '@/utils/parser'
import { ref, onMounted, watch } from 'vue'
import SwapIcon from './SwapIcon.vue'
const markdown = ref(initialText)

const parsedMarkdown = ref('')

onMounted(parseMarkdown)

watch(markdown, parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = parseToMarkdown(markdown.value)
}
</script>

<template>
  <section>
    <div class="bg-base-300 flex justify-end px-2">
      <SwapIcon>
        <template #swap-off>
          <v-icon name="bi-eye-fill" />
        </template>
        <template #swap-on>
          <v-icon name="bi-eye-slash-fill" />
        </template>
      </SwapIcon>
    </div>
  </section>
  <section class="grid grid-cols-2 justify-center">
    <div class="flex flex-col h-screen border-r-2 border-base-100">
      <h2 class="bg-base-200 p-2 text-xl">Markdown</h2>
      <textarea
        class="bg-base-300 preview leading-relaxed border-none resize-none outline-none break-words overflow-y-scroll p-4"
        v-model="markdown"
      />
    </div>
    <div class="flex flex-col">
      <h2 class="bg-base-200 p-2 text-xl">Preview</h2>
      <article
        class="p-5 preview w-full bg-base-300 min-w-full h-screen prose-slate prose overflow-y-auto"
        v-html="parsedMarkdown"
      ></article>
    </div>
  </section>
</template>

<style scoped>
.preview {
  height: calc(100vh - 10rem);
}
</style>
