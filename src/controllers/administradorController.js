const Model = require('../models');
import bcrypt from 'bcrypt';
const Administrador = Model.administradors;
import jwt from 'jsonwebtoken';
module.exports = {
  // Listar todos os administradores
  async index(req, res) {
    try {
      const administradores = await Administrador.findAll();
      return res.json(administradores);
    } catch (e) {
      console.error('Error fetching administrators:', e);
      return res.status(500).json({ error: 'Erro ao buscar administradores' });
    }
  },

  // Criar um novo administrador
  async store(req, res) {
    try {
      const { nome, email, telefone, senha } = req.body;

      if (!nome || !email || !telefone || !senha) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);
      const novoAdmin = { nome, email, telefone, senha: hashedPassword };

      const admin = await Administrador.create(novoAdmin);
      return res.status(201).json({ admin });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({
        error: 'Erro no servidor. Por favor, tente novamente mais tarde.',
      });
    }
  },

  // Buscar um administrador específico por ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const admin = await Administrador.findByPk(id);

      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      return res.json(admin);
    } catch (error) {
      console.error('Error fetching administrator:', error);
      return res.status(500).json({
        error: 'Erro ao buscar administrador. Por favor, tente novamente.',
      });
    }
  },

  // Atualizar um administrador específico
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, senha } = req.body;

      const admin = await Administrador.findByPk(id);

      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      const hashedPassword = senha ? await bcrypt.hash(senha, 10) : admin.senha;

      await admin.update({
        nome: nome || admin.nome,
        email: email || admin.email,
        telefone: telefone || admin.telefone,
        senha: hashedPassword,
      });

      return res.json({
        message: 'Administrador atualizado com sucesso',
        admin,
      });
    } catch (error) {
      console.error('Error updating administrator:', error);
      return res.status(500).json({
        error: 'Erro ao atualizar administrador. Por favor, tente novamente.',
      });
    }
  },

  // Excluir um administrador específico
  async delete(req, res) {
    try {
      const { id } = req.params;
      const admin = await Administrador.findByPk(id);

      if (!admin) {
        return res.status(404).json({ error: 'Administrador não encontrado' });
      }

      await admin.destroy();
      return res.json({ message: 'Administrador excluído com sucesso' });
    } catch (error) {
      console.error('Error deleting administrator:', error);
      return res.status(500).json({
        error: 'Erro ao excluir administrador. Por favor, tente novamente.',
      });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({
          errors: ['Faltando Email ou Senha'],
        });
      }

      const user = await Administrador.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: ['Email ou Senha Incorretos!'],
        });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(400).json({
          errors: ['Email ou Senha Incorretos!'],
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.TOKENSECRET, {
        expiresIn: '1d',
      });

      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  },
};
