import { SaleUseCases } from '../../application/use-cases/SaleUseCases.js';
const uc=new SaleUseCases();
export const saleController={list:async(req,res)=>res.json({ok:true,data:await uc.list()}),create:async(req,res)=>res.status(201).json({ok:true,data:await uc.create(req.body,req.user.id)})};
