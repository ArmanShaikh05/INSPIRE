import { University } from "../models/university.model.js"

export const getAllUniversity=async(req,res)=>{
    const response=await University.find()
    const universitys=response.map(el=>{return{universityName:el.username,id:el._id}})
    res.json({
        universitys
    })
}