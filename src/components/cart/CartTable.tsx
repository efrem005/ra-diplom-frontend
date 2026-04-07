import { Link } from 'react-router'
import { useAppDispatch } from '../../store/hooks'
import { removeFromCartThunk } from '../../store/cartSlice'
import type { CartItem } from '../../types/types'

interface CartTableProps {
  items: CartItem[]
}

function CartTable({ items }: CartTableProps) {
  const dispatch = useAppDispatch()
  const totalPrice = items.reduce((total, item) => total + item.price * item.count, 0)

  if (items.length === 0) {
    return <p className="text-center">Корзина пуста</p>
  }

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`${item.id}-${item.size}`}>
            <td scope="row">{index + 1}</td>
            <td>
              <Link to={`/ra-diplom-frontend/catalog/${item.id}`}>{item.title}</Link>
            </td>
            <td>{item.size}</td>
            <td>{item.count}</td>
            <td>{item.price.toLocaleString('ru-RU')} руб.</td>
            <td>{(item.price * item.count).toLocaleString('ru-RU')} руб.</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => dispatch(removeFromCartThunk({ id: item.id, size: item.size }))}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={6} className="text-right">Общая стоимость</td>
          <td>{totalPrice.toLocaleString('ru-RU')} руб.</td>
        </tr>
      </tbody>
    </table>
  )
}

export default CartTable
