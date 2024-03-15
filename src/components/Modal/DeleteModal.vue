<template>
  <div class="justify-center flex flex-col items-center">
    <h3 class="font-bold text-2xl text-red-400">Delete!</h3>
    <p class="py-4">Are you sure to delete "{{ currentDoc }}" document?</p>
    <div class="flex justify-center">
      <button @click="deleteDocLikeNow()" class="btn btn-ghost hover:text-green-400 mr-5">
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
const props = defineProps(['deleteDoc', 'currentDoc'])
const { deleteDoc, currentDoc } = props

const deleteDocLikeNow = () => {
  deleteDoc()
  // $emit('closeModal', false)
}
</script>
