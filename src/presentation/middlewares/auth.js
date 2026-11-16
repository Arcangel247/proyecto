import { verifyToken } from '../../infrastructure/security/token.js';
import { UserModel } from '../../infrastructure/models/UserModel.js';
import { AppError } from '../../domain/errors/AppError.js';
export async function authenticate(req,res,next) {
  try { const raw=req.headers.authorization; if(!raw?.startsWith('Bearer ')) throw new AppError('Token requerido',401);
    const payload=verifyToken(raw.slice(7)); const user=await UserModel.findById(payload.sub).select('_id name email role');
    if(!user) throw new AppError('Usuario no existe',401); req.user=user; next();
  } catch(e){next(e.name==='JsonWebTokenError'||e.name==='TokenExpiredError'?new AppError('Token inválido o vencido',401):e);}
}
export const authorize=(...roles)=>(req,res,next)=>roles.includes(req.user?.role)?next():next(new AppError('Permiso insuficiente',403));
