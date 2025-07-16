const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const autenticar = require('../../../middleware/autenticacao.middleware');
const dentistaController = require('../controllers/dentista.controller');

// POST /dentistas
router.post(
  '/',
  [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  ],
  dentistaController.cadastrar
);

// POST /dentistas/login
router.post('/login', dentistaController.login);

// GET /dentistas/me
router.get('/me', autenticar, dentistaController.perfil);

module.exports = router;
