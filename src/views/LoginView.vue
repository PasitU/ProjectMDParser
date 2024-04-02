<template>
  <div class="hero min-h-screen w-full">
    <div class="hero-content flex-col">
      <div class="card shadow-2xl sm:min-w-[30rem] bg-base-100">
        <div class="card-body">
          <h1 class="text-5xl font-bold text-center mb-10">Login</h1>
          <AlertComponent v-if="alertMsg" :alertMsg="alertMsg" />
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered placeholder-gray-500 border text-gray-200"
              v-model="credential.username"
              required
              @keydown.enter="login"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered placeholder-gray-500 border text-gray-200"
              v-model="credential.password"
              required
              @keydown.enter="login"
            />
            <label class="text-right mt-2">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
          <div class="divider">Doesn't have an account?</div>
          <div class="form-control mt-6">
            <button class="btn btn-outline" @click="register">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/auth/useAuth'
import AlertComponent from '@/components/AlertComponent.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const alertMsg = ref('')
const auth = useAuth()
const credential = ref({
  username: '',
  password: ''
})

const login = async () => {
  try {
    await auth.authenticateUser(credential.value)
    router.push('/')
  } catch (error) {
    alertMsg.value = error.message
  }
}

const register = () => {
  router.push('/register')
}

watch(credential.value, () => {
  alertMsg.value = ''
}
)
</script>
