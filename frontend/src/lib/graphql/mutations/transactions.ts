import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: TransactionInput!) {
    createTransaction(input: $input) { id }
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($transactionId: String!, $input: TransactionInput!) {
    updateTransaction(transactionId: $transactionId, input: $input) { id }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: String!) {
    deleteTransaction(transactionId: $transactionId) { id }
  }
`
