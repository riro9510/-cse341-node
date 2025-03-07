const express = require('express');
const { getAll,getSingle } = require('../contacts');
const router = express.Router();  

router.get('/', getAll);

router.get("/:id",getSingle);

module.exports = router;
