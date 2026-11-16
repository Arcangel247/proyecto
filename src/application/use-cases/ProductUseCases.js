import { validateProduct } from '../../domain/entities/Product.js';
import { AppError } from '../../domain/errors/AppError.js';
export class ProductUseCases {
  constructor(repository) { this.repository=repository; }
  list() { return this.repository.list(); }
  async get(id) { const p=await this.repository.findById(id); if(!p) throw new AppError('Producto no encontrado',404); return p; }
  create(data) { return this.repository.create(validateProduct(data)); }
  async update(id,data) { await this.get(id); const existing=await this.repository.findById(id); return this.repository.update(id,validateProduct({...existing.toObject(),...data})); }
  async remove(id) { await this.get(id); return this.repository.remove(id); }
}
