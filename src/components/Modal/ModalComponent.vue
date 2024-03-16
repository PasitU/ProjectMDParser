<template>
  <dialog class="modal">
    <div class="modal-box justify-center flex flex-col items-center gap-5">
      <slot name="modal-title">
        <h1 class="text-3xl">Modal Title</h1>
      </slot>
      <slot name="modal-description">
        <h1>This is modal description</h1>
      </slot>
      <div class="flex justify-center">
        <form method="dialog" class="flex gap-2">
          <button class="btn btn-ghost hover:text-green-400" @click="modalFunction">
            Confirm
          </button>
          <button class="btn btn-ghost hover:text-red-400">Cancel</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup>
defineProps({
  modalFunction: {
    type: Function,
    default: () => console.log('modalFunction is not defined')
  }
})
</script>
