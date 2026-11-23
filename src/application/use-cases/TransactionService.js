import { Transaction } from '../../domain/entities/transaction.entity.js';
import { AppError } from '../../domain/errors/AppError.js';
import { TransactionModel,CategoryModel } from '../../infrastructure/database/mysql/models.js';
import { CurrencyModel } from '../../infrastructure/database/mongo/models.js';
// Ejercicio 2
export class TransactionService {
  constructor(wallets){this.wallets=wallets;}
  async create(data,userId){
    const transaction=new Transaction({...data,userId});
    const category=await CategoryModel.findOne({where:{id:transaction.categoryId,userId:String(userId)}});
    if(!category||category.type!==transaction.type)throw new AppError('Categoría inexistente o incompatible',400);
    if(transaction.walletId!==null && !await this.wallets.findOwned(transaction.walletId,userId))throw new AppError('Billetera inexistente o ajena',400);
    const code=transaction.currency;
    const rate=code==='BOB'?1:(await CurrencyModel.findOne({code,date:transaction.date}))?.exchangeRate;
    if(!rate)throw new AppError('No existe tipo de cambio para la fecha',400);
    return (await TransactionModel.create({...transaction,exchangeRate:rate,convertedAmount:Number((transaction.amount*rate).toFixed(2))})).toJSON();
  }
  list(userId){return TransactionModel.findAll({where:{userId:String(userId)},order:[['date','DESC'],['id','DESC']],raw:true});}
  async update(id,data,userId){
    const tx=await TransactionModel.findOne({where:{id,userId:String(userId)}});if(!tx)throw new AppError('Transacción no encontrada',404);
    const merged={...tx.toJSON(),...data,userId};const validated=new Transaction(merged);
    const cat=await CategoryModel.findOne({where:{id:validated.categoryId,userId:String(userId)}});if(!cat||cat.type!==validated.type)throw new AppError('Categoría inexistente o incompatible');
    if(validated.walletId!==null&&!await this.wallets.findOwned(validated.walletId,userId))throw new AppError('Billetera inexistente o ajena');
    const rate=validated.currency==='BOB'?1:(await CurrencyModel.findOne({code:validated.currency,date:validated.date}))?.exchangeRate;
    if(!rate)throw new AppError('Tipo de cambio no encontrado');
    await tx.update({...validated,exchangeRate:rate,convertedAmount:Number((validated.amount*rate).toFixed(2))});return tx.toJSON();
  }
  async remove(id,userId){if(!await TransactionModel.destroy({where:{id,userId:String(userId)}}))throw new AppError('Transacción no encontrada',404);return {message:'Transacción eliminada'};}
  // Ejercicio 3
  async receipt(id){
    const tx=await TransactionModel.findByPk(id);if(!tx)throw new AppError('Comprobante no encontrado',404);
    if(tx.isPrivate)throw new AppError('Comprobante privado',403);
    const {type,amount,currency,convertedAmount,description,date,categoryId,walletId}=tx.toJSON();
    return {id:tx.id,type,amount,currency,convertedAmount,description,date,categoryId,walletId};
  }
}
