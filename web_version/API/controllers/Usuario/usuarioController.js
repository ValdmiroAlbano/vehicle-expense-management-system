require('dotenv').config();
const UsuarioModel = require('../../models/Usuario/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* const WebSocket = require('ws'); */
  
class UsuarioController {
    constructor(IDUsuario, nome, email, senha, foto, tipoUsuario){
        this.IDUsuario = IDUsuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.foto = foto;
        this.tipoUsuario = tipoUsuario;
        this.UsuarioModel = new UsuarioModel();
        /* this.wss = new WebSocket.Server({ port: 3001 }); */
    }

    async loginUsuario(req, res) {
        const { email, senha } = req.body;
    
        try {
            this.UsuarioModel.loginUsuario({ email }, async (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ msg: "Erro interno do servidor." });
                }
                
                if (results.length === 0) {
                    console.log('Usuário não encontrado!');
                    return res.status(401).json({ msg: 'Credenciais inválidas - Usuário não encontrado.' });
                }
    
                const verificarSenha = await bcrypt.compare(senha, results[0].senha);
    
                if (!verificarSenha) {
                    console.log('Senha inválida!');
                    return res.status(401).json({ msg: 'Credenciais inválidas - Senha incorreta.' });
                }
    
                const segredo = process.env.SECRET;
                
                const usuario = {
                    id: results[0].IDUsuario,
                    nome: results[0].nome,
                    email: results[0].email,
                    foto: results[0].foto,
                    contato: results[0].contato,
                    tipoUsuario: results[0].tipoUsuario
                }
                
                const token = jwt.sign(usuario, segredo);
                res.status(200).json({mgs:"Autenticação realizada com sucesso", token});
            });
        } catch (err) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ msg: 'Erro interno do servidor.' });
        }
    }

}

module.exports = UsuarioController;