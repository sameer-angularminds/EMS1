const mongoose=require('mongoose');
const Employee=mongoose.model('Employee',{
   
    
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    freshness:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        comment:{
                type:String,
                required:true
            }
})

module.exports =Employee;