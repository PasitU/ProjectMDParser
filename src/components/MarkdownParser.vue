<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import { applyRules } from '@/utils/parser'
const markdown = ref('')

const parsedMarkdown = ref('')

onMounted(parseMarkdown)
onUpdated(parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = applyRules(markdown.value)
}
</script>

<template>
  <!-- <div class="container">
    <div class="preview">
      <div class="row">
        <div class="col">
          <h2 class="align">Markdown</h2>
          <textarea class="inf" v-model="markdown" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2 class="align">Preview</h2>
          <div class="info" v-html="parsedMarkdown"></div>
        </div>
      </div>
    </div>
  </div> -->

  <div>
    <div class="flex justify-between bg-red-500 text-white">
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
          class="bg-black text-white rounded-xl border-none resize-none outline-none break-words overflow-auto h-screen w-[49vw] p-4 m-1"
          v-model="markdown"
        />
      </div>
      <div class="flex justify-center flex-col">
        <h2 class="text-center">Preview</h2>
        <div
          class="prose bg-black text-white rounded-xl overflow-auto h-screen w-[49vw] p-4 m-1"
          v-html="parsedMarkdown"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
