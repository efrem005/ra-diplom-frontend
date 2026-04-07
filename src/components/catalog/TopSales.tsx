import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import type { Item } from '../../types/types'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import { fetchTopSales } from '../../api/api'

function TopSales() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadTopSales = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTopSales()
      setItems(data)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTopSales()
  }, [loadTopSales])

  if (loading) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <Loader />
      </section>
    )
  }

  if (error) {
    return (
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        <ErrorMessage message={error} onRetry={loadTopSales} />
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row d-flex flex-nowrap">
        {items.map((item) => (
          <div className="col-4" key={item.id}>
            <div className="card catalog-item-card">
              <img
                src={item.images[0]}
                className="card-img-top img-fluid"
                alt={item.title}
              />
              <div className="card-body">
                <p className="card-text">{item.title}</p>
                <p className="card-text">{item.price.toLocaleString('ru-RU')} руб.</p>
                <Link to={`/ra-diplom-frontend/catalog/${item.id}`} className="btn btn-outline-primary">
                  Заказать
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopSales
