import type { ProductDeli } from '../types/product';

export function formatShippingFee(deli: ProductDeli): string {
  if (deli.who === 'S') return '무료배송';
  return `배송비 ${Number(deli.fee).toLocaleString()}원`;
}
