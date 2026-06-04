import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../../../components/Icon/Icon'
import { formatDate } from '../../../lib/date'
import { formatCurrency } from '../../../lib/format'
import type { Transaction } from '../../../types'
import styles from '../Dashboard.module.css'

interface RecentTransactionsListProps {
  transactions: Transaction[]
}

export function RecentTransactionsList({ transactions }: RecentTransactionsListProps) {
  return (
    <section className={styles.colMain}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>TRANSAÇÕES RECENTES</span>
        <Link to="/transactions" className={styles.sectionLink}>Ver todas &rsaquo;</Link>
      </div>
      <div className={styles.txList}>
        {transactions.length === 0 ? (
          <div className={styles.empty}>Nenhuma transação ainda.</div>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.id} className={styles.txRow}>
              <div
                className={styles.txAvatar}
                style={{ background: (transaction.category?.color ?? '#9CA3AF') + '20' }}
              >
                <Icon
                  name={(transaction.category?.icon ?? 'tag') as IconName}
                  size={16}
                  style={{ color: transaction.category?.color ?? '#9CA3AF' }}
                />
              </div>
              <div className={styles.txInfo}>
                <span className={styles.txDesc}>{transaction.description}</span>
                <span className={styles.txDate}>{formatDate(transaction.date)}</span>
              </div>
              <div className={styles.txCatCol}>
                {transaction.category && (
                  <span className={styles.txTag} style={{ background: transaction.category.color + '22', color: transaction.category.color }}>
                    {transaction.category.title}
                  </span>
                )}
              </div>
              <div className={styles.txRight}>
                <span className={styles.txAmount}>
                  {transaction.type === 'REVENUE' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                </span>
                <Icon
                  name={transaction.type === 'REVENUE' ? 'circle-arrow-up' : 'circle-arrow-down'}
                  size={16}
                  style={{ color: transaction.type === 'REVENUE' ? 'var(--color-green-base)' : 'var(--color-red-base)' }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.addTx}>
        <Link to="/transactions" className={styles.addTxLink}>
          <Icon name="plus" size={16} />
          Nova transação
        </Link>
      </div>
    </section>
  )
}
