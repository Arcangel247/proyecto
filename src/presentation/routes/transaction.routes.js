import { Router } from 'express';
import { TransactionService } from '../../application/use-cases/TransactionService.js';
import { WalletRepository } from '../../infrastructure/repositories/WalletRepository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
const service=new TransactionService(new WalletRepository());
export const transactionRoutes=Router();
/** @swagger
 * /transactions/{id}/public:
 *   get:
 *     tags: [Transactions]
 *     summary: Comprobante público de una transacción
 *     security: []
 *     parameters: [{in: path, name: id, required: true, schema: {type: integer}}]
 *     responses: {200: {description: Comprobante}, 403: {description: Transacción privada}, 404: {description: No encontrada}}
 */
// Ejercicio 3
transactionRoutes.get('/:id/public',a(async(req,res)=>res.json(await service.receipt(req.params.id))));
transactionRoutes.use(authMiddleware);
/** @swagger
 * /transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: Listar movimientos propios
 *     security: [{bearerAuth: []}]
 *     responses: {200: {description: Listado}}
 *   post:
 *     tags: [Transactions]
 *     summary: Registrar movimiento
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [type, amount, categoryId]
 *             properties:
 *               type: {type: string, enum: [INCOME, EXPENSE]}
 *               amount: {type: number, example: 100}
 *               categoryId: {type: integer, example: 1}
 *               walletId: {type: integer, nullable: true}
 *               isPrivate: {type: boolean, example: false}
 *               currency: {type: string, example: BOB}
 *               description: {type: string}
 *               date: {type: string, format: date}
 *     responses: {201: {description: Registrada}}
 */
transactionRoutes.get('/',a(async(req,res)=>res.json(await service.list(req.user.id))));
transactionRoutes.post('/',a(async(req,res)=>res.status(201).json(await service.create(req.body,req.user.id))));
transactionRoutes.put('/:id',a(async(req,res)=>res.json(await service.update(req.params.id,req.body,req.user.id))));
transactionRoutes.delete('/:id',a(async(req,res)=>res.json(await service.remove(req.params.id,req.user.id))));
