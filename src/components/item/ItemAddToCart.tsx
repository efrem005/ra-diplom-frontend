interface ItemAddToCartProps {
  hasAvailableSizes: boolean
  selectedSize: string | null
  onAddToCart: () => void
}

function ItemAddToCart({ hasAvailableSizes, selectedSize, onAddToCart }: ItemAddToCartProps) {
  if (!hasAvailableSizes) {
    return null
  }

  if (selectedSize) {
    return (
      <button className="btn btn-danger btn-block btn-lg" onClick={onAddToCart}>
        В корзину
      </button>
    )
  }

  return (
    <button className="btn btn-danger btn-block btn-lg" disabled>
      Выберите размер
    </button>
  )
}

export default ItemAddToCart
