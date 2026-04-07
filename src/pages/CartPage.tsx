import type { SubmitEvent } from 'react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCartThunk } from '../store/cartSlice'
import CartTable from '../components/cart/CartTable'
import PriceAlerts from '../components/cart/PriceAlerts'
import OrderForm from '../components/cart/OrderForm'
import OrderSuccess from '../components/cart/OrderSuccess'
import { submitOrder, fetchItemById } from '../api/api'
import { validatePhone, validateAddress } from '../utils/validation'

import type { PriceAlert } from '../types/types'

function CartPage() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.items)
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [agreement, setAgreement] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([])

  const checkPrices = async (): Promise<PriceAlert[]> => {
    const alerts: PriceAlert[] = []
    for (const item of cart) {
      try {
        const current = await fetchItemById(String(item.id))
        if (current.price !== item.price) {
          alerts.push({
            id: item.id,
            title: item.title,
            oldPrice: item.price,
            newPrice: current.price,
          })
        }
      } catch {
        // Игнорируем, если не удалось получить данные
      }
    }
    return alerts
  }

  const handleOrderSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault()
    setError(null)
    setPriceAlerts([])

    const validPhone = validatePhone(phone)
    if (!validPhone) {
      setError('Введите корректный номер телефона (11 цифр, начиная с +7 или 8)')
      return
    }

    const validAddress = validateAddress(address)
    if (!validAddress) {
      setError('Введите адрес доставки (минимум 5 символов)')
      return
    }

    if (!agreement) {
      setError('Согласитесь с правилами доставки')
      return
    }

    const alerts = await checkPrices()
    if (alerts.length > 0) {
      setPriceAlerts(alerts)
      return
    }

    setLoading(true)

    try {
      await submitOrder({
        owner: {
          phone: validPhone,
          address: validAddress,
        },
        items: cart.map((item) => ({
          id: item.id,
          price: item.price,
          count: item.count,
        })),
      })
      dispatch(clearCartThunk())
      setSuccess(true)
      setPhone('')
      setAddress('')
      setAgreement(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmOrder = async (): Promise<void> => {
    setPriceAlerts([])
    setLoading(true)
    setError(null)

    const validPhone = validatePhone(phone)
    const validAddress = validateAddress(address)

    try {
      await submitOrder({
        owner: { phone: validPhone!, address: validAddress! },
        items: cart.map((item) => ({
          id: item.id,
          price: item.price,
          count: item.count,
        })),
      })
      dispatch(clearCartThunk())
      setSuccess(true)
      setPhone('')
      setAddress('')
      setAgreement(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePrices = (): void => {
    setPriceAlerts([])
  }

  if (success) {
    return <OrderSuccess />
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <CartTable items={cart} />
          </section>

          <PriceAlerts
            alerts={priceAlerts}
            onUpdatePrices={handleUpdatePrices}
            onConfirmOldPrices={handleConfirmOrder}
          />

          {cart.length > 0 && priceAlerts.length === 0 && (
            <OrderForm
              phone={phone}
              address={address}
              agreement={agreement}
              loading={loading}
              error={error}
              onPhoneChange={setPhone}
              onAddressChange={setAddress}
              onAgreementChange={setAgreement}
              onSubmit={handleOrderSubmit}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default CartPage
