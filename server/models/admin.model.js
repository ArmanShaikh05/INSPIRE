import mongoose from "mongoose";
import { Schema } from "mongoose";

const adminSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        default:'Admin'
    }
})

export const Admin=mongoose.model('Admin',adminSchema)