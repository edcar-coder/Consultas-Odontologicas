const express = require('express');
const router = express.Router();

const usuarioController = require('../controller/usuario.controller'); // Corrigido o caminho do módulo
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware'); // Importação do middleware

// rota de cadastro
router.post('/cadastrar', usuarioController.cadastrar);

// rota de perfil
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, usuarioController.perfil);

module.exports = router;