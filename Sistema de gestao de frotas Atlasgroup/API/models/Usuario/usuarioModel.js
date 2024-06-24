const conexao = require("../../configs/db")

class UsuarioModel{
    constructor(){
        conexao.connect(err =>{
            if(err){
                console.log('Erro ao conectar ao banco: ', err);
            }else{
                console.log('Usuario conexao com banco bem-sucedida!');
            }
        });
    }
    
    loginUsuario(email, callback) {
        const sql = 'SELECT * FROM tb_usuario WHERE email = ?';
        conexao.query(sql, [email.email], callback);
    }
    
    getId(IDUsuario, callback) {
        const sql = 'SELECT nome FROM tb_usuario WHERE IDUsuario = ?';
        conexao.query(sql, [IDUsuario], callback);
    }
    
    
}

module.exports = UsuarioModel;