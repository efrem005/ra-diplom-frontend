import type { SubmitEvent, ChangeEvent } from 'react'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'

interface OrderFormProps {
  phone: string
  address: string
  agreement: boolean
  loading: boolean
  error: string | null
  onPhoneChange: (value: string) => void
  onAddressChange: (value: string) => void
  onAgreementChange: (checked: boolean) => void
  onSubmit: (e: SubmitEvent) => void
}

function OrderForm({
  phone,
  address,
  agreement,
  loading,
  error,
  onPhoneChange,
  onAddressChange,
  onAgreementChange,
  onSubmit,
}: OrderFormProps) {
  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className="card-body" onSubmit={onSubmit}>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="+7XXXXXXXXXX"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onPhoneChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="address"
              placeholder="Адрес доставки"
              value={address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onAddressChange(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreement"
              checked={agreement}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onAgreementChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary" disabled={loading}>
            Оформить
          </button>
        </form>
      </div>
    </section>
  )
}

export default OrderForm
