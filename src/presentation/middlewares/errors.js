import { AppError } from '../../domain/errors/AppError.js';
export const asyncHandler=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
export function notFound(req,res,next){next(new AppError('Ruta no encontrada',404));}
export function errorHandler(err,req,res,next){
  if(err.code===11000) return res.status(409).json({ok:false,error:'Dato duplicado'});
  if(err.name==='CastError'||err.name==='ValidationError') return res.status(400).json({ok:false,error:'Datos inválidos'});
  const status=err.status||500;
  if(status===500) console.error(err);
  res.status(status).json({ok:false,error:status===500?'Error interno del servidor':err.message});
}
