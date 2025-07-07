const express = require('express');
const UsuarioController = require('../controllers/usuarioController');
const AutenticacaoMiddleware = require('../middleware/usuario.Middleware');
const router = express.Router();

// rota de cadastro
router.post('/cadastrar', UsuarioController.cadastrar)

// rota de cadastro
router.post('/cadastrar', UsuarioController.cadastrar)

// rota de perfil
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil)

module.exports = router;