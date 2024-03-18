<template>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col">
      <div class="card shadow-2xl md:min-w-[30rem] bg-base-100">
        <div class="card-body">
          <h1 class="text-5xl font-bold text-center mb-10">Login</h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered"
              v-model="credential.username"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="credential.password"
              required
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
            <button class="btn btn-outline">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/auth/useAuth'
import { ref } from 'vue'

const auth = useAuth()
const credential = ref({
  username: '',
  password: ''
})

const login = async () => {
  try {
    await auth.authenticateUser(credential.value)
    console.log(auth.state.user)
    console.log(auth.state.isLogin);
  } catch (error) {
    console.error(error)
  }
}
</script>
