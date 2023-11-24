const mongoose = require('mongoose');

const Admin = mongoose.model('Admin' , {
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

module.exports = Admin;