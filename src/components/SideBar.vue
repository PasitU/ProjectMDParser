<template>
  <div class="relative min-h-screen">
    <Transition name="fade">
      <aside
        v-show="isSidebarOpen"
        class="fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300"
        :class="{ 'translate-x-0': isSidebarOpen, '-translate-x-full': !isSidebarOpen }"
      >
        <slot name="sidebar-content"> </slot>
      </aside>
    </Transition>

    <main
      class="transition-transform duration-300"
      :class="{ 'translate-x-64': isSidebarOpen, 'translate-x-0': !isSidebarOpen }"
    >
      <slot name="main-content"> </slot>
    </main>
  </div>
</template>

<script setup>
defineProps(['isSidebarOpen'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(-100%);
}
</style>
