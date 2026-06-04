import { Icon } from '../../../components/Icon/Icon'
import styles from '../Transactions.module.css'

interface PaginationProps {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPageNumbers(page: number, totalPages: number) {
  const delta = 2
  const pages: (number | '...')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return pages
}

export function Pagination({ page, pageSize, totalItems, totalPages, onPageChange }: PaginationProps) {
  if (totalItems === 0) return null

  return (
    <div className={styles.pagination}>
      <span className={styles.paginationInfo}>
        {(page - 1) * pageSize + 1} a {Math.min(page * pageSize, totalItems)}
        <span className={styles.paginationSep}>|</span>
        {totalItems} resultados
      </span>
      <div className={styles.paginationPages}>
        <button className={styles.pageBtn} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <Icon name="chevron-left" size={14} color="currentColor" />
        </button>
        {getPageNumbers(page, totalPages).map((item, index) =>
          item === '...'
            ? <span key={`ellipsis-${index}`} className={styles.pageEllipsis}>...</span>
            : <button
                key={item}
                className={[styles.pageBtn, page === item ? styles.pageBtnActive : ''].join(' ')}
                onClick={() => onPageChange(item)}
              >{item}</button>
        )}
        <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
          <Icon name="chevron-right" size={14} color="currentColor" />
        </button>
      </div>
    </div>
  )
}
