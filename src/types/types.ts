export interface Size {
  size: string
  available: boolean
}

export interface Item {
  id: number
  category: number
  title: string
  images: string[]
  sku?: string
  manufacturer?: string
  color?: string
  material?: string
  reason?: string
  season?: string
  heelSize?: string
  price: number
  oldPrice?: number
  sizes: Size[]
}

export interface Category {
  id: number
  title: string
}

export interface CartItem {
  id: number
  title: string
  size: string
  price: number
  count: number
  image: string
}

export interface OrderOwner {
  phone: string
  address: string
}

export interface OrderItem {
  id: number
  price: number
  count: number
}

export interface OrderData {
  owner: OrderOwner
  items: OrderItem[]
}

export interface FetchItemsParams {
  categoryId?: number | null
  offset?: number
  q?: string
}

export interface PriceAlert {
  id: number
  title: string
  oldPrice: number
  newPrice: number
}
