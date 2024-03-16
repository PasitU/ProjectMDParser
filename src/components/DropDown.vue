<template>
  <div class="dropdown dropdown-end md:hidden">
    <div tabindex="0" role="" class="btn m-1">
      <slot name="dropdown-trigger"></slot>
    </div>
    <div tabindex="0" class="dropdown-content flex overflow-y-scroll max-h-64 flex-col gap-1 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
