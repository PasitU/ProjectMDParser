const BASE_URL = import.meta.env.VITE_DEV_URL

import { readonly, ref } from 'vue'

const state = {
  user: ref(JSON.parse(localStorage.getItem('user') || null)),
  isLogin: ref(JSON.parse(localStorage.getItem('isLogin')) || false)
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
      throw new Error('Invalid Username or Password')
    }
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('isLogin', JSON.stringify(true))
    state.user.value = currentUser
    state.isLogin.value = true
  } catch (err) {
    console.error(err.message)
    throw err
  }
}

const getAllUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`)
    const users = await response.json()
    return users
  } catch {
    throw new Error('Unable to fetch users')
  }
}

const register = async (newUser) => {
  if (!newUser.username || !newUser.password) return
  const allUsersData = await getAllUsers()
  const usernameExists = allUsersData.some((user) => user.username === newUser.username)
  if (usernameExists) {
    throw new Error('Username already exists')
  } else {
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
      throw new Error('Unable to register' + err.message)
    }
  }
}

const editUser = async (updatedUser) => {
  try {
    if (!updatedUser || !updatedUser.id || (!updatedUser.username && !updatedUser.password)) {
      throw new Error('Invalid user data')
    }

    const response = await fetch(`${BASE_URL}/users/${updatedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })

    if (!response.ok) {
      throw new Error('Unable to update user information')
    }

    // Assuming the response contains the updated user object,
    // you can update the local storage and state with the updated user.
    const updatedUserData = await response.json()
    localStorage.setItem('user', JSON.stringify(updatedUserData))
    state.user.value = updatedUserData
  } catch (err) {
    throw new Error('Unable to update user')
  }
}

const logout = () => {
  state.user.value = null
  state.isLogin.value = false
  localStorage.removeItem('user')
  localStorage.removeItem('isLogin')
}

export default function useAuth() {
  return {
    state: readonly(state),
    authenticateUser,
    logout,
    register,
    editUser,
    getAllUsers
  }
}
