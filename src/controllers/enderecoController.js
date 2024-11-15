const { enderecos } = require('../models');

exports.createEndereco = async (req, res) => {
  try {
    const novoEndereco = await enderecos.create(req.body);
    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllEnderecos = async (req, res) => {
  try {
    const listaEnderecos = await enderecos.findAll();
    res.status(200).json(listaEnderecos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEnderecoById = async (req, res) => {
  try {
    const endereco = await enderecos.findByPk(req.params.id);
    if (!endereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    res.status(200).json(endereco);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEndereco = async (req, res) => {
  try {
    const endereco = await enderecos.findByPk(req.params.id);
    if (!endereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    await endereco.update(req.body);
    res.status(200).json(endereco);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEndereco = async (req, res) => {
  try {
    const endereco = await enderecos.findByPk(req.params.id);
    if (!endereco) {
      return res.status(404).json({ error: 'Endereço não encontrado' });
    }
    await endereco.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
