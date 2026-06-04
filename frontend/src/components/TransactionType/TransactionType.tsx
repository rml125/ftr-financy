import styles from './TransactionType.module.css';
import { Icon } from '../Icon/Icon';

interface TransactionTypeProps {
  type: 'REVENUE' | 'EXPENSE';
}

export function TransactionType({ type }: TransactionTypeProps) {
  const isRevenue = type === 'REVENUE';
  return (
    <span className={[styles.badge, isRevenue ? styles.revenue : styles.expense].join(' ')}>
      <Icon name={isRevenue ? 'circle-arrow-up' : 'circle-arrow-down'} size={16} color="currentColor" />
      {isRevenue ? 'Entrada' : 'Saída'}
    </span>
  );
}
