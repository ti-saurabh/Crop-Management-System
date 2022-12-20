const mongoose = require("mongoose")
const organisationSchema = new mongoose.Schema({
       organisation :{
        type:String,
        require:true
       },
       property:{
        type:String,
        require:true
       },
       region:{
        type:String,
        require:true
       },
       field:{
        type:String
       },
       password:{
        type:String,
        require:true
       }
       
},{timestamps:true})



module.exports = mongoose.model('Organisation',organisationSchema)