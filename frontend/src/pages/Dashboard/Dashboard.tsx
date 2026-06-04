import { useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_DASHBOARD } from '../../lib/graphql/queries/dashboard'
import type { Category, Transaction } from '../../types'
import { CategorySummaryList } from './components/CategorySummaryList'
import { RecentTransactionsList } from './components/RecentTransactionsList'
import { SummaryCards } from './components/SummaryCards'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const { data, loading } = useQuery<{ transactions: Transaction[]; categories: Category[] }>(GET_DASHBOARD)
  const transactions = useMemo(() => data?.transactions ?? [], [data?.transactions])
  const categories = useMemo(() => data?.categories ?? [], [data?.categories])

  const summary = useMemo(() => {
    const income = transactions
      .filter(transaction => transaction.type === 'REVENUE')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
    const expense = transactions
      .filter(transaction => transaction.type === 'EXPENSE')
      .reduce((sum, transaction) => sum + transaction.amount, 0)

    return {
      income,
      expense,
      balance: income - expense,
    }
  }, [transactions])

  const recent = transactions.slice(0, 5)

  const categorySummary = useMemo(() => categories.map(category => {
    const categoryTransactions = transactions.filter(transaction => transaction.category?.id === category.id)
    const total = categoryTransactions.reduce(
      (sum, transaction) => sum + (transaction.type === 'REVENUE' ? transaction.amount : -transaction.amount),
      0,
    )

    return { ...category, count: categoryTransactions.length, total }
  }).filter(category => category.count > 0), [categories, transactions])

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <SummaryCards
          balance={summary.balance}
          income={summary.income}
          expense={summary.expense}
        />

        {loading ? (
          <div className={styles.loading}>Carregando...</div>
        ) : (
          <div className={styles.columns}>
            <RecentTransactionsList transactions={recent} />
            <CategorySummaryList categories={categorySummary} />
          </div>
        )}
      </div>
    </div>
  )
}
