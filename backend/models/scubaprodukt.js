const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Produkt  = new Schema({

ProduktNavn: {
    type: String,
    default: "Ukendt"
},
ProduktBeskrivelse: {
    type: String,
    default: "Ukendt"
},
Pris: {
    type: Number,
    default: "Ukendt"
},
ProduktFoto: {
    type: Boolean,
    default: "Ukendt"
}

});

module.exports = mongoose.model('Produkt', Produkt, 'Produktet');