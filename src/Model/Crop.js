const mongoose =  require("mongoose")

const cropSchema = new mongoose.Schema({
    CropCycleProperty:{
        type:String,
        require:true
    },
    CropCycleField:{
        type:String,
        require:true
    },
    Crop:{
        type:String,
        require:true
    },
    organizationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"
    }
},{timestamps:true})

module.exports= mongoose.model('Crop',cropSchema)