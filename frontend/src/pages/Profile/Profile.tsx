import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import { useAuthStore } from '../../store/authStore'
import { getGraphQLErrorMessage } from '../../lib/graphql/error'
import { UPDATE_USER_MUTATION } from '../../lib/graphql/mutations/auth'
import { Input } from '../../components/Input/Input'
import { Icon } from '../../components/Icon/Icon'
import styles from './Profile.module.css'
import type { User } from '../../types'

export function Profile() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const updateUser = useAuthStore((s) => s.updateUser)
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [updateUserMutation, { loading: saving }] = useMutation<{ updateUser: User }>(UPDATE_USER_MUTATION)

  const initials = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase() ?? '?'

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(false)
    setError('')

    const input: { name?: string; password?: string } = {}
    if (name && name !== user?.name) input.name = name
    if (password) input.password = password

    if (Object.keys(input).length === 0) {
      setSuccess(true)
      return
    }

    try {
      const result = await updateUserMutation({ variables: { input } })
      if (result.data?.updateUser) {
        updateUser(result.data.updateUser)
        setPassword('')
        setSuccess(true)
      }
    } catch (err) {
      setError(getGraphQLErrorMessage(err, 'Erro ao salvar'))
    }
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{initials}</div>
        </div>
        <p className={styles.name}>{user?.name}</p>
        <p className={styles.email}>{user?.email}</p>

        <hr className={styles.divider} />

        <form onSubmit={handleSave} className={styles.form}>
          {success && (
            <div className={styles.successBanner}>Alterações salvas com sucesso!</div>
          )}
          {error && (
            <div className={styles.errorBanner}>{error}</div>
          )}

          <Input
            label="Nome completo"
            icon="user-round"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <Input
            label="E-mail"
            icon="mail"
            type="email"
            value={user?.email ?? ''}
            disabled
            hint="O e-mail não pode ser alterado"
          />

          <Input
            label="Nova senha"
            icon="lock"
            type={showPassword ? 'text' : 'password'}
            placeholder="Deixe em branco para manter a atual"
            value={password}
            onChange={e => setPassword(e.target.value)}
            hint="Mínimo 8 caracteres"
            rightElement={
              <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                <Icon name={showPassword ? 'eye' : 'eye-closed'} size={18} />
              </button>
            }
          />

          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>

        <button type="button" className={styles.btnLogout} onClick={handleLogout}>
          <Icon name="log-out" size={18} className={styles.logoutIcon} />
          Sair da conta
        </button>
      </div>
    </div>
  )
}
