// Entidades retornadas pela API
export interface User {
  id: string
  name: string
  email: string
}

export type TransactionType = 'EXPENSE' | 'REVENUE'

export interface Category {
  id: string
  title: string
  description?: string
  color: string
  icon: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  date: string
  category?: Category
}

export interface TransactionSlim {
  id: string
  category?: { id: string } | null
}

// Inputs de autenticação
export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

// Inputs de categoria e transação
export interface CategoryInput {
  title: string
  description?: string
  color: string
  icon: string
}

export interface TransactionInput {
  description: string
  amount: number
  type: TransactionType
  date: string
  categoryId: string
}
