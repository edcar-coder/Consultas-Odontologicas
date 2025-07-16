const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

const Dentista = require('../models/dentista.model');

exports.cadastrar = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  const { nome, email, senha, especialidade } = req.body;

  try {
    const dentistaExistente = await Dentista.findOne({ where: { email } });
    if (dentistaExistente) {
      return res.status(400).json({ msg: 'E-mail já cadastrado.' });
    }

    const hash = await bcrypt.hash(senha, 10);
    const novoDentista = await Dentista.create({
      nome,
      email,
      senha: hash,
      especialidade
    });

    res.status(201).json({ msg: 'Dentista cadastrado com sucesso!', id: novoDentista.id });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao cadastrar dentista.', erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const dentista = await Dentista.findOne({ where: { email } });
    if (!dentista) return res.status(401).json({ msg: 'Credenciais inválidas.' });

    const senhaValida = await bcrypt.compare(senha, dentista.senha);
    if (!senhaValida) return res.status(401).json({ msg: 'Credenciais inválidas.' });

    const token = jwt.sign(
      { id: dentista.id, tipo: 'dentista' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no login.', erro: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const dentista = await Dentista.findByPk(req.user.id, {
      attributes: ['id', 'nome', 'email', 'especialidade']
    });
    res.json(dentista);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar perfil.', erro: err.message });
  }
};
