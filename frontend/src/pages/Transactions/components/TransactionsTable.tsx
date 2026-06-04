import { Icon, type IconName } from '../../../components/Icon/Icon'
import { TransactionType } from '../../../components/TransactionType/TransactionType'
import { formatDateShort } from '../../../lib/date'
import { formatCurrency } from '../../../lib/format'
import type { Transaction } from '../../../types'
import styles from '../Transactions.module.css'

interface TransactionsTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transactionId: string) => void
}

export function TransactionsTable({ transactions, onEdit, onDelete }: TransactionsTableProps) {
  return (
    <>
      <div className={styles.tableHeader}>
        <span>Descrição</span>
        <span>Data</span>
        <span>Categoria</span>
        <span>Tipo</span>
        <span>Valor</span>
        <span>Ações</span>
      </div>

      {transactions.length === 0 ? (
        <div className={styles.empty}>Nenhuma transação encontrada.</div>
      ) : transactions.map(transaction => (
        <div key={transaction.id} className={styles.tableRow}>
          <div className={styles.descCell}>
            <div
              className={styles.rowAvatar}
              style={{ background: (transaction.category?.color ?? '#9CA3AF') + '20' }}
            >
              <Icon
                name={(transaction.category?.icon ?? 'tag') as IconName}
                size={16}
                style={{ color: transaction.category?.color ?? '#9CA3AF' }}
              />
            </div>
            <span className={styles.descText}>{transaction.description}</span>
          </div>

          <span className={styles.dateCell}>{formatDateShort(transaction.date)}</span>

          <div className={styles.categoryCell}>
            {transaction.category
              ? <span className={styles.categoryBadge} style={{ background: transaction.category.color + '20', color: transaction.category.color }}>{transaction.category.title}</span>
              : <span className={styles.noCategory}>—</span>
            }
          </div>

          <div className={styles.typeCell}>
            <TransactionType type={transaction.type} />
          </div>

          <span className={styles.valueCell}>
            {transaction.type === 'REVENUE' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
          </span>

          <div className={styles.actionsCell}>
            <button className={[styles.actionBtn, styles.actionBtnDanger].join(' ')} onClick={() => onDelete(transaction.id)} title="Excluir">
              <Icon name="trash" size={16} />
            </button>
            <button className={styles.actionBtn} onClick={() => onEdit(transaction)} title="Editar">
              <Icon name="square-pen" size={16} />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
