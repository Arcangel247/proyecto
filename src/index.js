import 'dotenv/config';
import mongoose from 'mongoose';
import { sequelize } from './infrastructure/database/mysql/connection.js';
import './infrastructure/database/mysql/models.js';
import './infrastructure/database/mongo/models.js';
import { app } from './app.js';
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32||!process.env.MONGO_URI){console.error('Configurar JWT_SECRET y MONGO_URI en .env');process.exit(1);}
try {await mongoose.connect(process.env.MONGO_URI);await sequelize.authenticate();await sequelize.sync({alter:true});const port=Number(process.env.PORT)||3000;app.listen(port,()=>console.log(`Servidor iniciado en http://localhost:${port}/api-docs`));} catch(err){console.error('Error al iniciar:',err.message);process.exit(1);}
