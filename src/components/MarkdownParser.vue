<script setup>
import { ref, onMounted, onUpdated } from 'vue'

const markdown = ref('')
/* 
# Heading level 1
## Heading level 2
### Heading level 3 
#### Heading level 4 
##### Heading level 5
###### Heading level 6 
__bold text__ 
**bold text** 
_italic text_
*italic text*
`word`
 * First item
 + Second item

[Guide](https://www.google.com)
KUY
---
~~KODGAY~~
*/
const parsedMarkdown = ref('')

const rules = [
  // headers
  [/#{6}\s?([^\n]+)/g, '<h6>$1</h6>'],
  [/#{5}\s?([^\n]+)/g, '<h5>$1</h5>'],
  [/#{4}\s?([^\n]+)/g, '<h4>$1</h4>'],
  [/#{3}\s?([^\n]+)/g, '<h3>$1</h3>'],
  [/#{2}\s?([^\n]+)/g, '<h2>$1</h2>'],
  [/#{1}\s?([^\n]+)/g, '<h1>$1</h1>'],

  // bold, italics, and paragraph
  [/\*\*\s?([^\n]+)\*\*/g, '<b>$1</b>'],
  [/\*\s?([^\n]+)\*/g, '<i>$1</i>'],
  [/__([^_]+)__/g, '<b>$1</b>'],
  [/_([^_`]+)_/g, '<i>$1</i>'],
  [/([^\n]+\n?)/g, '<p>$1</p>'],

  // links
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>'],

  // highlights
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<span style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</span>'
  ],

  // Lists
  [/([^\n]+)(\+)([^\n]+)/g, '<ul><li>$3</li></ul>'],
  [/([^\n]+)(\*)([^\n]+)/g, '<ul><li>$3</li></ul>'],

  // Image
  [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, '<img src="$2" alt="$1" title="$3" />'],

  // Horizontal
  [/-{3,}/g, '<hr>'],

  // Strikethrough
  [/~~([^~]+)~~/g, '<del>$1</del>']
]

onMounted(parseMarkdown)
onUpdated(parseMarkdown)

function parseMarkdown() {
  parsedMarkdown.value = applyRules(markdown.value)
}

function applyRules(text) {
  return rules.reduce((acc, [regex, replacement]) => acc.replace(regex, replacement), text)
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
