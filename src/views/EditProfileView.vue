<template>
  <div class="hero min-h-screen w-full">
    <div class="hero-content flex-col">
      <div class="card shadow-2xl sm:min-w-[30rem] bg-base-100">
        <div class="card-body">
          <div class="absolute top-[2vh] left-[2vh]">
            <button @click="goToRoot" class="text-white">
              <v-icon name="io-arrow-back-outline" class="text-white"></v-icon>
            </button>
          </div>
          <div class="flex justify-center">
            <div class="avatar items-center">
              <div class="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <p class="text-center">UserId : {{ auth.state.user.id }}</p>
          <h1 class="text-5xl font-bold">User : {{ auth.state.user.username }}</h1>
          <h1 class="text-5xl font-bold">Documents : {{ userIdToCount }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/auth/useAuth'
import { getDocuments } from '@/api/documentService'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter() // Import useRouter outside of the setup

const auth = useAuth()
const data = ref([])
onMounted(async () => {
  data.value = await getDocuments()
})

const userIdToCount = computed(() => {
  const userId = auth.state.user.id
  return data.value.filter((document) => document.userId === userId).length
})

const goToRoot = () => {
  router.push('/') // Now router is defined and push should work fine
}
</script>
