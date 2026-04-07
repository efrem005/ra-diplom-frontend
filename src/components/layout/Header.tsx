import type { ReactElement, ChangeEvent, SubmitEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router'
import type { RootState } from '../../store'
import { useAppSelector } from '../../store/hooks'

function Header(): ReactElement {
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const cartItemCount = useAppSelector((state: RootState) => state.cart.items.reduce((total, item) => total + item.count, 0))
  const navigate = useNavigate()
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const handleSearchIconClick = (): void => {
    if (searchOpen && searchText.trim()) {
      if (location.pathname === '/catalog') {
        setSearchParams({ q: searchText.trim() })
      } else {
        navigate(`/ra-diplom-frontend/catalog?q=${encodeURIComponent(searchText.trim())}`)
      }
      setSearchText('')
      setSearchOpen(false)
    } else if (searchOpen && !searchText.trim()) {
      if (location.pathname === '/ra-diplom-frontend/catalog') {
        setSearchParams({})
      } else {
        navigate('/ra-diplom-frontend/catalog')
      }
      setSearchText('')
      setSearchOpen(false)
    } else {
      setSearchOpen(!searchOpen)
    }
  }

  const handleSearchSubmit = (e: SubmitEvent): void => {
    e.preventDefault()
    if (searchText.trim()) {
      if (location.pathname === '/ra-diplom-frontend/catalog') {
        setSearchParams({ q: searchText.trim() })
      } else {
        navigate(`/ra-diplom-frontend/catalog?q=${encodeURIComponent(searchText.trim())}`)
      }
    } else {
      if (location.pathname === '/ra-diplom-frontend/catalog') {
        setSearchParams({})
      } else {
        navigate('/ra-diplom-frontend/catalog')
      }
    }
    setSearchText('')
    setSearchOpen(false)
  }

  const isActive = (path: string): boolean => location.pathname === path

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/ra-diplom-frontend/">
              <img src="/ra-diplom-frontend/img/header-logo.png" alt="Bosa Noga" />
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/ra-diplom-frontend/') ? 'active' : ''}`} to="/ra-diplom-frontend/">
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/ra-diplom-frontend/catalog') ? 'active' : ''}`} to="/ra-diplom-frontend/catalog">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/ra-diplom-frontend/about') ? 'active' : ''}`} to="/ra-diplom-frontend/about">
                    О магазине
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/ra-diplom-frontend/contacts') ? 'active' : ''}`} to="/ra-diplom-frontend/contacts">
                    Контакты
                  </Link>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={handleSearchIconClick}
                  />
                  <Link className="header-controls-pic header-controls-cart" to="/ra-diplom-frontend/cart">
                    <span className={`header-controls-cart-full ${cartItemCount === 0 ? 'hidden' : ''}`}>
                      {cartItemCount}
                    </span>
                    <span className="header-controls-cart-menu" />
                  </Link>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form form-inline ${searchOpen ? '' : 'invisible'}`}
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="form-control"
                    placeholder="Поиск"
                    value={searchText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
