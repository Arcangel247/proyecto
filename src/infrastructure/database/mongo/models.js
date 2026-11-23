import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},password:{type:String,required:true},role:{type:String,enum:['user','admin'],default:'user'},baseCurrency:{type:String,default:'BOB'}},{timestamps:true});
export const UserModel=mongoose.model('User',userSchema);
const currencySchema=new mongoose.Schema({code:{type:String,required:true,uppercase:true},name:{type:String,required:true},symbol:{type:String,default:''},exchangeRate:{type:Number,required:true,min:0},date:{type:String,required:true}},{timestamps:true});
currencySchema.index({code:1,date:1},{unique:true});
export const CurrencyModel=mongoose.model('Currency',currencySchema);
