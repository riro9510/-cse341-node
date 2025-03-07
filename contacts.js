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


module.exports = {getAll,getSingle};