require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Rotas da API
const usuarioRoutes = require('./routers/usuariosRotas');
const AdministradorRouter = require('./routers/administradorRoute');
const TecnicoManutencaoRouter = require('./routers/TecnicoManutencaoRoute');
const MotoristaRouter = require('./routers/motoristaRoute');
const AbastecimentoRouter = require('./routers/abastecimentoRouter');
const ManutencaoRouter = require('./routers/manutencaoRouter');
const VeiculoRouter = require('./routers/veiculoRoute');
const APIVeiculos = require('./routers/APIListaVeiculos');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas da API
app.use('/usuario', usuarioRoutes);
app.use('/administrador', AdministradorRouter);
app.use('/TecnicoManutencao', TecnicoManutencaoRouter);
app.use('/motorista', MotoristaRouter);
app.use('/manutencoes', ManutencaoRouter);
app.use('/abastecimentos', AbastecimentoRouter);
app.use('/veiculos', VeiculoRouter);
app.use('/api', APIVeiculos)

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
});

module.exports = app;