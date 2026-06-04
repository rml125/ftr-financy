interface GraphQLErrorLike {
  graphQLErrors?: { message?: string }[]
  message?: string
}

export function getGraphQLErrorMessage(error: unknown, fallback: string) {
  if (typeof error !== 'object' || error === null) return fallback

  const graphQLError = error as GraphQLErrorLike
  return graphQLError.graphQLErrors?.[0]?.message ?? graphQLError.message ?? fallback
}
