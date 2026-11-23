// Ejercicio 2
import { AppError } from '../errors/AppError.js';
export class Transaction {
  constructor({ type, amount, currency = 'BOB', description = '', date, categoryId, walletId = null, isPrivate = false, userId }) {
    if (!['INCOME','EXPENSE'].includes(type)) throw new AppError('Tipo de transacción inválido');
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) throw new AppError('Monto inválido');
    if (!Number.isInteger(Number(categoryId)) || Number(categoryId) < 1) throw new AppError('Categoría inválida');
    if (walletId !== null && (!Number.isInteger(Number(walletId)) || Number(walletId) < 1)) throw new AppError('Billetera inválida');
    if (typeof isPrivate !== 'boolean') throw new AppError('isPrivate debe ser booleano');
    Object.assign(this,{ type,amount:Number(amount),currency:String(currency).toUpperCase(),description,date:date||new Date().toISOString().slice(0,10),categoryId:Number(categoryId),walletId:walletId==null?null:Number(walletId),isPrivate,userId:String(userId) });
  }
}
