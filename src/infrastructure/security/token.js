import jwt from 'jsonwebtoken';
export function signToken(user) { return jwt.sign({sub:String(user._id),role:user.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'2h'}); }
export function verifyToken(token) { return jwt.verify(token,process.env.JWT_SECRET); }
