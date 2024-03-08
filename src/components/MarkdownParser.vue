<script setup>
import { parseToMarkdown, initialText } from '@/utils/parser'
import { ref, onMounted, watch } from 'vue'
import SwapIcon from './SwapIcon.vue'
const markdown = ref(initialText)

const parsedMarkdown = ref('')

const showMarkdown = ref(true)

onMounted(parseMarkdown)

watch(markdown, parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = parseToMarkdown(markdown.value)
}

function toggleMarkdown() {
  showMarkdown.value = !showMarkdown.value
}
</script>

<template>
  <section>
    <div class="bg-base-300 flex justify-end px-2">
      <SwapIcon :swap="showMarkdown" @toggle="toggleMarkdown">
        <template #swap-off>
          <v-icon name="bi-eye-fill" />
        </template>
        <template #swap-on>
          <v-icon name="bi-eye-slash-fill" />
        </template>
      </SwapIcon>
    </div>
  </section>
  <section class="justify-center" :class="{ 'grid grid-cols-1 md:grid-cols-2': showMarkdown }">
    <div
      class="flex flex-col h-screen border-r-2 border-base-100"
      :class="{ hidden: !showMarkdown }"
    >
      <h2 class="bg-base-200 p-2 text-xl">Markdown</h2>
      <textarea
        class="bg-base-300 preview leading-relaxed border-none resize-none outline-none break-words overflow-y-scroll p-4"
        v-model="markdown"
      />
    </div>
    <div class="flex-col bg-base-300 md:flex" :class="{ hidden: showMarkdown }">
      <h2 class="bg-base-200 p-2 text-xl">Preview</h2>
      <article
        class="p-5 preview min-w-full bg-base-300 h-screen prose-slate prose overflow-y-auto"
        v-html="parsedMarkdown"
        :class="{ 'md:mx-auto md:min-w-[45rem]': !showMarkdown }"
      ></article>
    </div>
  </section>
</template>

<style scoped>
.preview {
  height: calc(100vh - 10rem);
}
</style>
