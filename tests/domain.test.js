import test from 'node:test';
import assert from 'node:assert/strict';
import { validateProduct } from '../src/domain/entities/Product.js';
import { validateSale } from '../src/domain/entities/Sale.js';
test('Producto válido',()=>assert.equal(validateProduct({name:'Cepillo',price:30,stock:2}).name,'Cepillo'));
test('Producto con stock negativo rechazado',()=>assert.throws(()=>validateProduct({name:'A',price:3,stock:-1})));
test('Venta válida',()=>assert.equal(validateSale({items:[{productId:'507f1f77bcf86cd799439011',quantity:2}]}).length,1));
test('Venta duplicada rechazada',()=>assert.throws(()=>validateSale({items:[{productId:'x',quantity:1},{productId:'x',quantity:1}]})));
