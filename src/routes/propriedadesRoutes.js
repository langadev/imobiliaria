const express = require('express');
const router = express.Router();
const propriedadesController = require('../controllers/propriedadesController');

router.post('/create', propriedadesController.create);
router.get('/', propriedadesController.findAll);
router.get('/show/:id', propriedadesController.findOne);
router.post('/update/:id', propriedadesController.update);
router.delete('/apagar/:id', propriedadesController.delete);

module.exports = router;
