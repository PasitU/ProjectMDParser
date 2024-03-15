<template>
  <button class="btn btn-ghost hover:text-green-400" onclick="my_modal_4.showModal()">
    <v-icon name="ri-save-3-line" />
    <h2 class="hidden md:block">Save Changes</h2>
  </button>
  <dialog id="my_modal_4" class="modal">
    <div class="modal-box justify-center flex flex-col items-center">
      <h3 class="font-bold text-2xl text-green-400">Save!</h3>
      <p class="py-4">Do you want to update this document?</p>
      <div class="flex justify-center">
        <form method="dialog">
          <button @click="saveDoc()" class="btn btn-ghost hover:text-green-400 mr-5">
            Confirm
          </button>
          <button class="btn btn-ghost hover:text-red-400">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup>
const { saveDoc } = defineProps(['saveDoc'])
</script>
