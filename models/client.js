const mongoose = require('mongoose');

const Client = mongoose.model('Client' , {
    nom :{
        type : String
    },
    prenom:{
        type:String
    },
    email:{
        type:String,
        unique : true
    },
    password:{
        type:String
    },
    image:{
        type:String
    },
})

module.exports = Client;