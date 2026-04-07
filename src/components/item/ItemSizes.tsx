import type { Size } from '../../types/types'

interface ItemSizesProps {
  sizes: Size[]
  selectedSize: string | null
  onSelect: (size: string) => void
}

function ItemSizes({ sizes, selectedSize, onSelect }: ItemSizesProps) {
  return (
    <p>
      Размеры в наличии:{' '}
      {sizes.map((s) => (
        <span
          key={s.size}
          className={`catalog-item-size ${selectedSize === s.size ? 'selected' : ''}`}
          onClick={() => onSelect(s.size)}
        >
          {s.size}
        </span>
      ))}
    </p>
  )
}

export default ItemSizes
