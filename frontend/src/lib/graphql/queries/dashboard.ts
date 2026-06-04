import { gql } from '@apollo/client'

export const GET_DASHBOARD = gql`
  query GetDashboard {
    transactions { id description amount type date category { id title color icon } }
    categories { id title color icon }
  }
`
