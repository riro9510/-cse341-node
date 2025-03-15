const mongoDb = require('./db/connect');
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
    try {
        const result = await mongoDb.getDb().collection('contacts').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');  
            console.log("respuesta[0]",lists[0]);
            console.log("respuesta",lists);
            res.status(200).json(lists); 
        });
    } catch (error) {
        console.log("aqui falla la consulta");
        next(error); 
    }
};
const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongoDb.getDb().collection('contacts').find({_id:userId});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');  
            console.log("respuesta[0]",lists[0]);
            console.log("respuesta",lists);
            res.status(200).json(lists); 
        });
    } catch (error) {
        console.log("aqui falla la consulta");
        next(error); 
    }
};

const setContact = async (req, res, next) => {
    const user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        favoriteColor:req.body.favoriteColor,
        birthday:req.body.birthday,
    }
    try {
        const result = await mongoDb.getDb().collection('contacts').insertOne(user);

        if (result.acknowledged) {  
            res.status(200).send(`Contact created succefully`);  
        } else {
            res.status(400).send('Contact creation failed');
        }
    } catch (error) {
        if (error.name === 'MongoNetworkError') {    
            res.status(503).send('Error in conection to dataBase'); 
        } else if (error.name === 'MongoServerError') {
            res.status(500).send('Internal Error'); 
        } else {    
            res.status(400).send('Bad Request'); 
        }
        
        
        next(error);
    }
};
const updateContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        favoriteColor:req.body.favoriteColor,
        birthday:req.body.birthday,
    }
    try {
        const result = await mongoDb.getDb().collection('contacts').updateOne({ _id: userId },{ $set: user });  
        if (result.modifiedCount > 0) {  
            res.status(200).send(`Update of user ${userId} succesful`);  
        } else {
            res.status(400).send('Something going wrong updating the contact information');
        }
    } catch (error) {
        if (error.name === 'MongoNetworkError') {    
            res.status(503).send('Error in conection to dataBase'); 
        } else if (error.name === 'MongoServerError') {
            res.status(500).send('Internal Error'); 
        } else {    
            res.status(400).send('Bad Request'); 
        }
        
        
        next(error);
    }
};
const deleteContact = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongoDb.getDb().collection('contacts').deleteOne({ _id: userId } );
        
        if (result.deletedCount > 0) {  
            res.status(200).send(`Deleted of user ${userId} succesful`);  
        } else {
            res.status(400).send('Something going wrong deleting the contact information');
        }
    } catch (error) {
        if (error.name === 'MongoNetworkError') {    
            res.status(503).send('Error in conection to dataBase'); 
        } else if (error.name === 'MongoServerError') {
            res.status(500).send('Internal Error'); 
        } else {    
            res.status(400).send('Bad Request'); 
        }
        
        
        next(error);
    }
};


module.exports = {getAll,getSingle,setContact,updateContact,deleteContact};