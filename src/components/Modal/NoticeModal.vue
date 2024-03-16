<template>
    <Teleport to="#addModal">
      <div class="absolute left-0 right-0 top-[40%] m-auto btn h-48 w-11/12 max-w-lg shadow-2xl rounded-lg overflow-y-auto">
        <div class="justify-center flex flex-col items-center">
          <p class="py-4">
            Document has been {{ type }} successfully!
          </p>
        </div>
      </div>
    </Teleport>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const { isDelete } = defineProps(['isDelete'])
const type = isDelete ? 'deleted' : 'saved'

const showModal = ref(true)

watchEffect(() => {
  setTimeout(() => {
    showModal.value = false
  }, 1500)
})

</script>

<style lang="scss" scoped></style>
