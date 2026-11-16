import { AppError } from '../errors/AppError.js';
export function validateProduct(data) {
  if (!data || typeof data.name !== 'string' || !data.name.trim()) throw new AppError('El nombre es obligatorio');
  if (!Number.isFinite(data.price) || data.price < 0) throw new AppError('El precio debe ser positivo o cero');
  if (!Number.isInteger(data.stock) || data.stock < 0) throw new AppError('El stock debe ser un entero no negativo');
  return { name: data.name.trim(), sku: String(data.sku || '').trim(), price: data.price, stock: data.stock, description: String(data.description || '') };
}
