const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

router.post('/create', reservasController.create);
router.get('/', reservasController.findAll);
router.get('/show/:id', reservasController.findOne);
router.put('/update/:id', reservasController.update);
router.delete('/apagar/:id', reservasController.delete);

module.exports = router;
