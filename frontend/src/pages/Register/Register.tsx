import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { useAuthStore } from '../../store/authStore';
import { getGraphQLErrorMessage } from '../../lib/graphql/error';
import { REGISTER_MUTATION } from '../../lib/graphql/mutations/auth';
import { Input } from '../../components/Input/Input';
import { Icon } from '../../components/Icon/Icon';
import styles from './Register.module.css';

import logoFull from '../../assets/Logo.svg';

export function Register() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [registerMutation, { loading }] = useMutation<{ register: { token: string; user: { id: string; name: string; email: string } } }>(REGISTER_MUTATION);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const result = await registerMutation({ variables: { data: { name, email, password } } });
      if (!result.data) throw new Error('Erro ao cadastrar');
      login(result.data.register.token, result.data.register.user);
      navigate('/dashboard');
    } catch (err) {
      setError(getGraphQLErrorMessage(err, 'Erro ao cadastrar'));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.logoRow}>
        <img src={logoFull} alt="Financy" className={styles.logo} />
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Criar conta</h1>
        <p className={styles.subtitle}>Comece a controlar suas finanças ainda hoje</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <Input
            label="Nome"
            icon="user-round"
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

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
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            hint="A senha deve ter no mínimo 8 caracteres"
            rightElement={
              <button type="button" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                <Icon name={showPassword ? 'eye' : 'eye-closed'} size={18} />
              </button>
            }
          />

          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>ou</span>
          <span className={styles.dividerLine} />
        </div>

        <p className={styles.loginPrompt}>Já tem uma conta?</p>
        <Link to="/login" className={styles.btnOutline}>
          <Icon name="log-in" size={18} />
          Fazer login
        </Link>
      </div>
    </div>
  );
}
