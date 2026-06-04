import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories { id title description color icon }
    transactions { id category { id } }
  }
`
