import 'dart:convert';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/src/view/Home.dart';
import 'package:app/utils/globalColor.dart';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController senhaController = TextEditingController();

  @override
  void initState(){
    super.initState();

  }
  
  void _login() async {

    if (formKey.currentState!.validate()) {
      final email = emailController.text;
      final senha = senhaController.text;
      final body = {
        "email": email,
        "senha": senha,
      };
      final url = Uri.parse('http://${Config.serverIpAddres}:3000/usuario/login');
      final resposta = await http.post(
        url,
        body: jsonEncode(body),
        headers: {'Content-Type': 'application/json'},
      );
      if (resposta.statusCode == 200) {
        //Pegar o resultado do servidor
        final json = jsonDecode(resposta.body);
        final token = json['token'];
        final Map<String, dynamic> decodedToken = JwtDecoder.decode(token);
        final nome = decodedToken['nome'];
        final email = decodedToken['email'];
        final contato = decodedToken['contato'];
        final tipoUsuario = decodedToken['tipoUsuario'];
        final id = decodedToken['id'];
        final foto = decodedToken['foto'];

        //Disponiblizar o token no dispositivo
        if(token != null && nome != null && email != null && contato != null && tipoUsuario != null && id != null && foto != null){
          await AuthManager.saveToken(token);
          await AuthManager.saveNome(nome);
          await AuthManager.saveEmail(email);
          await AuthManager.saveContato(contato);
          await AuthManager.saveTipoUsuario(tipoUsuario);
          await AuthManager.saveUserId(id);
          await AuthManager.seveFoto(foto);
        }

        final tokenMotorista = await AuthManager.getToken();
        if (tokenMotorista != null) {
          // O usuário está autenticado, continue para a tela principal
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const Home()),
          );
        } else {
          // O usuário não está autenticado, redirecione para a tela de login
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => const LoginScreen()),
          );
        }

      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Colors.red[600],
            content: const Text(
              'Credenciais inválidas',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 15,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        );
      }
    }
                        
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(15.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 100),
                Text(
                  'Bem vindo!',
                  style: TextStyle(
                    color: GlobalColors.textColor,
                    fontSize: 35,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Entre para acessar sua conta!',
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 50),
                Form(
                  key: formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Email',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 5),
                      TextFormField(
                        controller: emailController,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Email obrigatório';
                          }
                          return null;
                        },
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          prefixIcon: Padding(
                            padding: EdgeInsets.only(bottom: 7),
                            child: Icon(Icons.email),
                          ),
                          hintText: 'Seu Email',
                          hintStyle: TextStyle(
                            color: Colors.black,
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.all(0),
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Text(
                        'Senha',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 5),
                      TextFormField(
                        controller: senhaController,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Senha obrigatória';
                          }
                          return null;
                        },
                        keyboardType: TextInputType.text,
                        obscureText: true,
                        decoration: const InputDecoration(
                          prefixIcon: Padding(
                            padding: EdgeInsets.only(bottom: 7),
                            child: Icon(Icons.lock),
                          ),
                          hintText: 'Sua Senha',
                          hintStyle: TextStyle(
                            color: Colors.black,
                            fontSize: 15,
                            fontWeight: FontWeight.w600,
                          ),
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.all(0),
                        ),
                      ),
                      const SizedBox(height: 20),
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            'Recuperar conta',
                            style: TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _login,
                        child: Container(
                          alignment: Alignment.center,
                          height: 55,
                          decoration: BoxDecoration(
                            color: GlobalColors.mainColor,
                            borderRadius: BorderRadius.circular(6),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                spreadRadius: 1,
                                blurRadius: 1,
                                offset: const Offset(0, 1),
                              ),
                            ],
                          ),
                          child: const Text(
                            'Entrar',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                              fontSize: 18,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
