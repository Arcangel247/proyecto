import { verifyToken } from '../../infrastructure/security/jwt.js';
export const authMiddleware=(req,res,next)=>{const bearer=req.headers.authorization;if(!bearer?.startsWith('Bearer '))return res.status(401).json({error:'Token requerido'});try{req.user=verifyToken(bearer.slice(7));next();}catch{return res.status(401).json({error:'Token inválido'});}};
