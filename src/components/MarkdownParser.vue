<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const markdown = ref('');
/* 
KUY
---
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
*/
const parsedMarkdown = ref('');

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
    [
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>',
    ],

    // highlights
    [
        /(`)(\s?[^\n,]+\s?)(`)/g,
        '<span style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</span>',
    ],

    // Lists
    [/([^\n]+)(\+)([^\n]+)/g, '<ul><li>$3</li></ul>'],
    [/([^\n]+)(\*)([^\n]+)/g, '<ul><li>$3</li></ul>'],

    // Image
    [
        /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
        '<img src="$2" alt="$1" title="$3" />',
    ],

    // Horizontal
    [/-{3,}/g, '<hr>',],

    // Strikethrough
    [
        /~~([^~]+)~~/g,
        '<del>$1</del>',
    ],
];

onMounted(parseMarkdown);
onUpdated(parseMarkdown);

function parseMarkdown() {
    parsedMarkdown.value = applyRules(markdown.value);
}

function applyRules(text) {
    return rules.reduce((acc, [regex, replacement]) => acc.replace(regex, replacement), text);
}

</script>

<template>
    <div class="container">
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
    </div>
</template>

<style scoped>
.info {
    height: 600px;
    width: 600px;
    padding: 10px;
}

.inf {
    height: 600px;
    width: 600px;
    padding: 10px;
}

textarea {
    resize: none;
}
</style>
