import { useMemo, useState, type FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { Button } from '../../components/Button/Button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Icon, type IconName } from '../../components/Icon/Icon'
import { DEFAULT_CATEGORY_COLOR, DEFAULT_CATEGORY_ICON } from '../../lib/categoryOptions'
import { getGraphQLErrorMessage } from '../../lib/graphql/error'
import { GET_CATEGORIES } from '../../lib/graphql/queries/categories'
import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../../lib/graphql/mutations/categories'
import type { Category, CategoryInput, TransactionSlim } from '../../types'
import { CategoryCard } from './components/CategoryCard'
import { CategoryFormDialog } from './components/CategoryFormDialog'
import styles from './Categories.module.css'

const refetchCategories = { refetchQueries: [{ query: GET_CATEGORIES }] }

function createDefaultForm(): CategoryInput {
  return {
    title: '',
    description: '',
    color: DEFAULT_CATEGORY_COLOR,
    icon: DEFAULT_CATEGORY_ICON,
  }
}

function countTransactionsByCategory(transactions: TransactionSlim[]) {
  return transactions.reduce<Record<string, number>>((counts, tx) => (
    tx.category?.id
      ? { ...counts, [tx.category.id]: (counts[tx.category.id] ?? 0) + 1 }
      : counts
  ), {})
}

function getMostUsedCategory(categories: Category[], txCountById: Record<string, number>) {
  return categories
    .map(cat => ({ ...cat, count: txCountById[cat.id] ?? 0 }))
    .filter(cat => cat.count > 0)
    .sort((a, b) => b.count - a.count)[0] ?? null
}

export function Categories() {
  const { data, loading } = useQuery<{ categories: Category[]; transactions: TransactionSlim[] }>(GET_CATEGORIES)
  const categories = useMemo(() => data?.categories ?? [], [data?.categories])
  const transactions = useMemo(() => data?.transactions ?? [], [data?.transactions])

  const [createCategory, { loading: creating }] = useMutation(CREATE_CATEGORY, refetchCategories)
  const [updateCategory, { loading: updating }] = useMutation(UPDATE_CATEGORY, refetchCategories)
  const [deleteCategory] = useMutation(DELETE_CATEGORY, refetchCategories)

  const saving = creating || updating

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [blockedCat, setBlockedCat] = useState<string | null>(null)
  const [form, setForm] = useState<CategoryInput>(createDefaultForm)
  const [formError, setFormError] = useState('')

  function openCreate() {
    setEditing(null)
    setForm(createDefaultForm())
    setFormError('')
    setModalOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setForm({ title: cat.title, description: cat.description ?? '', color: cat.color, icon: cat.icon })
    setFormError('')
    setModalOpen(true)
  }

  function requestDelete(category: Category) {
    if ((txCountById[category.id] ?? 0) > 0) {
      setBlockedCat(category.title)
      return
    }
    setDeleteId(category.id)
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    const input: CategoryInput = { title: form.title, description: form.description || undefined, color: form.color, icon: form.icon }
    try {
      if (editing) {
        await updateCategory({ variables: { categoryId: editing.id, input } })
      } else {
        await createCategory({ variables: { input } })
      }
      setModalOpen(false)
    } catch (err) {
      setFormError(getGraphQLErrorMessage(err, 'Erro ao salvar'))
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await deleteCategory({ variables: { categoryId: deleteId } })
      setDeleteId(null)
    } catch {
      return
    }
  }

  const txCountById = countTransactionsByCategory(transactions)
  const mostUsedCategory = getMostUsedCategory(categories, txCountById)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Categorias</h1>
          <p className={styles.subtitle}>Organize suas transações por categorias</p>
        </div>
        <button className={styles.btnNew} onClick={openCreate}>
          <Icon name="plus" size={16} />
          Nova categoria
        </button>
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon} style={{ color: 'var(--color-gray-700)' }}><Icon name="tag" size={24} /></div>
          <p className={styles.summaryValue}>{categories.length}</p>
          <p className={styles.summaryLabel}>Total de categorias</p>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon} style={{ color: 'var(--color-purple-base)' }}><Icon name="arrow-up-down" size={24} /></div>
          <p className={styles.summaryValue}>{transactions.length}</p>
          <p className={styles.summaryLabel}>Transações realizadas</p>
        </div>
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ color: mostUsedCategory?.color ?? 'var(--color-gray-400)' }}
          >
            <Icon name={(mostUsedCategory?.icon as IconName) ?? 'tag'} size={32} />
          </div>
          <p className={styles.summaryValue}>
            {mostUsedCategory?.title ?? '—'}
          </p>
          <p className={styles.summaryLabel}>Categoria mais utilizada</p>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : categories.length === 0 ? (
        <div className={styles.empty}>Nenhuma categoria ainda. Crie a primeira!</div>
      ) : (
        <div className={styles.grid}>
          {categories.map(cat => {
            const count = txCountById[cat.id] ?? 0
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                transactionCount={count}
                onEdit={openEdit}
                onDelete={requestDelete}
              />
            )
          })}
        </div>
      )}

      <CategoryFormDialog
        open={modalOpen}
        editing={editing}
        form={form}
        error={formError}
        saving={saving}
        onOpenChange={open => !open && setModalOpen(false)}
        onSubmit={handleSave}
        onChange={setForm}
      />

      <Dialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir categoria</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir esta categoria?</DialogDescription>
          </DialogHeader>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Excluir</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!blockedCat} onOpenChange={open => !open && setBlockedCat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Não é possível excluir</DialogTitle>
            <DialogDescription>
              A categoria <strong>{blockedCat}</strong> está sendo utilizada em transações e não pode ser excluída.
              Remova ou edite as transações associadas antes de excluir esta categoria.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.actions}>
            <Button variant="ghost" onClick={() => setBlockedCat(null)}>Entendi</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
