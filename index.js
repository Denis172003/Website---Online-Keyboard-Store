const express = require("express");
const fs= require('fs');
const path = require("path");
// const path=require('path');
// const sharp=require('sharp');
// const sass=require('sass');
// const ejs=require('ejs');

obGlobal = {
    titlu: "Pagina mea",
    versiune: "0.0.1",
    numeFisier: "index.js"
}

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


function initErori() {
    var continut = fs.readFileSync(path.join(__dirname,"resurse/json/eroare.json")).toString("utf-8");
    console.log(continut);
    obGlobal.obErori = JSON.parse(continut);
    for(let eroare of obGlobal.obErori.info.erori) {
        eroare.imagine=path.join(obGlobal.obErori.cale_baza,eroare.imagine);
    }
    console.log(cobGlobal);
}   

function afisEroare(res, _idendificator,titlu,text,imagine) {
    let eroare = obGlobal.obErori.info_erori.find(function(elem){
        return elem.identificator==_identificator;
    });}


app.listen(8080);
console.log("Serverul a pornit");