const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./src/config/configDb'); // Correção na importação

// Importando as rotas
const authRoute = require('./src/modulos/autenticacao/router/autenticacao.route');
const consultaRoute = require('./src/modulos/consulta/router/consulta.route');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Criação do servidor Express
const app = express();

// Configuração do CORS para o frontend
app.use(cors({
  origin: 'http://localhost:5173', // Altere para a URL do seu frontend
  credentials: true,               // Permite enviar cookies (como refreshToken)
}));

// Permite que o Express entenda JSON
app.use(express.json());

// Configuração das rotas
// Rota para consultas
app.use('/api/', consultaRoute);

// Rota para autenticação
app.use('/api/', authRoute);

// Definindo a porta a partir do .env
const PORTA = process.env.PORTA || 3001; // Caso a porta não seja definida, usa 3001

// Inicializa o servidor na porta especificada
app.listen(PORTA, async () => {
  try {
    // Verifica a conexão com o banco de dados
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincroniza os modelos com o banco de dados (sem força para evitar perda de dados)
    await sequelize.sync({ force: false, alter: false });
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
  }
  
  // Inicia o servidor
  console.log(`Servidor rodando na porta ${PORTA}`);
});
