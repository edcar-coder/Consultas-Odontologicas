const express = require('express');
const router = express.Router();

const autenticar = require('../../../middleware/autenticacao.middleware');
const dentistaController = require('../controllers/dentista.controller');

// POST /dentistas
router.post('/cadastrar', dentistaController.cadastrar);

// POST /dentistas/login
router.post('/login', dentistaController.login);

// GET /dentistas/me
router.get('/me', autenticar, dentistaController.perfil);

module.exports = router;




