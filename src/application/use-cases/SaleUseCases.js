import { validateSale } from '../../domain/entities/Sale.js';
import { AppError } from '../../domain/errors/AppError.js';
import { SaleModel } from '../../infrastructure/models/SaleModel.js';
import { ProductModel } from '../../infrastructure/models/ProductModel.js';
export class SaleUseCases {
  async list() { return SaleModel.find().sort({createdAt:-1}).lean(); }
  async create(payload,userId) {
    const items=validateSale(payload); const session=await ProductModel.startSession();
    try {
      let result;
      await session.withTransaction(async()=>{
        const details=[];
        for (const item of items) {
          const p=await ProductModel.findOneAndUpdate({_id:item.productId,stock:{$gte:item.quantity}},{$inc:{stock:-item.quantity}},{new:true,session});
          if (!p) throw new AppError('Producto inexistente o sin stock suficiente',409);
          details.push({productId:p._id,name:p.name,quantity:item.quantity,unitPrice:p.price,subtotal:p.price*item.quantity});
        }
        const created=await SaleModel.create([{items:details,total:details.reduce((a,x)=>a+x.subtotal,0),soldBy:userId}],{session});
        result=created[0];
      });
      return result;
    } finally { await session.endSession(); }
  }
}
