<template>
  <button class="btn btn-ghost hover:text-red-400" onclick="my_modal_3.showModal()">
    <v-icon name="ri-delete-bin-5-fill" hover animation="ring" />
  </button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box justify-center flex flex-col items-center">
      <h3 class="font-bold text-2xl text-red-400">Delete!</h3>
      <p class="py-4">Are you sure to delete this document?</p>
      <div class="flex justify-center">
        <form method="dialog">
          <button @click="deleteDoc()" class="btn btn-ghost hover:text-green-400 mr-5">
            Confirm
          </button>
          <button class="btn btn-ghost hover:text-red-400">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup>
const { deleteDoc } = defineProps(['deleteDoc'])
</script>
