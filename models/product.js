const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
    title:{
        type:String
    },
    categorie:{
        type:String
    },
    image:{
        type:String
    },
    prix:{
        type:String
    },
    disponibilite:{
        type:String
    },
    etat:{
        type:String
    },
    nbPieceExistante:{
        type:Number
    },
    tailles:{
        type:Array
    },
    marque:{
        type : String
    },
    pointures:{
        type:Array
    },
    couleur:{
        type:String
    }
})


module.exports = Product;