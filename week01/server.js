const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const professionalRoutes = require("./routes/professional.js");
const contactsRoutes = require("./routes/contacts.js")
const app = express();
const port = process.env.PORT||8080;
const mongodb = require("./db/connect.js")
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/professional', (req, res, next) => {
  console.log("Llamando a la ruta /professional");
  next();  
}, professionalRoutes);

app.use('/contacts', (req, res, next) => {
  console.log("Llamando a la ruta");
  console.log("response",res);
  next();  
}, contactsRoutes);


mongodb.initDb((err,mongodb)=>{
  if(err){
    console.log(err);
  }else{
    app.listen(port);
    console.log("Connected to Db an listen in port",port);
  }
})
