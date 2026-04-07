interface ItemQuantityProps {
  count: number
  onIncrement: () => void
  onDecrement: () => void
}

function ItemQuantity({ count, onIncrement, onDecrement }: ItemQuantityProps) {
  return (
    <p>
      Количество:{' '}
      <span className="btn-group btn-group-sm pl-2">
        <button className="btn btn-secondary" onClick={onDecrement}>-</button>
        <span className="btn btn-outline-primary">{count}</span>
        <button className="btn btn-secondary" onClick={onIncrement}>+</button>
      </span>
    </p>
  )
}

export default ItemQuantity
