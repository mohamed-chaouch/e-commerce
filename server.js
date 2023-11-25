const express = require('express');

const clientRoute = require('./routes/client');

const adminRoute = require('./routes/administrateur');

const commandeRoute = require('./routes/commande');

const productRoute = require('./routes/product');

const favorieRoute = require('./routes/favorie');

const panierRoute = require('./routes/panier');

require('./config/connect');

const app = express();

const cors = require('cors');

app.use( cors() );

app.use( express.json() );

app.use( '/client' , clientRoute );

app.use( '/admin' , adminRoute );

app.use( '/commande' , commandeRoute);

app.use( '/product' , productRoute);

app.use( '/favorie' , favorieRoute );

app.use( '/panier' , panierRoute);

app.use( '/getimage' , express.static('./uploads') );

app.use(express.static('./angular'));

const PORT = process.env.PORT || 3000;
app.listen( PORT , ()=>{
    console.log("Server Work !!");
} )