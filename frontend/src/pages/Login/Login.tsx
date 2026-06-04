import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { useAuthStore } from '../../store/authStore';
import { getGraphQLErrorMessage } from '../../lib/graphql/error';
import { LOGIN_MUTATION } from '../../lib/graphql/mutations/auth';
import styles from './Login.module.css';

import logoFull from '../../assets/Logo.svg';
import { Icon } from '../../components/Icon/Icon';
import { Input } from '../../components/Input/Input';

export function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginMutation, { loading }] = useMutation<{ login: { token: string; user: { id: string; name: string; email: string } } }>(LOGIN_MUTATION);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const result = await loginMutation({ variables: { data: { email, password } } });
      if (!result.data) throw new Error('Erro ao fazer login');
      login(result.data.login.token, result.data.login.user);
      navigate('/dashboard');
    } catch (err) {
      setError(getGraphQLErrorMessage(err, 'Erro ao fazer login'));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logoRow}>
        <img src={logoFull} alt="Financy" className={styles.logo} />
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Fazer login</h1>
        <p className={styles.subtitle}>Entre na sua conta para continuar</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <Input
            label="E-mail"
            icon="mail"
            type="email"
            placeholder="mail@exemplo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <Input
            label="Senha"
            icon="lock"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            rightElement={
              <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                <Icon name={showPassword ? 'eye' : 'eye-closed'} size={18} />
              </button>
            }
          />

          <div className={styles.extras}>
            <label className={styles.rememberLabel}>
              <input type="checkbox" className={styles.checkbox} />
              Lembrar-me
            </label>
            <span className={styles.recover}>Recuperar senha</span>
          </div>

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>ou</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.registerPrompt}>Ainda não tem uma conta?</p>
        <button
          type="button"
          className={styles.btnOutline}
          onClick={() => navigate('/register')}
        >
          <Icon name="user-round-plus" size={18} />
          Criar conta
        </button>
      </div>
    </div>
  );
}
