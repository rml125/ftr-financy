import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Login } from './Login/Login'

export function RootPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <Login />
}
