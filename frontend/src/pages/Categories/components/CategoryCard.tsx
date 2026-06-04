import { Icon, type IconName } from '../../../components/Icon/Icon'
import type { Category } from '../../../types'
import styles from './CategoryCard.module.css'

interface CategoryCardProps {
  category: Category
  transactionCount: number
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

export function CategoryCard({ category, transactionCount, onEdit, onDelete }: CategoryCardProps) {
  const iconName = category.icon as IconName

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.iconAvatar} style={{ background: category.color + '20' }}>
          <Icon name={iconName} size={16} style={{ color: category.color }} />
        </div>
        <div className={styles.actions}>
          <button className={styles.deleteBtn} onClick={() => onDelete(category)}>
            <Icon name="trash" size={16} />
          </button>
          <button className={styles.editBtn} onClick={() => onEdit(category)}>
            <Icon name="square-pen" size={16} />
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.name}>{category.title}</p>
        {category.description && <p className={styles.description}>{category.description}</p>}
      </div>
      <div className={styles.footer}>
        <span className={styles.tag} style={{ background: category.color + '20', color: category.color }}>
          {category.title}
        </span>
        <span className={styles.count}>{transactionCount} {transactionCount === 1 ? 'item' : 'itens'}</span>
      </div>
    </div>
  )
}
