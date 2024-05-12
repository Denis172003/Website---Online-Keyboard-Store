const express = require("express");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const sass = require("sass");
const ejs=require('ejs');
Client = require('pg').Client;

var client= new Client({database:"cti_2024",
        user:"denis",
        password:"denis",
        host:"localhost",
        port:5432});
      
client.connect();

client.query("SELECT * FROM unnest enum_range(null::categ_prajitura)", function(err,rez){
  console.log(rez);

})



client.query("SELECT * FROM prajitura", function(err,rez){
  console.log(rez);
});



obGlobal = {
  obErori: null,
};

app = express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.set("view engine", "ejs");

vect_foldere = ["temp", "temp1", "backup"];
for (let folder of vect_foldere) {
  let calefolder = path.join(__dirname, folder);
  if (!fs.existsSync(calefolder)) {
    fs.mkdirSync(calefolder);
  }
}

app.use("/Resurse", express.static(__dirname + "/Resurse"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.use(function(req, res,next){
  client.query("select * from unnest(enum_range(null::categ_prajitura))", function(err, rezOptiuni){
  res.locals.optiuniMeniu=rezOptiuni.rows;
  next();
  });
});

initImagini();

app.get(["/", "/home", "/index"], function (req, res) {
  res.render("pagini/index", {
    ip: req.ip,
    imagini: obGlobal.obImagini ? obGlobal.obImagini.imagini : [], // Check if obGlobal.obImagini is null
  });
});

app.get("/despre", function (req, res) {
  res.render("pagini/despre", {
    ip: req.ip,
  });
});

app.get("/produse", function(req, res){
  console.log(req.query)
  var conditieQuery="";
  if (req.query.tip){
      conditieQuery=` where tip_produs='${req.query.tip}'`
  }
  client.query("select * from unnest(enum_range(null::categ_prajitura))", function(err, rezOptiuni){

      client.query(`select * from prajituri ${conditieQuery}`, function(err, rez){
          if (err){
              console.log(err);
              afisareEroare(res, 2);
          }
          else{
              res.render("pagini/produse", {produse: rez.rows, optiuni:rezOptiuni.rows})
          }
      })
  });
})

app.get("/produs/:id", function (req, res) {
  client.query(`select * from prajituri where id=${req.params.id}`, function (err, rez) {
    if (err) {
      console.log(err);
      afisareEroare(res, 2);
    } else {
      res.render("pagini/produse", { produse: rez.rows, optiuni: [] });
    }
  });
});
  

// trimiterea unui mesaj fix
app.get("/cerere", function (req, res) {
  res.send("<b>Hello</b> <span style='color:red'>world!</span>");
});

//trimiterea unui mesaj dinamic

app.get("/data", function (req, res, next) {
  res.write("Data: ");
  next();
});
app.get("/data", function (req, res) {
  res.write("" + new Date());
  res.end();
});

/*
trimiterea unui mesaj dinamic in functie de parametri (req.params; req.query)
ce face /* si ordinea app.get-urilor.
*/
app.get("/suma/:a/:b", function (req, res) {
  var suma = parseInt(req.params.a) + parseInt(req.params.b);
  res.send("" + suma);
});

app.get("/*.ejs", function (req, res) {
  afiuareEroare(res, 400);
});

app.get(new RegExp("^/Resurse/[A-Za-z0-9/]*/$/"), function (req, res) {
  afisareEroare(res, 403);
});

app.get("/favicon.ico", function (req, res) {
  res.sendFile(path.join(__dirname, "Resurse/favicon/favicon.ico"));
});

app.get("/*", function (req, res) {
  console.log(req.url);
  //res.send("whatever");
  try {
    res.render("pagini" + req.url, function (err, rezHtml) {
      // console.log(rezHtml);
      // console.log("Eroare:" + err);
      // res.send(rezHtml + "");
      if (err) {
        if (err.message.startsWith("Failed to lookup view")) {
          afisareEroare(res, 404);
          console.log("Nu a gasit pagina: ", req.url);
        }
      } else {
        res.send(rezHtml + "");
      }
    });
  } catch (err1) {
    if (err1) {
      if (err1.message.startsWith("Cannot find module")) {
        afisareEroare(res, 404);
        console.log("Nu a gasit resursa: ", req.url);
      }
    } else {
      afisareEroare(res);
    }
  }
});

obGlobal = {
  obErori: null,
  obImagini: null,
  folderScss: path.join(__dirname, "Resurse/scss"),
  folderCss: path.join(__dirname, "Resurse/css"),
  folderBackup: path.join(__dirname, "backup"),
};

function initErori() {
  var continut = fs
    .readFileSync(path.join(__dirname, "Resurse/json/erori.json"))
    .toString("utf-8");
  console.log(continut);

  obGlobal.obErori = JSON.parse(continut);
  for (let eroare of obGlobal.obErori.info_erori) {
    eroare.imagine = path.join(obGlobal.obErori.cale_baza, eroare.imagine);
  }
  obGlobal.obErori.eroare_default.imaigne = path.join(
    obGlobal.obErori.cale_baza,
    obGlobal.obErori.eroare_default.imagine
  );
  console.log(obGlobal.obErori);
}
initErori();

function initImagini() {
  try {
    var continut = fs.readFileSync(__dirname + "/Resurse/json/galerie.json", "utf-8");
    obGlobal.obImagini = JSON.parse(continut);

    let vImagini = obGlobal.obImagini.imagini;

    let caleAbs = path.join(__dirname, obGlobal.obImagini.cale_galerie);
    let caleAbsMediu = path.join(__dirname, obGlobal.obImagini.cale_galerie, "mediu");
    if (!fs.existsSync(caleAbsMediu)) fs.mkdirSync(caleAbsMediu);

    for (let imag of vImagini) {
      [numeFis, ext] = imag.fisier.split(".");
      let caleFisAbs = path.join(caleAbs, imag.fisier);
      let caleFisMediuAbs = path.join(caleAbsMediu, numeFis + ".webp");
      sharp(caleFisAbs).resize(300).toFile(caleFisMediuAbs);
      imag.fisier_mediu = path.join("/", obGlobal.obImagini.cale_galerie, "mediu", numeFis + ".webp");
      imag.fisier = path.join("/", obGlobal.obImagini.cale_galerie, imag.fisier);
    }
  } catch (error) {
    console.error("Error while parsing galerie.json:", error);
    // Handle the error appropriately, e.g., log it or throw it further.
  }
}
initImagini();


function afisareEroare(res, _identificator, _titlu, _text, _imagine) {
  let eroare = obGlobal.obErori.info_erori.find(function (elem) {
    return elem.identificator == _identificator;
  });

  if (!eroare) {
    let eroare_default = obGlobal.obErori.eroare_default;
    res.render("pagini/eroare", {
      titlu: _titlu || eroare_default.titlu,
      text: _text || eroare_default.text,
      imagine: _imagine || eroare_default.imagine,
    });
  } else {
    if (eroare.status) {
      res.status(eroare.identificator);
      res.render("pagini/eroare", {
        titlu: _titlu || eroare.titlu,
        text: _text || eroare.text,
        imagine: _imagine || eroare.imagine,
      });
    }
  }
}

function compileazaScss(caleScss, caleCss) {
  console.log("cale:", caleCss);
  if (!caleCss) {
    let numeFisExt = path.basename(caleScss);
    let numeFis = numeFisExt.split(".")[0]; /// "a.scss"  -> ["a","scss"]
    caleCss = numeFis + ".css";
  }

  if (!path.isAbsolute(caleScss))
    caleScss = path.join(obGlobal.folderScss, caleScss);
  if (!path.isAbsolute(caleCss))
    caleCss = path.join(obGlobal.folderCss, caleCss);

  let caleBackup = path.join(obGlobal.folderBackup, "Resurse/css");
  if (!fs.existsSync(caleBackup)) {
    fs.mkdirSync(caleBackup, { recursive: true });
  }

  // la acest punct avem cai absolute in caleScss si  caleCss
  //TO DO
  let numeFisCss = path.basename(caleCss);
  if (fs.existsSync(caleCss)) {
    fs.copyFileSync(
      caleCss,
      path.join(obGlobal.folderBackup, "Resurse/css", numeFisCss)
    ); // +(new Date()).getTime()
  }
  rez = sass.compile(caleScss, { sourceMap: true });
  fs.writeFileSync(caleCss, rez.css);
  //console.log("Compilare SCSS",rez);
}
//compileazaScss("a.scss");
vFisiere = fs.readdirSync(obGlobal.folderScss);
for (let numeFis of vFisiere) {
  if (path.extname(numeFis) == ".scss") {
    compileazaScss(numeFis);
  }
}

fs.watch(obGlobal.folderScss, function (eveniment, numeFis) {
  console.log(eveniment, numeFis);
  if (eveniment == "change" || eveniment == "rename") {
    let caleCompleta = path.join(obGlobal.folderScss, numeFis);
    if (fs.existsSync(caleCompleta)) {
      compileazaScss(caleCompleta);
    }
  }
});

app.listen(8080);
console.log("Serverul a pornit");