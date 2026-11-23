// Ejercicio 1
import { Router } from 'express';
import { WalletService } from '../../application/use-cases/WalletService.js';
import { WalletRepository } from '../../infrastructure/repositories/WalletRepository.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler as a } from '../middlewares/errors.js';
const service=new WalletService(new WalletRepository());
export const walletRoutes=Router();walletRoutes.use(authMiddleware);
/** @swagger
 * /wallets:
 *   get:
 *     tags: [Wallets]
 *     summary: Listar billeteras propias
 *     security: [{bearerAuth: []}]
 *     responses: {200: {description: Listado}}
 *   post:
 *     tags: [Wallets]
 *     summary: Crear billetera
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: {type: string, example: Efectivo}
 *               type: {type: string, enum: [CASH, BANK, DEBIT_CARD, OTHER]}
 *     responses: {201: {description: Creada}}
 */
walletRoutes.get('/',a(async(req,res)=>res.json(await service.list(req.user.id))));
walletRoutes.post('/',a(async(req,res)=>res.status(201).json(await service.create(req.body,req.user.id))));
/** @swagger
 * /wallets/{id}:
 *   delete:
 *     tags: [Wallets]
 *     summary: Eliminar billetera propia
 *     security: [{bearerAuth: []}]
 *     parameters: [{in: path, name: id, required: true, schema: {type: integer}}]
 *     responses: {200: {description: Eliminada}, 409: {description: Tiene transacciones}}
 */
walletRoutes.delete('/:id',a(async(req,res)=>res.json(await service.remove(req.params.id,req.user.id))));
