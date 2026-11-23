// Ejercicio 1
import { Wallet } from '../../domain/entities/wallet.entity.js';
import { AppError } from '../../domain/errors/AppError.js';
export class WalletService {
  constructor(repo){this.repo=repo;}
  create(data,userId){return this.repo.save(new Wallet({...data,userId}));}
  list(userId){return this.repo.findByUserId(userId);}
  async remove(id,userId){if(!Number.isInteger(Number(id))||Number(id)<1)throw new AppError('ID inválido');const item=await this.repo.findOwned(id,userId);if(!item)throw new AppError('Billetera no encontrada',404);if(!await this.repo.deleteOwned(id,userId))throw new AppError('La billetera tiene transacciones asociadas',409);return {message:'Billetera eliminada'};}
}
