const express = require('express');
const router = express.Router();
const proprietariosController = require('../controllers/proprietarioController');

router.post('/create', proprietariosController.create);
router.get('/', proprietariosController.findAll);
router.get('/show/:id', proprietariosController.findOne);
router.put('/update/:id', proprietariosController.update);
router.delete('/delete/:id', proprietariosController.delete);

module.exports = router;
