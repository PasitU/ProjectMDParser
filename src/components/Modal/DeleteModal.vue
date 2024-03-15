<template>
  <div class="justify-center flex flex-col items-center">
    <h3 class="font-bold text-2xl text-red-400">Delete!</h3>
    <p class="py-4">
      Are you sure to delete <span class="text-orange-400">"{{ currentTitle }}"</span> document?
    </p>
    <div class="flex justify-center">
      <button @click="deleteDocLikeNow()" class="btn btn-ghost hover:text-green-400 mr-5">
        Confirm
      </button>
      <button @click="closeModal" class="btn btn-ghost hover:text-red-400">Cancel</button>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['closeModal'])
const { deleteDoc, currentTitle } = defineProps(['deleteDoc', 'currentTitle'])

function closeModal() {
  emits('closeModal', false)
}

const deleteDocLikeNow = () => {
  deleteDoc()
  closeModal()
}
</script>
