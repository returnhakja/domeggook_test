import './ProductItem.css';
import type { ProductItem as ProductItemType } from '../../types/product';
import { formatShippingFee } from '../../utils/formatShippingFee';

interface ProductItemProps {
  item: ProductItemType;
}

export default function ProductItem({ item }: ProductItemProps) {
  const shippingFee = formatShippingFee(item.deli);

  return (
    <div className="product-item">
      <div className="product-item__thumbnail">
        <img src={item.thumb} alt={item.title} />
      </div>
      <div className="product-item__info">
        <p className="product-item__company">{item.nick ?? item.id}</p>
        <p className="product-item__name">{item.title}</p>
        <p className="product-item__price">{Number(item.price).toLocaleString()}원</p>
        <div className="product-item__meta">
          <span>최소 {Number(item.unitQty).toLocaleString()}개</span>
          <span>{shippingFee}</span>
        </div>
      </div>
    </div>
  );
}
