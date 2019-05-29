const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const myRoutes = express.Router();
const PORT = 4010;
const multer = require('multer');

// Express Sever Opsætning med mere.
app.use(cors());
app.use(bodyParser.json());
app.use('', myRoutes);
app.listen(PORT, function () {
    console.log("SERVER ER I FIN FORM :), OG LYTTER HERMED PÅ PORT:", PORT)
});

// Kontakt til MongoDB.
mongoose.connect('mongodb://127.0.0.1:27017/demo-backend', {
    useNewUrlParser: true
});

// Engangs-test om svar på database.
const connection = mongoose.connection;
connection.once('open', function () {
    console.log('MongoDB database svare!!');
});

// API Metoder
let minProdukt = require('./models/scubaprodukt');

// Henter alle produkter
myRoutes.route('/henter-alle').get(function (req, res) {
    minProdukt.find(function (err, alleProdukter) {
        if (err) {
            console.log("FEJL!!:", err);
        } else {
            res.json(alleProdukter);
        }
    });
});

//Opret et produkt
myRoutes.route('/opret-produkt').post(function (req, res) {
    let nytProduktFraBrugerne = new minProdukt(req.body);
    nytProduktFraBrugerne.save().then(n => {
        res.status(200).json('OK - der er oprettet et nyt produkt')
    }).catch(err => {
        res.status(400).send('nyt produkt mangler!!')
    })
});

myRoutes.route('/opdater-produkt/:id').put(function (err, produktFundet) {
    // intet produkt er fundet
    if (!produktFundet) {
        res.status(400).send("Produktet har gemt sig");
    } else if (err) {
        res.json("Fejl!!, err");
        console.log(err);
    } else {
        // produkt er fundet
        produktFundet.ProduktNavn = req.body.produktNavn,
        produktFundet.ProduktBeskrivelse = req.body.produktBeskrivelse,
        produktFundet.Pris = req.body.pris,
        produktFundet.ProduktFoto = req.body.produktFoto


        produktFundet.save().then(d => {
            res.json("Produktet er opdateret");
        }).catch(err => {
            res.status(400).send("Produktet er uden rækkevidde er derfor ikke opdateret")
        });
    }
});
// Slet produkt
myRoutes.route('/slet-produkt/:id').delete(function(req, res){
    mitProdukt.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            res.json("Der er sket en fejl!: " + err);
            console.log(err);
        } else if (result.deletedCount <= 0 ){
            res.json("Ups der blev ikke slettet noget - måske forkert id?");
            console.log(err);
        } else {
            res.json("Antal slettede produkter: " + result.deletedCount);
            console.log(err);
        }
    }).catch(function(){
        console.log("Noget gik galt - måske forbindelsen til databasen?")
    })
})

app.get('/Hello-World', function (req, res){
    res.json("Hej fra API- der er nu hul igennem og datoen er : " + Date());
});

// POST UPLOAD: fil/image.

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images');//Hvor filen skal gemmes.
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)//Date.now giver en dato af uploade sammen med fil navnet.
    }
});

var upload = multer({ storage: storage }).single('file');//single er 1, array er flere end 1. Hvor mange filer der må upload af gangen.

//POST image til serveren (public/images).
app.post('/upload-img', function(req, res){
    upload(req, res, function(err){
        //Hvis der opstod en fejl ved upload.
        if (err){
            return res.status(500).json(err);
        }
        //Hvis alt gik godt.
        console.log("OK ", req.file);
        return res.status(200).send(req.file);
    });
});//req er det man får fra brugeren og res er det man giver til brugeren.