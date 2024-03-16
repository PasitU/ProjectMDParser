<script setup>
import MarkdownPreview from '@/components/markdown/MarkdownPreview.vue';
defineProps({
    parsedMarkdown:{
        type:String,
        required:true
    }
})

</script>

<template >
<MarkdownPreview :content="decodeURI(parsedMarkdown)"></MarkdownPreview>
</template>

<style scoped></style>
