const express = require("express");
const UsuarioController = require("../controllers/Usuario/usuarioController");

const router = express.Router();
const usuarioController = new UsuarioController();

router.post("/login", usuarioController.loginUsuario.bind(usuarioController));

module.exports = router;
