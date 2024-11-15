const { propriedades, proprietarios } = require('../models');

exports.create = async (req, res) => {
  try {
    const { nr_quartos, preco_por_dia, disponibilidade, proprietario_id } =
      req.body;

    const proprietario = await proprietarios.findByPk(proprietario_id);
    if (!proprietario) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }

    const novaPropriedade = await propriedades.create({
      nr_quartos,
      preco_por_dia,
      disponibilidade,
      proprietario_id,
    });

    return res.status(201).json(novaPropriedade);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todasPropriedades = await propriedades.findAll({
      include: [{ model: proprietarios, attributes: ['nome', 'email'] }],
    });
    return res.status(200).json(todasPropriedades);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const propriedade = await propriedades.findByPk(id, {
      include: [{ model: proprietarios, attributes: ['nome', 'email'] }],
    });

    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }

    return res.status(200).json(propriedade);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nr_quartos, preco_por_dia, disponibilidade, proprietario_id } =
      req.body;

    const propriedade = await propriedades.findByPk(id);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }

    if (proprietario_id) {
      const proprietario = await proprietarios.findByPk(proprietario_id);
      if (!proprietario) {
        return res.status(404).json({ error: 'Proprietário não encontrado' });
      }
    }

    await propriedade.update({
      nr_quartos,
      preco_por_dia,
      disponibilidade,
      proprietario_id,
    });

    return res.status(200).json(propriedade);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const propriedade = await propriedades.findByPk(id);

    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }

    await propriedade.destroy();
    return res
      .status(200)
      .json({ message: 'Propriedade excluída com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
