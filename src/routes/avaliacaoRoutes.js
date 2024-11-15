const express = require('express');
const router = express.Router();
const avaliacaosController = require('../controllers/avaliacaosController');

// Rotas para CRUD de avaliações
router.post('/create', avaliacaosController.createAvaliacao);
router.get('/', avaliacaosController.getAllAvaliacoes);
router.get('/show/:id', avaliacaosController.getAvaliacaoById);
router.post('/update/:id', avaliacaosController.updateAvaliacao);
router.delete('/apagar/:id', avaliacaosController.deleteAvaliacao);

module.exports = router;
