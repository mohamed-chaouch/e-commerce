const express = require('express');

const Favorie = require('../models/favorie');

const router = express.Router();

router.post('/add' , (req , res)=>{
    data = req.body;
    fav = new Favorie(data);
    fav.save()
        .then(
            (addFavorie)=>{
                res.status(200).send(addFavorie);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.get( '/getall' , (req,res)=>{
    Favorie.find()
        .then(
            (allFavorie)=>{
                res.status(200).send(allFavorie);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.get( '/getbyIdClient/:id' , (req, res)=>{
    myid = req.params.id;
    Favorie.find({ idClient : myid})
        .then(
            (favorieClient)=>{
                res.status(200).send(favorieClient);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.get( '/getbyIdClientLesIdProduit/:id' , (req, res)=>{
    myid = req.params.id;
    Favorie.find({ idClient : myid})
        .then(
            (favorieClient)=>{
                const idProduits = favorieClient.map(item => item.idProduit);
                res.status(200).send(idProduits);                
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})


router.delete( '/delete/:idClient/:idProduit' , (req , res)=>{
    idc = req.params.idClient;
    idp = req.params.idProduit;
    Favorie.findOneAndDelete({ idClient : idc , idProduit : idp })
        .then(
            (prodFavDel)=>{
                res.status(200).send(prodFavDel);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )



module.exports = router;