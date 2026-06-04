/** "YYYY-MM-DD" (input[type=date]) → ISO 8601 completo para GraphQL */
export function dateInputToISO(date: string): string {
  return new Date(date + 'T00:00:00').toISOString()
}

/** ISO 8601 → "YYYY-MM-DD" (valor de input[type=date]) */
export function isoToDateInput(iso: string): string {
  return iso.split('T')[0]
}

/** ISO 8601 → "DD/MM/YYYY" (exibição completa) */
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(iso))
}

/** ISO 8601 → "DD/MM/YY" (exibição com ano de 2 dígitos) */
export function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(iso))
}
