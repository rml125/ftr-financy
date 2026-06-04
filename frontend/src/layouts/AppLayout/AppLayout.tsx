import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import logoFull from '../../assets/Logo.svg';
import styles from './AppLayout.module.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transactions', label: 'Transações' },
  { to: '/categories', label: 'Categorias' },
];

export function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  function goToProfile() {
    navigate('/profile');
  }

  const initials = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase() ?? '?';

  return (
    <div className={styles.layout}>
      <header className={styles.navbar}>
        <div className={styles.navLogo}>
          <img src={logoFull} alt="Financy" width="100" height="24" />
        </div>

        <nav className={styles.navLinks}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className={styles.avatarBtn} onClick={goToProfile} title="Perfil">
          {initials}
        </button>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
