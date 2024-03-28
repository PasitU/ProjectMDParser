<template>
  <div class="hero min-h-screen w-full">
    <div class="hero-content flex-col">
      <div class="card shadow-2xl sm:min-w-[30rem] bg-base-100">
        <div class="card-body">
          <div class="absolute top-[2vh] left-[2vh]">
            <button @click="goToRoot">
              <v-icon name="md-arrowback"></v-icon>
            </button>
          </div>
          <div class="flex justify-center">
            <div class="avatar items-center">
              <div class="w-24 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div class="flex mx-auto my-2 flex-col sm:flex-row sm:flex-wrap sm:justify-between">
            <h1 class="p-2 text-green-500">
              <v-icon name="fa-user-alt"></v-icon>:
              <span class="italic font-extrabold text-xl text-slate-400">{{
                auth.state.user.username
              }}</span>
            </h1>
            <h1 class="p-2 text-sky-500">
              <v-icon name="io-document"></v-icon>:
              <span class="italic font-extrabold text-xl text-slate-400"
                >{{ count }} documents</span
              >
            </h1>
          </div>
          <div>
            <h1 class="ml-3 mb-1">Your Documents</h1>
            <div class="bg-base-300 rounded-md mb-2 max-h-72 w-72 sm:w-auto overflow-y-scroll">
              <ul class="flex flex-col mt-2">
                <li v-for="doc in data" :key="doc.id" class="bg-base-100 rounded-md mx-3 mb-2 p-5">
                  <p v-text="doc.title"></p>
                  <p class="text-sm" v-text="formatDate(doc.createAt)"></p>
                </li>
              </ul>
            </div>
          </div>
          <button
            class="btn flex-start gap-3 hover:text-red-400"
            onclick="logout_modal.showModal()"
          >
            <v-icon name="md-login" />
            <h1>Logout</h1>
          </button>
        </div>
      </div>
    </div>
  </div>
  <ModalComponent id="logout_modal" :modal-function="logout">
    <template v-slot:modal-title>
      <h1 class="text-3xl text-error font-semibold">Confirm Logout</h1>
    </template>
    <template v-slot:modal-description>
      <p class="text-sm text-center">
        Are you sure you want to Logout? <br />
        Please confirm to proceed.
      </p>
    </template>
  </ModalComponent>
</template>

<script setup>
import useAuth from '@/auth/useAuth'
import { getDocumentsByUser } from '@/api/documentService'
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import ModalComponent from '@/components/Modal/ModalComponent.vue';

const router = useRouter()

const auth = useAuth()
const data = ref([])

onMounted(async () => {
  data.value = await getDocumentsByUser(auth.state.user.id)
})

const count = ref(0)

// Update count when data changes
watchEffect(() => {
  count.value = data.value.length
})

const goToRoot = () => {
  router.push('/')
}

const logout = () => {
  auth.logout()
  router.push('/').then(() => {
    window.location.reload()
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>
