export function validatePhone(value: string): string | null {
  if (!value) return null

  const cleaned = value.replace(/\D/g, '')

  // Начинается с 8, заменяем на 7
  if (cleaned.startsWith('8') && cleaned.length === 11) {
    return `+7${cleaned.slice(1)}`
  }

  // Начинается с 7 и содержит 11 цифр
  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return `+7${cleaned.slice(1)}`
  }

  return null
}

export function validateAddress(value: string): string | null {
  if (!value || value.trim().length < 5) return null
  return value.trim()
}
