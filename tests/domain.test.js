import test from 'node:test';import assert from 'node:assert/strict';
import { Wallet } from '../src/domain/entities/wallet.entity.js';
import { Transaction } from '../src/domain/entities/transaction.entity.js';
import { roleMiddleware } from '../src/presentation/middlewares/role.middleware.js';
test('Wallet valida nombre y propietario',()=>{assert.equal(new Wallet({name:' Banco ',userId:'u1'}).name,'Banco');assert.throws(()=>new Wallet({name:' ',userId:'u1'}));});
test('Transaction permite walletId ausente',()=>{const t=new Transaction({type:'INCOME',amount:10,categoryId:1,userId:'u1'});assert.equal(t.walletId,null);assert.equal(t.isPrivate,false);});
test('Transaction admite billetera y privacidad',()=>{const t=new Transaction({type:'EXPENSE',amount:5,categoryId:1,walletId:2,isPrivate:true,userId:'u1'});assert.equal(t.walletId,2);assert.equal(t.isPrivate,true);});
test('roleMiddleware responde 403 a usuarios sin rol admin',()=>{let status,body;roleMiddleware(['admin'])({user:{role:'user'}},{status(code){status=code;return this},json(x){body=x}},()=>assert.fail());assert.equal(status,403);assert.match(body.error,/Forbidden/);});
test('roleMiddleware permite admin',()=>{let next=false;roleMiddleware(['admin'])({user:{role:'admin'}},{},()=>{next=true});assert.equal(next,true);});
