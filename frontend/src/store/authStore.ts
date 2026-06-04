import { create } from 'zustand'
import { apolloClient } from '../lib/apollo'
import type { User } from '../types'

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('financy_token'),
  user: (() => {
    const raw = localStorage.getItem('financy_user')
    return raw ? (JSON.parse(raw) as User) : null
  })(),
  isAuthenticated: !!localStorage.getItem('financy_token'),

  login: (token, user) => {
    localStorage.setItem('financy_token', token)
    localStorage.setItem('financy_user', JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('financy_token')
    localStorage.removeItem('financy_user')
    apolloClient.clearStore()
    set({ token: null, user: null, isAuthenticated: false })
  },

  updateUser: (user) => {
    localStorage.setItem('financy_user', JSON.stringify(user))
    set({ user })
  },
}))
