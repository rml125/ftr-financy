import { Icon } from '../../../components/Icon/Icon'
import { formatCurrency } from '../../../lib/format'
import styles from '../Dashboard.module.css'

interface SummaryCardsProps {
  balance: number
  income: number
  expense: number
}

export function SummaryCards({ balance, income, expense }: SummaryCardsProps) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Icon name="wallet" size={20} className={styles.cardIconPurple} />
          <span className={styles.cardLabel}>SALDO TOTAL</span>
        </div>
        <p className={styles.cardValue}>{formatCurrency(balance)}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Icon name="circle-arrow-up" size={20} className={styles.cardIconGreen} />
          <span className={styles.cardLabel}>RECEITAS DO MÊS</span>
        </div>
        <p className={styles.cardValue}>{formatCurrency(income)}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <Icon name="circle-arrow-down" size={20} className={styles.cardIconRed} />
          <span className={styles.cardLabel}>DESPESAS DO MÊS</span>
        </div>
        <p className={styles.cardValue}>{formatCurrency(expense)}</p>
      </div>
    </div>
  )
}
