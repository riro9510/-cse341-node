const express = require('express');
const { getData } = require('../professional');
const router = express.Router();  

console.log("Llamando");
router.get('/', getData);



module.exports = router;
