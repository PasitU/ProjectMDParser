<template>
  <div class="justify-center flex flex-col items-center">
    <h3 class="font-bold text-2xl text-green-400">Save!</h3>
    <p class="py-4">Do you want to update "{{ currentDoc }}" document?</p>
    <div class="flex justify-center">
      <button @click="saveDocLikeNow()" class="btn btn-ghost hover:text-green-400 mr-5">
        Confirm
      </button>
      <button @click="$emit('closeModal', false)" class="btn btn-ghost hover:text-red-400">
        Cancel
      </button>
    </div>
  </div>
</template>
<script setup>
defineEmits(['closeModal'])
const props = defineProps(['saveDoc', 'currentDoc'])
const { saveDoc, currentDoc } = props

const saveDocLikeNow = () => {
  saveDoc()
  // $emit('closeModal', false)
}
</script>
