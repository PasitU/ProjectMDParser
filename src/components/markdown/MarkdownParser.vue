<script setup>
import { parseToMarkdown } from '@/utils/parser'
import { ref, onMounted, watch } from 'vue'
import SwapIcon from '@/components/nav/SwapIcon.vue'
import MarkdownPreview from './MarkdownPreview.vue'
import { defineEmits } from 'vue'

const emits = defineEmits(['passParsedMd'])

const props = defineProps(['originalTitle'])

const title = defineModel('title')

const markdown = defineModel('content')

const parsedMarkdown = ref('')

const showMarkdown = ref(true)

onMounted(parseMarkdown)

watch(markdown, parseMarkdown)
watch(parsedMarkdown, () =>{
  emits('passParsedMd', parsedMarkdown.value)
})

function parseMarkdown() {
  parsedMarkdown.value = parseToMarkdown(markdown.value)
}

function toggleMarkdown() {
  showMarkdown.value = !showMarkdown.value
}

function tab(event) {
  if (event.key === 'Tab') {
    event.preventDefault()
    let start = event.target.selectionStart
    let end = event.target.selectionEnd
    event.target.value = event.target.value.slice(0, start) + '\t' + event.target.value.slice(end)
    event.target.selectionEnd = start + 1
  }
}

function handleBlur() {
  if (title.value === '') {
    title.value = props.originalTitle
  }
}

</script>

<template>
  <section>
    <div class="bg-base-300 flex justify-between px-2">
      <div class="flex items-center">
        <span class="text-base">Document: </span>
        <input
          type="text"
          v-model="title"
          placeholder="Document Name"
          class="bg-transparent text-lg pl-2 focus:outline-none focus:ring-0  text-info transition-all duration-200 ease-in-out"
          @blur="handleBlur"
        />
      </div>
      <SwapIcon @toggle="toggleMarkdown">
        <template #swap-off>
          <v-icon name="bi-eye-fill" />
        </template>
        <template #swap-on>
          <v-icon name="bi-eye-slash-fill" />
        </template>
      </SwapIcon>
    </div>
  </section>
  <section
    class="justify-center transition-all duration-300 ease-in-out"
    :class="{ 'grid grid-cols-1 md:grid-cols-2': showMarkdown }"
  >
    <div
      class="flex flex-col h-screen border-r-2 border-base-100"
      :class="{ hidden: !showMarkdown }"
    >
      <h2 class="bg-base-200 p-2 text-xl">Markdown</h2>
      <textarea
        class="bg-base-300 preview leading-relaxed border-none resize-none outline-none break-words overflow-y-scroll p-4"
        v-model="markdown"
        @keydown="tab"
      />
    </div>
    <div class="flex-col bg-base-300 md:flex" :class="{ hidden: showMarkdown }">
      <h2 class="bg-base-200 p-2 text-xl">Preview</h2>
      <MarkdownPreview
        :content="parsedMarkdown"
        :class="{ 'md:mx-auto md:min-w-[45rem] border-l border-r border-base-100': !showMarkdown }"
      />
    </div>
  </section>
</template>

<style scoped>
.preview {
  height: calc(100vh - 10rem);
}
</style>
