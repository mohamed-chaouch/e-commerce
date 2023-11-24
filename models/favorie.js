const mongoose = require('mongoose');

const Favorie = mongoose.model('Favorie' , {
    idProduit : {
        type : String
    },
    idClient : {
        type : String
    }
})

module.exports = Favorie;