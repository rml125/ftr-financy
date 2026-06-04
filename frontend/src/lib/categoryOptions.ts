import type { IconName } from '../components/Icon/Icon'

export const CATEGORY_COLORS = [
  '#16a34a',
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#dc2626',
  '#ea580c',
  '#ca8a04',
]

export const CATEGORY_ICONS: { value: IconName; label: string }[] = [
  { value: 'briefcase-business', label: 'Trabalho' },
  { value: 'car-front', label: 'Transporte' },
  { value: 'heart-pulse', label: 'Saúde' },
  { value: 'piggy-bank', label: 'Poupança' },
  { value: 'shopping-cart', label: 'Compras' },
  { value: 'ticket', label: 'Ingressos' },
  { value: 'tool-case', label: 'Serviços' },
  { value: 'utensils', label: 'Alimentação' },
  { value: 'paw-print', label: 'Pets' },
  { value: 'house', label: 'Moradia' },
  { value: 'gift', label: 'Presentes' },
  { value: 'dumbbell', label: 'Fitness' },
  { value: 'book-open', label: 'Livros' },
  { value: 'baggage-claim', label: 'Viagens' },
  { value: 'mailbox', label: 'Correio' },
  { value: 'receipt-text', label: 'Contas' },
]

export const DEFAULT_CATEGORY_COLOR = CATEGORY_COLORS[0]
export const DEFAULT_CATEGORY_ICON = CATEGORY_ICONS[0].value
