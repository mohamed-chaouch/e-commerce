const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://e-commerce:e-commerce@cluster0.oaggve9.mongodb.net/e-commerce?retryWrites=true&w=majority")
    .then(
        res=>{
            console.log('connected successfully');
        }
    )
    .catch(
        err=>{
            console.log(err);
        }
    )


module.exports = mongoose;
