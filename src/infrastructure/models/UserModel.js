import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true }, passwordHash: { type: String, required: true }, role: { type: String, enum: ['admin','vendedor'], default: 'vendedor' } }, { timestamps:true });
export const UserModel = mongoose.model('User', schema);
