<template>
  <div class="justify-center flex flex-col items-center">
    <h3 class="font-bold text-2xl text-green-400">Save!</h3>
    <p class="py-4">Do you want to update <span class="text-cyan-400">"{{ currentTitle }}"</span> document?</p>
    <div class="flex justify-center">
      <button @click="saveDocLikeNow()" class="btn btn-ghost hover:text-green-400 mr-5">
        Confirm
      </button>
      <button @click="closeModal" class="btn btn-ghost hover:text-red-400">Cancel</button>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['closeModal'])
const { saveDoc, currentTitle } = defineProps(['saveDoc', 'currentTitle'])

function closeModal() {
  emits('closeModal', false)
}

const saveDocLikeNow = () => {
  saveDoc()
  closeModal()
}
</script>
