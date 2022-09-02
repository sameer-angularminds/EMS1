const mongoose= require('mongoose');
const url='mongodb+srv://sameer:sameer@cluster0.tcqhfv9.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url,err=>{
    if(!err){
        console.log('DB connected successfully!!!');
    }
        else{
            console.log('Error connecting to DB');
        }
})
module.exports=mongoose;