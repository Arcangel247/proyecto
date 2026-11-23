import { Router } from 'express';
import { BudgetModel,CategoryModel } from '../../infrastructure/database/mysql/models.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
import { AppError } from '../../domain/errors/AppError.js';
export const budgetRoutes=Router();budgetRoutes.use(authMiddleware);
budgetRoutes.get('/',a(async(req,res)=>res.json(await BudgetModel.findAll({where:{userId:String(req.user.id)},raw:true}))));
budgetRoutes.post('/',a(async(req,res)=>{const {amountLimit,month,year,categoryId}=req.body;if(!(Number(amountLimit)>0)||!Number.isInteger(month)||month<1||month>12||!Number.isInteger(year)||year<2000)throw new AppError('Presupuesto inválido');if(!await CategoryModel.findOne({where:{id:categoryId,userId:String(req.user.id)}}))throw new AppError('Categoría no encontrada',404);res.status(201).json((await BudgetModel.create({amountLimit,month,year,categoryId,userId:String(req.user.id)})).toJSON());}));
