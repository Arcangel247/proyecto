import { MongoProductRepository } from '../../infrastructure/repositories/MongoProductRepository.js';
import { ProductUseCases } from '../../application/use-cases/ProductUseCases.js';
const uc=new ProductUseCases(new MongoProductRepository());
export const productController={list:async(req,res)=>res.json({ok:true,data:await uc.list()}),get:async(req,res)=>res.json({ok:true,data:await uc.get(req.params.id)}),create:async(req,res)=>res.status(201).json({ok:true,data:await uc.create(req.body)}),update:async(req,res)=>res.json({ok:true,data:await uc.update(req.params.id,req.body)}),remove:async(req,res)=>{await uc.remove(req.params.id);res.status(204).end();}};
