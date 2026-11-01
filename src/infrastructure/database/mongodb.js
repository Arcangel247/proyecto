import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI no configurada. El servidor iniciara sin base de datos.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('Conexion con MongoDB establecida');
  } catch (error) {
    console.error('No se pudo conectar con MongoDB:', error.message);
  }
};
