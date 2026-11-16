import 'dotenv/config';
import { connectDatabase } from './infrastructure/database/mongo.js';
import { app } from './app.js';
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || process.env.JWT_SECRET.length<32 || process.env.JWT_SECRET.startsWith('CAMBIA_')) {
  console.error('Configure MONGODB_URI y JWT_SECRET seguro en .env');process.exit(1);
}
try { await connectDatabase(process.env.MONGODB_URI); const port=Number(process.env.PORT)||3000;app.listen(port,()=>console.log(`Servidor iniciado: http://localhost:${port}/api/docs`)); }
catch(e){console.error('No se pudo iniciar:',e.message);process.exit(1);}
