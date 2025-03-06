const mongoDb = require('./db/connect');

const getData = async (req, res, next) => {
    console.log("si llegamos aqui");
    try {
        const result = await mongoDb.getDb().collection('user').find();
        console.log("que viene de respuesta",result);
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');  
            res.status(200).json(lists[0]); 
        });
    } catch (error) {
        console.log("aqui falla la consulta");
        next(error); 
    }
};


module.exports = {getData};