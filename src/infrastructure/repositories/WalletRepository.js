// Ejercicio 1
import { WalletModel,TransactionModel } from '../database/mysql/models.js';
export class WalletRepository {
  async save(data){return (await WalletModel.create(data)).toJSON();}
  async findByUserId(userId){return WalletModel.findAll({where:{userId:String(userId)},order:[['id','ASC']],raw:true});}
  async findOwned(id,userId){return WalletModel.findOne({where:{id,userId:String(userId)},raw:true});}
  async deleteOwned(id,userId){const count=await TransactionModel.count({where:{walletId:id,userId:String(userId)}});if(count)return false;return (await WalletModel.destroy({where:{id,userId:String(userId)}}))>0;}
}
