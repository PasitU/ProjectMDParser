<script setup>
import { ref, onMounted } from 'vue'
import { getDocuments } from '@/api/documentService'

const data = ref([])
onMounted(async () => {
  data.value = await getDocuments()
})
</script>
<template>
  <div>
    <ul>
      <li v-for="document in data" :key="document.id">
        {{ document.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
