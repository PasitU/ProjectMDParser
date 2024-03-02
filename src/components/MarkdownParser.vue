<script setup>
import { applyRules, initialText } from '@/utils/parser';
import { ref, onMounted, onUpdated } from 'vue'
const markdown = ref(initialText)

const parsedMarkdown = ref('')

onMounted(parseMarkdown)
onUpdated(parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = applyRules(markdown.value)
}
</script>

<template>
  <div>
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

    <div class="flex justify-between items-center">
      <div class="flex justify-center flex-col">
        <h2 class="text-center">Markdown</h2>
        <textarea
          class="bg-base-300 rounded-xl border-none resize-none outline-none break-words overflow-auto h-screen w-[49vw] p-4 m-1"
          v-model="markdown"
        />
      </div>
      <div class="flex justify-center flex-col ">
        <h2 class="text-center">Preview</h2>
        <article
          class="bg-base-300 prose-slate prose rounded-xl overflow-auto h-screen w-[49vw] p-4 m-1"
          v-html="parsedMarkdown"
        ></article>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
