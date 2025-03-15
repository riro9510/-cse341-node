const express = require('express');
const { getAll,getSingle,setContact,updateContact,deleteContact } = require('../contacts');
const router = express.Router();  

router.get('/', getAll);

router.get("/:id",getSingle);

router.post("/",setContact)
router.put("/:id",updateContact)
router.delete("/:id",deleteContact)

module.exports = router;
