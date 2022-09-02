const express=require('express');

const router=express.Router();

const objectId=require('mongoose').Types.ObjectId;
const  Employee=require('./employee.js');

// get single employee 
router.get('/:id',async(req,res)=>{
if(await objectId.isValid(req.params.id)){
    Employee.findById(req.params.id,(err,doc)=>{
        if(err){
            console.log('Error in Get Emp by Id'+ err);
        }
        else{
            res.send(doc);  
        }
    })
}
else{
    return res.status(400).send(`No record found for ${req.params.id} ID`);
}
})

//delete single employee 
router.delete('/:id',async(req,res)=>{
    if(await objectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(err){
                console.log('Error in Delete Emp by Id'+ err);
            }
            else{
                res.send(doc);  
            }
        })
    }
    else{
        return res.status(400).send(`No record found for ${req.params.id} ID`);
    }
    })

//delete single employee 
router.put('/:id',async(req,res)=>{
    if(await objectId.isValid(req.params.id)){
         let emp={
            productName:req.body.productName,
        date:req.body.date,
        comment:req.body.comment,
        price:req.body.price,
        freshness:req.body.freshness,
        category:req.body.category
         }
        Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
            if(err){
                console.log('Error in Update Emp by Id'+ err);
            }
            else{
                res.send(doc);  
            }
        })
    }
    else{
        return res.status(400).send(`No record found for ${req.params.id} ID`);
    }
    }) 

//post api 
router.post('/',(req,res)=>{
    let emp= new Employee({
        productName:req.body.productName,
        date:req.body.date,
        comment:req.body.comment,
        price:req.body.price,
        freshness:req.body.freshness,
        category:req.body.category
    });
  emp.save((err,doc)=>{
    if(err){
        console.log("Error in Post API: " + err);
    }
    else{
        res.send(doc);
    }
  });
})

//get api
router.get('/',(req,res)=>{
    Employee.find((err,doc)=>{
        if(err){
            console.log('Error in Get API'+ err);
        }
        else{
            res.send(doc);  
        }
    })
})


module.exports = router;