import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../types/types'

const CART_STORAGE_KEY = 'cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY)
    return data ? (JSON.parse(data) as CartItem[]) : []
  } catch {
    return []
  }
}

function saveCartToStorage(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch {
    console.error('Failed to save cart to localStorage')
  }
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: loadCartFromStorage(),
}

// Асинхронные thunk-операции для работы с корзиной
export const addToCartThunk = createAsyncThunk<void, CartItem>('cart/addToCart', (payload, { getState }) => {
  const state = getState() as { cart: CartState }
  const items = [...state.cart.items]
  const existingIndex = items.findIndex(
    (item) => item.id === payload.id && item.size === payload.size
  )

  if (existingIndex !== -1) {
    items[existingIndex] = {
      ...items[existingIndex],
      count: items[existingIndex].count + payload.count,
    }
  } else {
    items.push(payload)
  }

  saveCartToStorage(items)
})

export const removeFromCartThunk = createAsyncThunk<void, { id: number; size: string }>(
  'cart/removeFromCart',
  (payload, { getState }) => {
    const state = getState() as { cart: CartState }
    const items = state.cart.items.filter(
      (item) => !(item.id === payload.id && item.size === payload.size)
    )
    saveCartToStorage(items)
  }
)

export const clearCartThunk = createAsyncThunk<void>('cart/clearCart', () => {
  saveCartToStorage([])
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.fulfilled, (state) => {
        state.items = loadCartFromStorage()
      })
      .addCase(removeFromCartThunk.fulfilled, (state) => {
        state.items = loadCartFromStorage()
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = []
      })
  },
})

export const { setCartItems } = cartSlice.actions
export default cartSlice.reducer
