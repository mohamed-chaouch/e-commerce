const mongoose = require('mongoose');

const Panier = mongoose.model('Panier',{
    idClient:{
        type:String
    },
    idProduit:{
        type:String
    },
    quantite:{
        type:Number
    }
})

module.exports = Panier;




