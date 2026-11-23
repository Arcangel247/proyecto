import { Router } from 'express';
import { TransactionModel } from '../../infrastructure/database/mysql/models.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
export const reportRoutes=Router();reportRoutes.use(authMiddleware);
reportRoutes.get('/summary',a(async(req,res)=>{const data=await TransactionModel.findAll({where:{userId:String(req.user.id)},attributes:['type','convertedAmount'],raw:true});const result={totalIncome:0,totalExpense:0,balance:0};for(const t of data)result[t.type==='INCOME'?'totalIncome':'totalExpense']+=Number(t.convertedAmount);result.balance=Number((result.totalIncome-result.totalExpense).toFixed(2));res.json(result);}));
