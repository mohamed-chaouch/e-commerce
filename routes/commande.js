const express = require('express');

const Commande = require('../models/commande');

const router = express.Router();

const bcrypt = require('bcrypt');

// crud de la table client 

router.post('/add' , async (req ,res)=>{
    data = req.body;
    cmd = new Commande(data);
    cmd.date = new Date();

    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password , salt);
    cmd.password = cryptedPass;
    
    cmd.save()
        .then(
            (newCommande)=>{
                res.status(200).send(newCommande);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
});

router.get('/getall' , async (req , res)=>{
    try{
        commandes = await Commande.find();
        res.status(200).send(commandes);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get( '/getbyid/:id' , (req ,res)=>{
    myid = req.params.id;
    Commande.findById({ _id : myid })
        .then(
            (commande)=>{
                res.status(200).send(commande);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )

router.delete( '/delete/:id' , (req, res)=>{
    myid = req.params.id;
    Commande.findOneAndDelete({ _id : myid })
        .then(
            (deletedCommande)=>{
                res.status(200).send(deletedCommande);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})


module.exports = router;