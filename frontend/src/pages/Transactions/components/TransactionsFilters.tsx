import { Icon } from '../../../components/Icon/Icon'
import { formatPeriod } from '../../../lib/format'
import type { Category, TransactionType as TxType } from '../../../types'
import styles from '../Transactions.module.css'

interface TransactionsFiltersProps {
  categories: Category[]
  periods: string[]
  search: string
  type: TxType | ''
  categoryId: string
  period: string
  onSearchChange: (value: string) => void
  onTypeChange: (value: TxType | '') => void
  onCategoryChange: (value: string) => void
  onPeriodChange: (value: string) => void
}

export function TransactionsFilters({
  categories,
  periods,
  search,
  type,
  categoryId,
  period,
  onSearchChange,
  onTypeChange,
  onCategoryChange,
  onPeriodChange,
}: TransactionsFiltersProps) {
  return (
    <div className={styles.filterCard}>
      <div className={styles.filterRow}>
        <div className={styles.filterField}>
          <label className={styles.filterLabel}>Buscar</label>
          <div className={styles.filterInputWrap}>
            <span className={styles.filterInputIcon}>
              <Icon name="search" size={16} color="currentColor" />
            </span>
            <input
              className={styles.filterInput}
              placeholder="Buscar por descrição"
              value={search}
              onChange={event => onSearchChange(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterField}>
          <label className={styles.filterLabel}>Tipo</label>
          <select className={styles.filterSelect} value={type} onChange={event => onTypeChange(event.target.value as TxType | '')}>
            <option value="">Todos</option>
            <option value="REVENUE">Entrada</option>
            <option value="EXPENSE">Saída</option>
          </select>
        </div>

        <div className={styles.filterField}>
          <label className={styles.filterLabel}>Categoria</label>
          <select className={styles.filterSelect} value={categoryId} onChange={event => onCategoryChange(event.target.value)}>
            <option value="">Todos</option>
            {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
          </select>
        </div>

        <div className={styles.filterField}>
          <label className={styles.filterLabel}>Período</label>
          <div className={styles.periodPicker}>
            <button
              type="button"
              className={styles.periodArrow}
              disabled={periods.length === 0 || period === periods[periods.length - 1]}
              onClick={() => {
                const index = period ? periods.indexOf(period) : -1
                onPeriodChange(periods[index + 1] ?? '')
              }}
            >
              <Icon name="chevron-left" size={16} color="currentColor" />
            </button>
            <button
              type="button"
              className={styles.periodText}
              onClick={() => onPeriodChange('')}
              title="Clique para ver todos"
            >
              {period ? formatPeriod(period) : 'Todos'}
            </button>
            <button
              type="button"
              className={styles.periodArrow}
              disabled={periods.length === 0 || period === periods[0]}
              onClick={() => {
                const index = period ? periods.indexOf(period) : periods.length
                onPeriodChange(periods[index - 1] ?? periods[0])
              }}
            >
              <Icon name="chevron-right" size={16} color="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
