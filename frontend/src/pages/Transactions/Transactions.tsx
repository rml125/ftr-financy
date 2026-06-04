import { useMemo, useState, type FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon/Icon'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { GET_TRANSACTIONS } from '../../lib/graphql/queries/transactions'
import { CREATE_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from '../../lib/graphql/mutations/transactions'
import { dateInputToISO, isoToDateInput } from '../../lib/date'
import { getGraphQLErrorMessage } from '../../lib/graphql/error'
import type { Category, Transaction, TransactionInput, TransactionType as TxType } from '../../types'
import { Pagination } from './components/Pagination'
import { TransactionFormDialog, type TransactionFormState } from './components/TransactionFormDialog'
import { TransactionsFilters } from './components/TransactionsFilters'
import { TransactionsTable } from './components/TransactionsTable'
import styles from './Transactions.module.css'

const PAGE_SIZE = 10

const refetchTransactions = { refetchQueries: [{ query: GET_TRANSACTIONS }] }

function createDefaultForm(): TransactionFormState {
  return {
    description: '',
    amount: '',
    type: 'EXPENSE',
    date: '',
    categoryId: '',
  }
}

export function Transactions() {
  const { data, loading } = useQuery<{ transactions: Transaction[]; categories: Category[] }>(GET_TRANSACTIONS)
  const transactions = useMemo(() => data?.transactions ?? [], [data?.transactions])
  const categories = useMemo(() => data?.categories ?? [], [data?.categories])

  const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION, refetchTransactions)
  const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION, refetchTransactions)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, refetchTransactions)

  const saving = creating || updating

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<TxType | ''>('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('')

  const [form, setForm] = useState<TransactionFormState>(createDefaultForm)
  const [formError, setFormError] = useState('')

  function resetPage() {
    setPage(1)
  }

  function filterChange<T>(setter: (v: T) => void) {
    return (value: T) => { setter(value); resetPage() }
  }

  function openCreate() {
    setEditing(null)
    setForm({ ...createDefaultForm(), date: isoToDateInput(new Date().toISOString()) })
    setFormError('')
    setModalOpen(true)
  }

  function openEdit(transaction: Transaction) {
    setEditing(transaction)
    setForm({
      description: transaction.description,
      amount: String(transaction.amount),
      type: transaction.type,
      date: isoToDateInput(transaction.date),
      categoryId: transaction.category?.id ?? '',
    })
    setFormError('')
    setModalOpen(true)
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (!form.categoryId) {
      setFormError('Selecione uma categoria')
      return
    }

    setFormError('')
    const input: TransactionInput = {
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      date: dateInputToISO(form.date),
      categoryId: form.categoryId,
    }

    try {
      if (editing) {
        await updateTransaction({ variables: { transactionId: editing.id, input } })
      } else {
        await createTransaction({ variables: { input } })
      }
      setModalOpen(false)
    } catch (err) {
      setFormError(getGraphQLErrorMessage(err, 'Erro ao salvar'))
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await deleteTransaction({ variables: { transactionId: deleteId } })
      setDeleteId(null)
    } catch {
      return
    }
  }

  const periods = useMemo(() => {
    const periodSet = new Set<string>()
    transactions.forEach(transaction => {
      if (transaction.date) periodSet.add(transaction.date.slice(0, 7))
    })
    return [...periodSet].sort((a, b) => b.localeCompare(a))
  }, [transactions])

  const filtered = useMemo(() => transactions.filter(transaction => {
    if (search && !transaction.description.toLowerCase().includes(search.toLowerCase())) return false
    if (filterType && transaction.type !== filterType) return false
    if (filterCategory && transaction.category?.id !== filterCategory) return false
    if (filterPeriod && !transaction.date.startsWith(filterPeriod)) return false
    return true
  }), [transactions, search, filterType, filterCategory, filterPeriod])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Transações</h1>
          <p className={styles.subtitle}>Gerencie todas as suas transações financeiras</p>
        </div>
        <button className={styles.btnNew} onClick={openCreate}>
          <Icon name="plus" size={16} />
          Nova transação
        </button>
      </div>

      <TransactionsFilters
        categories={categories}
        periods={periods}
        search={search}
        type={filterType}
        categoryId={filterCategory}
        period={filterPeriod}
        onSearchChange={filterChange(setSearch)}
        onTypeChange={filterChange(setFilterType)}
        onCategoryChange={filterChange(setFilterCategory)}
        onPeriodChange={filterChange(setFilterPeriod)}
      />

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.tableCard}>
          <TransactionsTable
            transactions={paginated}
            onEdit={openEdit}
            onDelete={setDeleteId}
          />
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            totalItems={filtered.length}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <TransactionFormDialog
        open={modalOpen}
        editing={editing}
        form={form}
        categories={categories}
        error={formError}
        saving={saving}
        onOpenChange={open => !open && setModalOpen(false)}
        onSubmit={handleSave}
        onChange={setForm}
      />

      <Dialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir transação</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir esta transação?</DialogDescription>
          </DialogHeader>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
