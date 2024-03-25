<template>
    <div class="hero min-h-screen w-full">
      <div class="hero-content flex-col">
        <div class="card shadow-2xl sm:min-w-[30rem] bg-base-100">
          <div class="card-body">
            <h1 class="text-5xl font-bold text-center mb-10">Register</h1>
            <AlertComponent v-if="alertMsg" :alertMsg="alertMsg" />
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="enter your username"
                class="input input-bordered"
                v-model="credential.username"
                @input="checkUsername"
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
                :class="isPasswordNull ? 'input-bordered' : passwordIndicator ? 'input-success' : 'input-error'"
                v-model="password.one"
                @input="checkPassword"
                required
              />
              <label class="label">
                <span class="label-text">Re-enter Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                :class="isPasswordNull ? 'input-bordered' : passwordIndicator ? 'input-success' : 'input-error'"
                v-model="password.two"
                @input="checkPassword"
                required
              />
            
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" :class="!passwordIndicator || isPasswordNull || isUsernameNull ? 'btn-disabled':'btn-primary' " @click="registerUser">Create account</button>
            </div>
            
            <div class="form-control mt-6">
              <button class="btn btn-outline" @click="cancleRegister">Cancle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import useAuth from '@/auth/useAuth'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';
  import AlertComponent from '@/components/AlertComponent.vue'
  
  const router = useRouter()
  const auth = useAuth()

  const passwordIndicator = ref(false)
  const isPasswordNull = ref(true)
  const isUsernameNull = ref(true)
  const alertMsg = ref('')

  const password = ref({
    one: '',
    two: ''
  })

  function checkPassword() {
    if (password.value.one === '' || password.value.two === '') {
      isPasswordNull.value = true
      passwordIndicator.value = false
      return
    } else {
      isPasswordNull.value = false
      if (password.value.one === password.value.two) {
        credential.value.password = password.value.one
        passwordIndicator.value = true
      } else {
        passwordIndicator.value = false
      }
    }
  }

  function checkUsername() {
    if (credential.value.username === '') {
      isUsernameNull.value = true
    } else {
      isUsernameNull.value = false
    }
  }

  const credential = ref({
    username: '',
    password: ''
  })
  
  const registerUser = async () => {
    if (passwordIndicator.value) {
      try {
        await auth.register(credential.value)
        router.push('/login')
      } catch (error) {
        alertMsg.value = error.message
      }
    } else {
      // do something
    }
  }

  const cancleRegister = () => {
    router.push('/login')
  }
  </script>
  