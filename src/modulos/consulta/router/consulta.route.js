const express = require('express');
const ConsultaController = require('../controllers/consultaController');

const router = express.Router();

// rota de cadastro
router.post('/cadastrar', ConsultaController.cadastrar)

// rota de cadastro
router.post('/cadastrar', ConsultaController.cadastrar)

// rota de perfil
router.get('/perfil', AutenticacaoUsuario.autenticarToken, ConsultaController.perfil)

module.exports = router;