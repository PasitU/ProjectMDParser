<template>
  <label class="btn btn-ghost btn-square swap" :class="swap ? 'swap-rotate' : ''">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" :checked="isChecked" @click="$emit('toggle')" />

    <!-- hamburger icon -->
    <div class="swap-off">
      <slot name="swap-off"></slot>
    </div>

    <!-- close icon -->
    <div class="swap-on">
      <slot name="swap-on"></slot>
    </div>
  </label>
</template>

<script setup>
defineEmits(['toggle'])
defineProps({
  swap: {
    type: Boolean,
    default: false
  },
  isChecked: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
