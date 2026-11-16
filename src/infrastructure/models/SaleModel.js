import mongoose from 'mongoose';
const item = new mongoose.Schema({productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},name:String,quantity:Number,unitPrice:Number,subtotal:Number},{_id:false});
const schema = new mongoose.Schema({items:[item],total:{type:Number,required:true},soldBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}},{timestamps:true});
export const SaleModel = mongoose.model('Sale',schema);
