import bcrypt from 'bcryptjs';
import { UserModel } from '../../infrastructure/models/UserModel.js';
import { AppError } from '../../domain/errors/AppError.js';
import { signToken } from '../../infrastructure/security/token.js';
export class AuthUseCases {
  async register({name,email,password}) {
    if(!name?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email||'') || typeof password!=='string' || password.length<8) throw new AppError('Nombre, correo válido y contraseña de mínimo 8 caracteres son obligatorios');
    email=email.toLowerCase().trim();
    if(await UserModel.exists({email})) throw new AppError('El correo ya está registrado',409);
    const first=await UserModel.countDocuments()===0;
    // Primer usuario es admin para configurar el sistema; después solo vendedores.
    const user=await UserModel.create({name:name.trim(),email,passwordHash:await bcrypt.hash(password,12),role:first?'admin':'vendedor'});
    return {user:{id:user.id,name:user.name,email:user.email,role:user.role},token:signToken(user)};
  }
  async login({email,password}) {
    const user=await UserModel.findOne({email:String(email||'').toLowerCase().trim()});
    if(!user || !await bcrypt.compare(String(password||''),user.passwordHash)) throw new AppError('Credenciales incorrectas',401);
    return {user:{id:user.id,name:user.name,email:user.email,role:user.role},token:signToken(user)};
  }
}
