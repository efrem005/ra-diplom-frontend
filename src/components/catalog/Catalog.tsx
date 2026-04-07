import type { ChangeEvent, SubmitEvent, MouseEvent } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import type { Item, Category } from '../../types/types'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import { fetchCategories, fetchItems } from '../../api/api'

interface CatalogProps {
  searchQuery: string
  searchText: string
  onSearchTextChange: (value: string) => void
  onSearchSubmit: (e: SubmitEvent) => void
}

function Catalog({ searchQuery, searchText, onSearchTextChange, onSearchSubmit }: CatalogProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [offset, setOffset] = useState<number>(0)
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true)
  const [loadingItems, setLoadingItems] = useState<boolean>(true)
  const [errorCategories, setErrorCategories] = useState<string | null>(null)
  const [errorItems, setErrorItems] = useState<string | null>(null)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const loadCategories = useCallback(async (): Promise<void> => {
    setLoadingCategories(true)
    setErrorCategories(null)
    try {
      const data = await fetchCategories()
      const allCategory: Category = { id: 0, title: 'Все' }
      setCategories([allCategory, ...data])
      setActiveCategory(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setErrorCategories(message)
    } finally {
      setLoadingCategories(false)
    }
  }, [])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  const loadItems = useCallback(async (
    categoryId: number | null,
    currentOffset = 0,
    currentQ: string | undefined = '',
    append = false
  ): Promise<void> => {
    if (!append) {
      setLoadingItems(true)
    } else {
      setLoadingMore(true)
    }
    setErrorItems(null)
    try {
      const data = await fetchItems({ categoryId: categoryId === 0 ? undefined : categoryId, offset: currentOffset, q: currentQ })
      if (append) {
        setItems((prev) => [...prev, ...data])
      } else {
        setItems(data)
      }
      setHasMore(data.length >= 6)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setErrorItems(message)
    } finally {
      setLoadingItems(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    setOffset(0)
    setHasMore(true)
    loadItems(activeCategory, 0, searchQuery || undefined, false)
  }, [searchQuery])

  const handleCategoryChange = (categoryId: number | null): void => {
    setActiveCategory(categoryId)
    setOffset(0)
    setHasMore(true)
    loadItems(categoryId, 0, searchQuery || undefined, false)
  }

  const handleLoadMore = (): void => {
    const newOffset = offset + 6
    setOffset(newOffset)
    loadItems(activeCategory, newOffset, searchQuery || undefined, true)
  }

  if (loadingCategories) {
    return (
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <Loader />
      </section>
    )
  }

  if (errorCategories) {
    return (
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <ErrorMessage message={errorCategories} onRetry={loadCategories} />
      </section>
    )
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {onSearchSubmit && (
        <form className="catalog-search-form form-inline" onSubmit={onSearchSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchTextChange(e.target.value)}
          />
        </form>
      )}
      <ul className="catalog-categories nav justify-content-center">
        {categories.map((category) => (
          <li className="nav-item" key={category.id || 'all'}>
            <a
              className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
              href="#"
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                handleCategoryChange(category.id)
              }}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>

      {loadingItems && !loadingMore && <Loader />}
      {errorItems && <ErrorMessage message={errorItems} onRetry={() => loadItems(activeCategory, offset)} />}

      {!loadingItems && !errorItems && (
        <>
          {items.length === 0 ? (
            <div className="text-center">
              <p>Ничего не найдено по запросу &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <>
              <div className="row d-flex flex-wrap">
                {items.map((item) => (
                  <div className="col-4 mb-3" key={item.id}>
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
              {hasMore && (
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? <Loader /> : 'Загрузить ещё'}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default Catalog
