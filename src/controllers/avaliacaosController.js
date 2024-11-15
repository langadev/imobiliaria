const { avaliacaos } = require('../models');

exports.createAvaliacao = async (req, res) => {
  try {
    const novaAvaliacao = await avaliacaos.create(req.body);
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAvaliacoes = async (req, res) => {
  try {
    const listaAvaliacoes = await avaliacaos.findAll();
    res.status(200).json(listaAvaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvaliacaoById = async (req, res) => {
  try {
    const avaliacao = await avaliacaos.findByPk(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAvaliacao = async (req, res) => {
  try {
    const avaliacao = await avaliacaos.findByPk(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    await avaliacao.update(req.body);
    res.status(200).json(avaliacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAvaliacao = async (req, res) => {
  try {
    const avaliacao = await avaliacaos.findByPk(req.params.id);
    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    await avaliacao.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
