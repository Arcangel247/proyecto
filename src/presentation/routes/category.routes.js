import { Router } from 'express';
import { CategoryModel,TransactionModel } from '../../infrastructure/database/mysql/models.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
import { AppError } from '../../domain/errors/AppError.js';
export const categoryRoutes=Router();categoryRoutes.use(authMiddleware);
categoryRoutes.get('/',a(async(req,res)=>res.json(await CategoryModel.findAll({where:{userId:String(req.user.id)},raw:true}))));
categoryRoutes.post('/',a(async(req,res)=>{const {name,type}=req.body;if(typeof name!=='string'||!name.trim()||!['INCOME','EXPENSE'].includes(type))throw new AppError('Categoría inválida');res.status(201).json((await CategoryModel.create({name:name.trim(),type,userId:String(req.user.id)})).toJSON());}));
categoryRoutes.delete('/:id',a(async(req,res)=>{const owned={id:req.params.id,userId:String(req.user.id)};if(await TransactionModel.count({where:{categoryId:req.params.id,userId:String(req.user.id)}}))throw new AppError('Categoría con transacciones',409);if(!await CategoryModel.destroy({where:owned}))throw new AppError('Categoría no encontrada',404);res.json({message:'Categoría eliminada'});}));
