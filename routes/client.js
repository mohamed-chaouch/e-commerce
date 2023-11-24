const express = require('express');

const Client = require('../models/client');

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

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// crud de la table client 

router.post('/register' , upload.any('image') ,async  (req ,res)=>{
    data = req.body;
    cl = new Client(data);
    cl.image = filename;

    sal = bcrypt.genSaltSync(10);
    passCrypt = await bcrypt.hashSync( data.password , sal );
    cl.password = passCrypt;
    
    cl.save()
        .then(
            (newClient)=>{
                filename='';
                res.status(200).send(newClient);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
});

router.post( '/login' , async (req , res)=>{
    data = req.body;
    client = await Client.findOne({ email : data.email });
    if(client){
        validPass = bcrypt.compareSync(data.password , client.password);
        if(validPass){
            payload={
                _id : client._id,
                nom : client.nom,
                prenom : client.prenom,
                email : client.email
            }
            token = jwt.sign( payload , '1234567' )
            res.status(200).send({ mytoken : token });
        }else{
            res.status(400).send(' email or password invalid !! ');
        }
    }else{
        res.status(400).send(' email or password invalid !! ');
    }
} )

router.get('/getall' , async (req , res)=>{
    try{
        clients = await Client.find();
        res.status(200).send(clients);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get('/getallidClients' , (req , res)=>{
    Client.find()
        .then(
            (allidClients)=>{
                const idclients = allidClients.map(item => item._id);
                res.status(200).send(idclients);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.get( '/getbyid/:id' , (req ,res)=>{
    myid = req.params.id;
    Client.findById({ _id : myid })
        .then(
            (client)=>{
                res.status(200).send(client);
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
    Client.findOneAndDelete({ _id : myid })
        .then(
            (deletedClient)=>{
                res.status(200).send(deletedClient);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})

router.put( '/update/:id' , upload.any('image') , async (req ,res)=>{
    newData = req.body;
    myid = req.params.id;
    if(filename.length > 0){
        newData.image = filename;
    }

    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(newData.password , salt);
    newData.password = cryptedPass;

    Client.findByIdAndUpdate({ _id : myid } , newData)
        .then(
            (updatedClient)=>{
                filename = '';
                res.status(200).send(updatedClient);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )

module.exports = router;