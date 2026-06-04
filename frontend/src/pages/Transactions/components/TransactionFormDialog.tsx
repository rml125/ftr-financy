import type { FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Icon } from '../../../components/Icon/Icon'
import type { Category, Transaction, TransactionInput } from '../../../types'
import styles from '../Transactions.module.css'

export type TransactionFormState = Omit<TransactionInput, 'amount'> & { amount: string }

interface TransactionFormDialogProps {
  open: boolean
  editing: Transaction | null
  form: TransactionFormState
  categories: Category[]
  error: string
  saving: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (event: FormEvent) => void
  onChange: (form: TransactionFormState) => void
}

export function TransactionFormDialog({
  open,
  editing,
  form,
  categories,
  error,
  saving,
  onOpenChange,
  onSubmit,
  onChange,
}: TransactionFormDialogProps) {
  function updateForm(patch: Partial<TransactionFormState>) {
    onChange({ ...form, ...patch })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? 'Editar transação' : 'Nova transação'}</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className={styles.modalForm}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.typeToggleWrap}>
            <button
              type="button"
              className={[styles.typeBtn, form.type === 'EXPENSE' ? styles.typeBtnExpense : ''].join(' ')}
              onClick={() => updateForm({ type: 'EXPENSE' })}
            >
              <Icon name="circle-arrow-down" size={20} />
              Despesa
            </button>
            <button
              type="button"
              className={[styles.typeBtn, form.type === 'REVENUE' ? styles.typeBtnRevenue : ''].join(' ')}
              onClick={() => updateForm({ type: 'REVENUE' })}
            >
              <Icon name="circle-arrow-up" size={20} />
              Receita
            </button>
          </div>

          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Descrição</label>
            <input
              className={styles.modalInput}
              placeholder="Ex. Almoço no restaurante"
              value={form.description}
              onChange={event => updateForm({ description: event.target.value })}
              required
            />
          </div>

          <div className={styles.modalRow}>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Data</label>
              <input
                className={styles.modalInput}
                type="date"
                value={form.date}
                onChange={event => updateForm({ date: event.target.value })}
                required
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Valor</label>
              <div className={styles.modalValueWrap}>
                <span className={styles.modalValuePrefix}>R$</span>
                <input
                  className={styles.modalValueInput}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={form.amount}
                  onChange={event => updateForm({ amount: event.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Categoria</label>
            <div className={styles.modalSelectWrap}>
              <select
                className={styles.modalSelect}
                value={form.categoryId}
                onChange={event => updateForm({ categoryId: event.target.value })}
              >
                <option value="">Selecione</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
              </select>
              <span className={styles.modalSelectIcon}>
                <Icon name="chevron-down" size={16} color="currentColor" />
              </span>
            </div>
          </div>

          <button type="submit" className={styles.modalBtnSave} disabled={saving}>
            {saving ? 'Salvando...' : (editing ? 'Atualizar' : 'Salvar')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
