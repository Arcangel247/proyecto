import jwt from 'jsonwebtoken';
export const signToken = user => jwt.sign({id:String(user.id || user._id),role:user.role,email:user.email},process.env.JWT_SECRET,{expiresIn:'2h'});
export const verifyToken = token => jwt.verify(token,process.env.JWT_SECRET);
