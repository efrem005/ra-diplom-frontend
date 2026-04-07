import { createBrowserRouter } from 'react-router'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import ContactsPage from './pages/ContactsPage'
import HomePage from './pages/HomePage'
import ItemPage from './pages/ItemPage'
import NotFoundPage from './pages/NotFoundPage'
import LayoutTemplate from './pages/layout/LayoutTemplate'

const router = createBrowserRouter([
  {
    path: '/ra-diplom-frontend/',
    element: <LayoutTemplate />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/ra-diplom-frontend/catalog', element: <CatalogPage /> },
      { path: '/ra-diplom-frontend/catalog/:id', element: <ItemPage /> },
      { path: '/ra-diplom-frontend/cart', element: <CartPage /> },
      { path: '/ra-diplom-frontend/about', element: <AboutPage /> },
      { path: '/ra-diplom-frontend/contacts', element: <ContactsPage /> },
      { path: '/ra-diplom-frontend/*', element: <NotFoundPage /> },
    ],
  },
])

export default router
