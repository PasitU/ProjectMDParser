<template>
  <div class="hero min-h-screen w-full">
    <div class="hero-content flex-col">
      <div class="card shadow-2xl sm:min-w-[30rem] bg-base-100">
        <div class="card-body">
          <h1 class="text-5xl font-bold text-center mb-10">
            Edit "{{ auth.state.user.username }}" Profile
          </h1>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username </span>
            </label>
            <input
              type="text"
              placeholder="username"
              class="input input-bordered placeholder-gray-500 border text-gray-200"
              required
              id="username"
              
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
              required
              
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="updateUser()">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuth from '@/auth/useAuth'
// import { ref } from 'vue'
const auth = useAuth()
console.log(auth.state.user.username)
console.log(auth.state.user.password)

// Create a reactive ref for editing user data
// const editedUser = ref({ username: auth.state.user.username, password: '' })

// Function to handle user data submission
// const updateUser = async () => {
//   try {
//     await auth.editUser(editedUser.value)
//     console.log('User information updated successfully')
//     // Optionally, you can redirect the user to another page after successful update
//   } catch (error) {
//     console.error('Error updating user information:', error)
//   }
// }
</script>
