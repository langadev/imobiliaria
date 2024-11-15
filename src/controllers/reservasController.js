const { reservas, arrendatarios, propriedades } = require('../models');

exports.create = async (req, res) => {
  try {
    const { data_inicio, data_fim, status, arrendatario_id, propriedade_id } =
      req.body;

    const arrendatario = await arrendatarios.findByPk(arrendatario_id);
    if (!arrendatario) {
      return res.status(404).json({ error: 'Arrendatário não encontrado' });
    }

    const propriedade = await propriedades.findByPk(propriedade_id);
    if (!propriedade) {
      return res.status(404).json({ error: 'Propriedade não encontrada' });
    }

    const novaReserva = await reservas.create({
      data_inicio,
      data_fim,
      status,
      arrendatario_id,
      propriedade_id,
    });

    return res.status(201).json(novaReserva);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todasReservas = await reservas.findAll({
      include: [
        { model: arrendatarios, attributes: ['nome', 'email'] },
        { model: propriedades, attributes: ['nr_quartos', 'preco_por_dia'] },
      ],
    });
    return res.status(200).json(todasReservas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obter reserva por ID
exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await reservas.findByPk(id, {
      include: [
        { model: arrendatarios, attributes: ['nome', 'email'] },
        { model: propriedades, attributes: ['nr_quartos', 'preco_por_dia'] },
      ],
    });

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    return res.status(200).json(reserva);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { data_inicio, data_fim, status, arrendatario_id, propriedade_id } =
      req.body;

    const reserva = await reservas.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    if (arrendatario_id) {
      const arrendatario = await arrendatarios.findByPk(arrendatario_id);
      if (!arrendatario) {
        return res.status(404).json({ error: 'Arrendatário não encontrado' });
      }
    }

    if (propriedade_id) {
      const propriedade = await propriedades.findByPk(propriedade_id);
      if (!propriedade) {
        return res.status(404).json({ error: 'Propriedade não encontrada' });
      }
    }

    await reserva.update({
      data_inicio,
      data_fim,
      status,
      arrendatario_id,
      propriedade_id,
    });

    return res.status(200).json(reserva);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await reservas.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    await reserva.destroy();
    return res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
