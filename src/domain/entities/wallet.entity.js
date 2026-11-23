// Ejercicio 1
import { AppError } from '../errors/AppError.js';
export class Wallet {
  constructor({ name, type = 'CASH', userId }) {
    if (typeof name !== 'string' || !name.trim() || name.length > 100) throw new AppError('Nombre de billetera inválido');
    if (!['CASH', 'BANK', 'DEBIT_CARD', 'OTHER'].includes(type)) throw new AppError('Tipo de billetera inválido');
    if (!userId) throw new AppError('Usuario requerido');
    Object.assign(this, { name: name.trim(), type, userId: String(userId) });
  }
}
