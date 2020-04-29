// importando módulo "express"
const express = require('express');

// importando módulo "cors"
const cors = require('cors');

// importando errors de celebrate (validações)
const { errors } = require('celebrate');

// importando o arquivo de rotas:
const routes = require('./routes');

// criando variável que vai armazenar a aplicação
const app = express();

app.use(cors()); // por enquanto assim, depois colocamos parametro { origin: 'url que pode acessar a app' }
app.use(cors({
    origin: ''
}));
app.use(express.json());
app.use(routes);
app.use(errors());


// aplicação deve 'ouvir' a porta 3333 (NODE) -> no navegador localhost:3333 (para rodar servidor: npm start)
// app.listen(3333);

// para testes, utilizar dessa forma:
module.exports = app;