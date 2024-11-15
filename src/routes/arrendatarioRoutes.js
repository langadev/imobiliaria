const express = require('express');
const router = express.Router();
const arrendatariosController = require('../controllers/arrendatariocontroller');

router.post('/create', arrendatariosController.create);
router.get('/', arrendatariosController.findAll);
router.get('/show/:id', arrendatariosController.findOne);
router.post('update/:id', arrendatariosController.update);
router.delete('/:id', arrendatariosController.delete);

module.exports = router;
