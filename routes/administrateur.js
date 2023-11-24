const express = require('express');

const Admin = require('../models/administrateur');

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

// crud de la table Admin 
router.post('/register' , upload.any('image') ,async  (req ,res)=>{
    data = req.body;
    ad = new Admin(data);
    ad.image = filename;
    

    sal = bcrypt.genSaltSync(10);
    passCrypt = await bcrypt.hashSync( data.password , sal );
    ad.password = passCrypt;
    
    ad.save()
        .then(
            (newAdmin)=>{
                filename='';
                res.status(200).send(newAdmin);
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
    admin = await Admin.findOne({ email : data.email });
    if(admin){
        validPass = bcrypt.compareSync(data.password , admin.password);
        if(validPass){
            payload={
                _id : admin._id,
                nom : admin.nom,
                prenom : admin.prenom,
                email : admin.email
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
        admins = await Admin.find();
        res.status(200).send(admins);
    }catch(error){
        res.status(400).send(error);
    }
})

router.get( '/getbyid/:id' , (req ,res)=>{
    myid = req.params.id;
    Admin.findById({ _id : myid })
        .then(
            (admin)=>{
                res.status(200).send(admin);
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
    Admin.findOneAndDelete({ _id : myid })
        .then(
            (deletedAdmin)=>{
                res.status(200).send(deletedAdmin);
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

    Admin.findByIdAndUpdate({ _id : myid } , newData)
        .then(
            (updatedAdmin)=>{
                filename = '';
                res.status(200).send(updatedAdmin);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
} )


module.exports = router;