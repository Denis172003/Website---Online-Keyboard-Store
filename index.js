const express = require("express");
const fs= require('fs');
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');


app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine","ejs");

app.get(["/","/index","/home"], function(req, res) {
    res.render("Pagini/index.ejs");
});    

app.use("/resurse", express.static(__dirname+"/resurse"));

app.get("/cerere", function(req, res) {
    res.send("<b>Cerere primita</b> <span style='color:red;'>world!</span>");
});

app.get("/data", function(req,res,next){
    res.write("Data: ");
    next();
})

app.get("/data", function(req,res){
    res.write(""+new Date());
    res.end();
})
    

app.get("/suma/:a/:b", function(req,res){
    var suma=parseInt(req.params.a)+parseInt(req.params.b)
    res.send(""+suma);
})



app.get("/*",function(req,res) {

    res.render("pagini"+req.url, function(err, rezHTML){
        console.log("Pagina", rezHTML)
        console.log("Eroare", err)
        res.send(rezHTML);
    });

 })






app.listen(8080);
console.log("Serverul a pornit");