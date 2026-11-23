// Ejercicio 4
import { Router } from 'express';
import { CurrencyModel } from '../../infrastructure/database/mongo/models.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
import { AppError } from '../../domain/errors/AppError.js';
export const currencyRoutes=Router();currencyRoutes.use(authMiddleware);
currencyRoutes.get('/',a(async(req,res)=>res.json(await CurrencyModel.find().lean())));
/** @swagger
 * /currencies:
 *   post:
 *     tags: [Currencies]
 *     summary: Registrar tipo de cambio (solo admin)
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, name, exchangeRate, date]
 *             properties:
 *               code: {type: string, example: USD}
 *               name: {type: string, example: Dólar estadounidense}
 *               symbol: {type: string, example: $}
 *               exchangeRate: {type: number, example: 6.96}
 *               date: {type: string, format: date}
 *     responses: {201: {description: Registrado}, 403: {description: Acceso denegado}}
 */
currencyRoutes.post('/',roleMiddleware(['admin']),a(async(req,res)=>{const {code,name,symbol='',exchangeRate,date}=req.body;if(!/^[A-Za-z]{3}$/.test(code||'')||!name||!/^\d{4}-\d{2}-\d{2}$/.test(date||'')||!Number.isFinite(Number(exchangeRate))||Number(exchangeRate)<=0)throw new AppError('Datos de moneda inválidos');const doc=await CurrencyModel.findOneAndUpdate({code:code.toUpperCase(),date},{$set:{name,symbol,exchangeRate:Number(exchangeRate)}},{new:true,upsert:true,runValidators:true});res.status(201).json(doc);}));
