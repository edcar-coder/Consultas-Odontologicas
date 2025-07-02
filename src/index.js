const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const { sequelize } = require('./src/config/configDB');
const authRoute = require('./src/modulos/autenticacao/router/autenicacao.route')
const consultaRoute = require('./src/modulos/consultas/routers/consulta.route')
// Configuração do banco de dados
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend React
    credentials: true               // permite enviar cookies (como refreshToken)
}));

app.use(express.json());

// rotas de consulta
// http:localhost:3001/api/consultas/cadastrar
// http:localhost:3001/api/cadastrar
// http:localhost:3001/api/perfil
app.use('/api/', consultaRoute)

// rotas de autenticação
// http:localhost:3001/api/login
// http:localhost:3001/api/logout
// http:localhost:3001/api/refresh-token
app.use('/api/', authRoute)

const PORTA = process.env.PORTA;
app.listen(PORTA, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ force: false, alter:false });
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', error);
    }
    console.log(`Servidor rodando na porta ${PORTA}`);
});