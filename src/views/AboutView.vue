<template>
  <div>
    <MarkdownPreview :content="parsedMarkdown" :class="'md:mx-auto md:min-w-[45rem]'" />
  </div>
</template>

<script setup>
import MarkdownPreview from '@/components/markdown/MarkdownPreview.vue'
import { parseToMarkdown, initialText } from '@/utils/parser'
import { ref, computed } from 'vue'


const markdown = ref(initialText)
const parsedMarkdown = computed(() => parseToMarkdown(markdown.value))


</script>
<style>
</style>
