import { AuthUseCases } from '../../application/use-cases/AuthUseCases.js';
const uc=new AuthUseCases();
export const authController={register:async(req,res)=>res.status(201).json({ok:true,data:await uc.register(req.body)}),login:async(req,res)=>res.json({ok:true,data:await uc.login(req.body)}),me:async(req,res)=>res.json({ok:true,data:{id:req.user.id,name:req.user.name,email:req.user.email,role:req.user.role}})};
