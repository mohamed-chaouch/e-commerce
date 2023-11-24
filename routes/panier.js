const express = require('express');

const Panier = require('../models/panier');

const router = express.Router();

router.post( '/ajouterAuPanier' , (req ,res)=>{
    data = req.body;
    pan = new Panier(data);

    pan.save()
        .then(
            (addAupanier)=>{
                res.status(200).send(addAupanier);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
    

} )

router.get('/getall' , async (req , res)=>{
    try{
        TousLesProdDansLePanier = await Panier.find();
        res.status(200).send(TousLesProdDansLePanier);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get( '/getbyidClientLesIdProduits/:id' , (req ,res)=>{
    myid = req.params.id;
    Panier.find({ idClient : myid })
        .then(
            (panierClient)=>{
                const idProduits = panierClient.map(item => item.idProduit);
                res.status(200).send(idProduits);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )


router.get( '/getLaQuantite/:idprod/:idclient' , (req ,res)=>{
    myidprod = req.params.idprod;
    myidclient = req.params.idclient;

    Panier.findOne({ idProduit : myidprod , idClient : myidclient})
        .then(
            (prodPanier)=>{
                const quantite = prodPanier ? prodPanier.quantite : 0;
                res.status(200).send(quantite.toString());
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )

router.put('/updateQuantite/:idprod/:idclient', (req, res) => {
    const myidprod = req.params.idprod;
    const myidclient = req.params.idclient;
    const newQuantite = req.body.quantite;

    Panier.findOneAndUpdate({ idProduit: myidprod, idClient: myidclient }, { quantite: newQuantite }, { new: true })
        .then(
            (updatedPanier) => {
                res.status(200).send(updatedPanier.quantite.toString());
        })
        .catch(
            (err) => {
                res.status(400).send(err);
        });
});

router.delete( '/deleteProdDansPanier/:idclient/:idproduit' , (req ,res)=>{
    myidclient = req.params.idclient;
    myidproduit = req.params.idproduit;

    Panier.findOneAndDelete({ idClient : myidclient , idProduit : myidproduit })
        .then(
            (deleteFromPanier)=>{
                res.status(200).send(deleteFromPanier);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.delete( '/deleteAllProdByIdClient/:id' , (req, res)=>{
    myid = req.params.id;
    Panier.deleteMany({ idClient : myid })
        .then(
            (deletedPanier)=>{
                res.status(200).send(deletedPanier);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

module.exports = router;