const { arrendatarios } = require('../models');

exports.create = async (req, res) => {
  try {
    const { nome, email, telefone, senha } = req.body;
    const novoArrendatario = await arrendatarios.create({
      nome,
      email,
      telefone,
      senha,
    });
    return res.status(201).json(novoArrendatario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todosArrendatarios = await arrendatarios.findAll();
    return res.status(200).json(todosArrendatarios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const arrendatario = await arrendatarios.findByPk(id);
    if (!arrendatario) {
      return res.status(404).json({ error: 'Arrendatário não encontrado' });
    }
    return res.status(200).json(arrendatario);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, senha } = req.body;
    const arrendatario = await arrendatarios.findByPk(id);

    if (!arrendatario) {
      return res.status(404).json({ error: 'Arrendatário não encontrado' });
    }

    await arrendatario.update({ nome, email, telefone, senha });
    return res.status(200).json(arrendatario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const arrendatario = await arrendatarios.findByPk(id);

    if (!arrendatario) {
      return res.status(404).json({ error: 'Arrendatário não encontrado' });
    }

    await arrendatario.destroy();
    return res
      .status(200)
      .json({ message: 'Arrendatário excluído com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
