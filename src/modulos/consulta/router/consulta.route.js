const express = require('express');
const router = express.Router();
const ConsultaController = require('../controllers/consulta.controller'); // Corrija o nome se estiver diferente

// Rotas
router.post('/cadastrar', ConsultaController.cadastrarconsulta);
router.get('/usuario', ConsultaController.usuario);
router.get('/listar', ConsultaController.listarConsultas);
router.get('/buscar', ConsultaController.consultarPorNome);

module.exports = router;
