import { ProductModel } from '../models/ProductModel.js';
import { AppError } from '../../domain/errors/AppError.js';
export class MongoProductRepository {
  async list() { return ProductModel.find().sort({createdAt:-1}).lean(); }
  async findById(id) { if (!/^[a-f\d]{24}$/i.test(id)) throw new AppError('ID inválido'); return ProductModel.findById(id); }
  async create(data) { return ProductModel.create(data); }
  async update(id,data) { return ProductModel.findByIdAndUpdate(id,data,{new:true,runValidators:true}); }
  async remove(id) { return ProductModel.findByIdAndDelete(id); }
}
