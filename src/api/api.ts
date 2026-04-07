import type { Category, FetchItemsParams, Item, OrderData } from '../types/types'

const API_URL = import.meta.env.VITE_API_URL

async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, options)

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`
    try {
      const error = await response.json() as { error?: string }
      if (error.error) errorMessage = error.error
    } catch {
      // Игнорируем, если ответ не в формате JSON
    }
    throw new Error(errorMessage)
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>
  }

  // Если сервер возвращает ответ, но это не JSON
  await response.text()
  throw new Error(`Неверный формат ответа сервера (ожидается JSON). Попробуйте позже.`)
}

export async function fetchTopSales(): Promise<Item[]> {
  return fetchApi<Item[]>('/top-sales')
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchApi<Category[]>('/categories')
}

export async function fetchItems({ categoryId, offset = 0, q = '' }: FetchItemsParams = {}): Promise<Item[]> {
  const params = new URLSearchParams()

  if (categoryId !== undefined && categoryId !== null) {
    params.set('categoryId', String(categoryId))
  }
  if (offset) {
    params.set('offset', String(offset))
  }
  if (q) {
    params.set('q', q)
  }

  const queryString = params.toString()
  return fetchApi<Item[]>(`/items${queryString ? `?${queryString}` : ''}`)
}

export async function fetchItemById(id: string): Promise<Item> {
  return fetchApi<Item>(`/items/${id}`)
}

export async function submitOrder(orderData: OrderData): Promise<void> {
  const response = await fetch(`${API_URL}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const error = await response.json().catch((): { error: string } => ({ error: 'Server error' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  // Сервер может вернуть пустой ответ при успешном заказе
  const text = await response.text()
  if (text) {
    JSON.parse(text)
  }
}
