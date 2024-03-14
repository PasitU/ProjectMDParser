<template>
  <div class="justify-center flex flex-col items-center">
    <h3 class="font-bold text-2xl text-red-400">Delete!</h3>
    <p class="py-4">Are you sure to delete "{{ currentDocument.title }}" document?</p>
    <div class="flex justify-center">
      <button @click="deleteDoc()" class="btn btn-ghost hover:text-green-400 mr-5">Confirm</button>
      <button @click="$emit('closeModal', false)" class="btn btn-ghost hover:text-red-400">
        Cancel
      </button>
    </div>
  </div>
</template>
<script setup>
defineEmits(['closeModal'])
const { deleteDoc, currentDocument } = defineProps(['deleteDoc', 'currentDocument'])
</script>
