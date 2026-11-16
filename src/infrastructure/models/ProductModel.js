import mongoose from 'mongoose';
const schema = new mongoose.Schema({name:{type:String,required:true},sku:{type:String,unique:true,sparse:true},description:String,price:{type:Number,required:true,min:0},stock:{type:Number,required:true,min:0}}, {timestamps:true});
export const ProductModel = mongoose.model('Product',schema);
