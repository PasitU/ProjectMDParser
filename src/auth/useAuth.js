const BASE_URL = 'http://localhost:3001'

import { readonly, ref } from 'vue'

const state = {
  user: ref(null),
  isLogin: ref(false)
}

const authenticateUser = async (credential) => {
  if (!credential.username || !credential.password) {
    throw new Error('Please enter username and password')
  }
  try {
    const response = await fetch(`${BASE_URL}/users`)
    const users = await response.json()
    const currentUser = users.find((user) => user.username === credential.username)
    if (!currentUser) {
      throw new Error('User not found')
    }
    if (currentUser.password !== credential.password) {
      throw new Error('Password does not match')
    }
    state.user.value = currentUser
    state.isLogin.value = true
  } catch (err) {
    throw new Error('Unable to login')
  }
}

const register = async (newUser) => {
  if (!newUser.username || !newUser.password) return
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Date.now(),
        username: newUser.username,
        password: newUser.password
      })
    })
    if (!response.ok) {
      throw new Error('Unable to register')
    }
  } catch (err) {
    throw new Error('Unable to register')
  }
}

const logout = () => {
  state.user.value = null
  state.isLogin.value = false
}

export default function useAuth() {
  return {
    state: readonly(state),
    authenticateUser,
    logout,
    register
  }
}
