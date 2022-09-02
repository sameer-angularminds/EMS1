const express = require('express');
const cors= require('cors');
const app=express();
const mongoose=require('./db.js');
const routes = require('./routes.js');
app.use(express.json());

app.use(cors({origin:'*'}));
const port=3000;
app.listen(3000,()=>{
    console.log('listening on port '+port);
})

app.use('/employees',routes);