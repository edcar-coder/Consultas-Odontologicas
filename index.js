const express = require("express");
const dotenv = require("dotenv");
const routeDentista = require('./src/modulos/dentista/routers/dentista.route');
const routeUusario =  require('./src/modulos/usuario/router/usuario.route')
dotenv.config();

const sequelize = require("./src/config/configDb");

const app = express();
const port = process.env.PORTA;

// Middleware para processar JSON
app.use(express.json());

// Rota para dentista
app.use(routeDentista);

// rota para usuário
app.use(routeUusario);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("A conexão foi estabelecida com sucesso.");
  } catch (error) {
    console.error("Não é possível conectar ao banco de dados:", error.message);
  }
  console.log(`Servidor executando na porta ${port}`);
});