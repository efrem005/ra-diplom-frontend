import type { PriceAlert } from '../../types/types'

interface PriceAlertsProps {
  alerts: PriceAlert[]
  onUpdatePrices: () => void
  onConfirmOldPrices: () => void
}

function PriceAlerts({ alerts, onUpdatePrices, onConfirmOldPrices }: PriceAlertsProps) {
  if (alerts.length === 0) {
    return null
  }

  return (
    <section className="order">
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <div className="card-body">
          <h5 className="text-center">Внимание! Цены изменились</h5>
          {alerts.map((alert) => (
            <p key={alert.id} className="text-center">
              {alert.title}: было {alert.oldPrice.toLocaleString('ru-RU')} руб. →
              стало {alert.newPrice.toLocaleString('ru-RU')} руб.
            </p>
          ))}
          <div className="text-center">
            <button className="btn btn-outline-primary mr-2" onClick={onUpdatePrices}>
              Обновить цены
            </button>
            <button className="btn btn-outline-secondary" onClick={onConfirmOldPrices}>
              Оформить по старым ценам
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PriceAlerts
