const express = require('express');
const router = express.Router();
const enderecosController = require('../controllers/enderecoController');

router.post('/create', enderecosController.createEndereco);
router.get('/', enderecosController.getAllEnderecos);
router.get('/show/:id', enderecosController.getEnderecoById);
router.post('/update/:id', enderecosController.updateEndereco);
router.delete('/apagar/:id', enderecosController.deleteEndereco);

module.exports = router;
