import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) { id }
  }
`

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($categoryId: String!, $input: CategoryInput!) {
    updateCategory(categoryId: $categoryId, input: $input) { id }
  }
`

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId) { id }
  }
`
