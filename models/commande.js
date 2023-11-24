const mongoose = require('mongoose');

const Commande= mongoose.model('Commande' , {
    nom :{
        type : String
    },
    prenom:{
        type:String
    },
    idClient:{
        type:String
    },
    adress:{
        type:String
    },
    region:{
        type:String
    },
    ville:{
        type:String
    },
    telephone:{
        type:Number
    },
    codePostal:{
        type:Number
    },
    date:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports = Commande;