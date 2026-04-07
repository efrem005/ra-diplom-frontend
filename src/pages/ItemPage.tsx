import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useAppDispatch } from '../store/hooks'
import { addToCartThunk } from '../store/cartSlice'
import type { Item, Size } from '../types/types'
import Loader from '../components/common/Loader'
import ErrorMessage from '../components/common/ErrorMessage'
import ItemDetails from '../components/item/ItemDetails'
import ItemSizes from '../components/item/ItemSizes'
import ItemQuantity from '../components/item/ItemQuantity'
import ItemAddToCart from '../components/item/ItemAddToCart'
import { fetchItemById } from '../api/api'

function ItemPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [count, setCount] = useState<number>(1)

  const loadItem = useCallback(async (): Promise<void> => {
    if (!id) return
    setLoading(true)
    setError(null)
    setSelectedSize(null)
    setCount(1)
    try {
      const data = await fetchItemById(id)
      setItem(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadItem()
  }, [loadItem])

  const availableSizes: Size[] = item?.sizes?.filter((s) => s.available) || []
  const hasAvailableSizes: boolean = availableSizes.length > 0

  const handleAddToCart = (): void => {
    if (!selectedSize || !item) return

    dispatch(addToCartThunk({
      id: item.id,
      title: item.title,
      size: selectedSize,
      price: item.price,
      count,
      image: item.images[0],
    }))

    navigate('/ra-diplom-frontend/cart')
  }

  const handleIncrement = (): void => {
    if (count < 10) {
      setCount(count + 1)
    }
  }

  const handleDecrement = (): void => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  if (loading) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="catalog-item">
              <h2 className="text-center">Загрузка...</h2>
              <Loader />
            </section>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="catalog-item">
              <h2 className="text-center">Ошибка</h2>
              <ErrorMessage message={error} onRetry={loadItem} />
            </section>
          </div>
        </div>
      </main>
    )
  }

  if (!item) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="catalog-item">
              <h2 className="text-center">Товар не найден</h2>
            </section>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="catalog-item">
            <h2 className="text-center">{item.title}</h2>
            <div className="row">
              <div className="col-5">
                <img src={item.images[0]} className="img-fluid" alt={item.title} />
              </div>
              <div className="col-7">
                <ItemDetails item={item} />
                {hasAvailableSizes && (
                  <div className="text-center">
                    <ItemSizes
                      sizes={availableSizes}
                      selectedSize={selectedSize}
                      onSelect={setSelectedSize}
                    />
                    <ItemQuantity
                      count={count}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                    />
                  </div>
                )}
                <ItemAddToCart
                  hasAvailableSizes={hasAvailableSizes}
                  selectedSize={selectedSize}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ItemPage
