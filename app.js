
const express=require("express");
const app=express();
const requests=require("requests");
const path=require("path");
app.set("view engine","hbs");
const {chatHandler,chat_names} = require('./chathandler');
require("./script");

const static_path=(path.join(__dirname,"./public"));
//console.log(path.join(__dirname,"./public"));
app.use(express.static(static_path));
// app.get("/",(req,res)=>
// {
//     res.sendFile(static_path+"./index.html");
// });

app.listen(5000,()=>
{
    console.log("hey this is harsh");
})