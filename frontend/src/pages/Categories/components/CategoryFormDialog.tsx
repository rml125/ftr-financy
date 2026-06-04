import type { FormEvent } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '../../../components/Input/Input'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../lib/categoryOptions'
import type { IconName } from '../../../components/Icon/Icon'
import type { Category, CategoryInput } from '../../../types'
import { ColorPicker } from './ColorPicker'
import { IconPicker } from './IconPicker'
import styles from './CategoryFormDialog.module.css'

interface CategoryFormDialogProps {
  open: boolean
  editing: Category | null
  form: CategoryInput
  error: string
  saving: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (event: FormEvent) => void
  onChange: (form: CategoryInput) => void
}

export function CategoryFormDialog({
  open,
  editing,
  form,
  error,
  saving,
  onOpenChange,
  onSubmit,
  onChange,
}: CategoryFormDialogProps) {
  function updateForm(patch: Partial<CategoryInput>) {
    onChange({ ...form, ...patch })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? 'Editar categoria' : 'Nova categoria'}</DialogTitle>
          <DialogDescription>Organize suas transações com categorias</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className={styles.form}>
          {error && <div className={styles.errorBanner}>{error}</div>}

          <Input
            label="Título"
            placeholder="Ex. Alimentação"
            value={form.title}
            onChange={event => updateForm({ title: event.target.value })}
            required
          />

          <div>
            <Input
              label="Descrição"
              placeholder="Descrição da categoria"
              value={form.description ?? ''}
              onChange={event => updateForm({ description: event.target.value })}
            />
            <span className={styles.inputHint}>Opcional</span>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Ícone</label>
            <IconPicker
              options={CATEGORY_ICONS}
              value={form.icon}
              onChange={(icon: IconName) => updateForm({ icon })}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Cor</label>
            <ColorPicker
              colors={CATEGORY_COLORS}
              value={form.color}
              onChange={color => updateForm({ color })}
            />
          </div>

          <button type="submit" className={styles.btnSave} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
