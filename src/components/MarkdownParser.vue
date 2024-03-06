<script setup>
import { parseToMarkdown, initialText } from '@/utils/parser';
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
  <section>
    <div class="flex justify-between">
      <div class="flex items-center p-2">
        <ul class="flex items-center gap-7">
          <li>HamburgerMenu</li>
          <li>Markdown</li>
          <div class="flex flex-col justify-center text-center">
            <p>Current File</p>
            <p>Demo.md</p>
          </div>
        </ul>
      </div>
      <div class="flex items-center p-2 justify-center">
        <ul class="flex items-center gap-7">
          <li>Preview</li>
          <li>Export</li>
          <li>Icon1</li>
          <li>Icon2</li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3 justify-center">
      <div class="flex justify-center flex-col">
        <h2 class="text-center">Markdown</h2>
        <textarea
          class="bg-base-300 text-xl rounded-xl border-none resize-none outline-none min-h-screen break-words overflow-auto p-4"
          v-model="markdown"
        />
      </div>
      <div class="flex flex-col">
        <h2 class="text-center">Preview</h2>
        <article
          class="w-full bg-base-300 min-w-full min-h-screen prose-slate prose rounded-xl overflow-y-scroll p-4"
          v-html="parsedMarkdown"
        ></article>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
