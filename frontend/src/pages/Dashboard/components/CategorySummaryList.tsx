import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../lib/format'
import type { Category } from '../../../types'
import styles from '../Dashboard.module.css'

export interface CategorySummaryItem extends Category {
  count: number
  total: number
}

interface CategorySummaryListProps {
  categories: CategorySummaryItem[]
}

export function CategorySummaryList({ categories }: CategorySummaryListProps) {
  return (
    <section className={styles.colSide}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>CATEGORIAS</span>
        <Link to="/categories" className={styles.sectionLink}>Gerenciar &rsaquo;</Link>
      </div>
      <div className={styles.catList}>
        {categories.length === 0 ? (
          <div className={styles.empty}>Nenhuma categoria com transações.</div>
        ) : (
          categories.map(category => (
            <div key={category.id} className={styles.catRow}>
              <span className={styles.catTag} style={{ background: category.color + '22', color: category.color }}>
                {category.title}
              </span>
              <span className={styles.catCount}>{category.count} {category.count === 1 ? 'item' : 'itens'}</span>
              <span className={styles.catTotal}>
                {formatCurrency(Math.abs(category.total))}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
