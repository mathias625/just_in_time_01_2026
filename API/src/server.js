const express = require("express");
const cors = require("cors");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const producaoRoutes = require("./routes/producaoRoutes");
const estoqueRoutes = require("./routes/estoqueRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/produtos", produtoRoutes);
app.use("/producao", producaoRoutes);
app.use("/estoque", estoqueRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});