import { AppError } from '../errors/AppError.js';
export function validateSale(data) {
  if (!Array.isArray(data?.items) || data.items.length === 0) throw new AppError('Debe incluir productos');
  const items = data.items.map(i => {
    if (!i.productId || !Number.isInteger(i.quantity) || i.quantity < 1) throw new AppError('Producto o cantidad inválida');
    return { productId: String(i.productId), quantity: i.quantity };
  });
  const ids = items.map(x => x.productId);
  if (new Set(ids).size !== ids.length) throw new AppError('No repita un producto en una venta');
  return items;
}
