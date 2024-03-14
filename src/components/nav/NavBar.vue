<template>
  <nav class="flex justify-between">
    <div class="flex items-center p-2">
      <SwapIcon :swap="true" :is-checked="isSidebarOpen" @toggle="$emit('toggle-sidebar')">
        <template #swap-off>
          <IconHamburger />
        </template>
        <template #swap-on>
          <IconClose />
        </template>
      </SwapIcon>
      <router-link to="/">
        <h1 class="text-2xl font-bold pl-5 hover:scale-110 hover:text-info transition-all duration-300">
          Markable
        </h1>
      </router-link>
    </div>

    <div class="flex items-center p-2 justify-center">
      <slot name="nav-link"></slot>
    </div>
  </nav>
</template>

<script setup>
import SwapIcon from '@/components/nav/SwapIcon.vue'
import IconHamburger from '../icons/IconHamburger.vue'
import IconClose from '../icons/IconClose.vue'

defineEmits(['toggle-sidebar'])
defineProps(['isSidebarOpen'])

</script>

<style lang="scss" scoped></style>
