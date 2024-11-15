const { proprietarios } = require('../models');

exports.create = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    const novoProprietario = await proprietarios.create({
      nome,
      email,
      telefone,
      senha,
    });
    return res.status(201).json(novoProprietario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todosProprietarios = await proprietarios.findAll();
    return res.status(200).json(todosProprietarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obter proprietário por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const proprietario = await proprietarios.findByPk(id);
    if (!proprietario) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }
    return res.status(200).json(proprietario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;
    const proprietario = await proprietarios.findByPk(id);

    if (!proprietario) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }

    await proprietario.update({ nome, email, telefone, senha });
    return res.status(200).json(proprietario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const proprietario = await proprietarios.findByPk(id);

    if (!proprietario) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }

    await proprietario.destroy();
    return res
      .status(200)
      .json({ message: 'Proprietário excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
