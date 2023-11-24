const express = require('express');

const Product = require('../models/product');

const router = express.Router();

const multer = require('multer');

filename = '';

const mystorage = multer.diskStorage({
    destination : './uploads',
    filename : (req , file , redirect)=>{
        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect( null , fl );
        filename = fl;
    }
});

const upload = multer({ storage : mystorage });

// crud de la table product 

router.post('/add' , upload.any('image') , (req ,res)=>{
    data = req.body;
    prod = new Product(data);
    prod.image = filename;
    prod.tailles = data.tailles.split(',');
    prod.pointures = data.pointures.split(',');
    
    prod.save()
        .then(
            (newProduct)=>{
                filename='';
                res.status(200).send(newProduct);
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
        products = await Product.find();
        res.status(200).send(products);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get( '/getbyid/:id' , (req ,res)=>{
    myid = req.params.id;
    Product.findById({ _id : myid })
        .then(
            (product)=>{
                res.status(200).send(product);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )

router.get( '/getbycategorie/:categorie' , (req ,res)=>{
    mycategorie = req.params.categorie;
    Product.find({ categorie : mycategorie })
        .then(
            (productsCategorie)=>{
                res.status(200).send(productsCategorie);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )

router.get( '/bycategorieoption/:categorieopt' , (req ,res)=>{
    mycategorie = req.params.categorieopt;
    Product.find({ categorie :  {$regex: `^${mycategorie}`, $options: 'i'} })
        .then(
            (productsCategorie)=>{
                res.status(200).send(productsCategorie);
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
    Product.findOneAndDelete({ _id : myid })
        .then(
            (deletedProduct)=>{
                res.status(200).send(deletedProduct);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.put( '/update/:id' , upload.any('image') , (req ,res)=>{
    newData = req.body;
    myid = req.params.id;
    if(filename.length > 0){
        newData.image = filename;
    }
    newData.tailles = newData.tailles.split(',');
    newData.pointures = newData.pointures.split(',');

    Product.findByIdAndUpdate({ _id : myid } , newData)
        .then(
            (updatedProduct)=>{
                filename = '';
                res.status(200).send(updatedProduct);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )


module.exports = router;