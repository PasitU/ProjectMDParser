<template>
  <div class="dropdown dropdown-end">
    <div tabindex="0" role="" class="btn m-1" :class="classes">
      <slot name="dropdown-trigger"></slot>
    </div>
    <div
      tabindex="0"
      class="dropdown-content flex overflow-y-scroll max-h-64 flex-col gap-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-3"
    >
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>
<!-- class="flex items-center gap-2 m-1" -->

<script setup>
import { computed } from 'vue'

const { variant } = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
})
const classes = computed(() => {
  return {
    btn: variant === 'primary',
    'btn-ghost': variant === 'secondary'
  }
})
</script>

<style lang="scss" scoped></style>
