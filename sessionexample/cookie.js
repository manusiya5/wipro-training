var express = require("express")
var cookieParser = require('cookie-parser')
var session = require('express-session')
var app = express();
app.use(cookieParser()); 
app.get("/",(req,res)=>{
res.cookie('mycookie','Anu').send("cookie set");
console.log("cookies on server:" ,req.cookies);
res.send(`cookie value is : ${req.cookies.mycookie}`);
});
app.get("/getcookie",(req,res)=>{
console.log("cookies on server:" ,req.cookies);
res.send(`cookie value is : ${req.cookies.mycookie}`);
});


app.listen(3000);
console.log("server  started")