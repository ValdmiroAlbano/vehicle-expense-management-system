import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:ionicons/ionicons.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/utils/globalColor.dart';
import 'package:http/http.dart' as http;

class UserEdit extends StatefulWidget {
  const UserEdit({super.key});

  @override
  State<UserEdit> createState() => _UserEditState();
}

class _UserEditState extends State<UserEdit> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController contatoController = TextEditingController();
  XFile? _imagemSelecionada;

  String? foto;

 @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            if(_imagemSelecionada != null || contatoController.text != '')
            {
              showDialog(
                context: context,
                builder: (context) =>  SimpleDialog(
                  title: const Text('Erro'),
                  contentPadding: const EdgeInsets.all(20.0),
                  children: <Widget>[
                    const Text(
                      'Salva a foto ou contato para continuar!',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 18,
                      ),
                    ),
                    TextButton(onPressed: (){
                      Navigator.of(context).pop();
                    }, child: const Text('Fechar'))
                  ],
                ),
              );
            }else{
              Navigator.pop(context);
            }
          },
          icon: const Icon(Ionicons.chevron_back_outline),
        ),
        leadingWidth: 70,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Editar',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold
                ),),
              const SizedBox(height: 20),
              Form(
                key: _formKey,
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                          alignment: Alignment.center,
                          height: 100,
                          width: 100,
                          decoration: BoxDecoration(
                            color:  Colors.grey[300],
                            shape: BoxShape.circle,
                          ),
                          child:_imagemSelecionada != null
                              ? ClipRRect(
                                  borderRadius: BorderRadius.circular(50),
                                  child: Image.file(
                                    File(foto!),
                                    
                                    fit: BoxFit.cover,
                                  ),
                                )
                              :  const Icon(
                                Icons.person,
                                color: Colors.black,
                                size: 55,
                              )
                          )
                        ],
                      ),
                     InkWell(
                      onTap: _selecionarImagem,
                      child: const SizedBox(
                        height: 25,
                        child: Text(
                          'alterar imagem',
                          style: TextStyle(
                            color: Colors.lightBlueAccent,
                            fontWeight: FontWeight.bold,
                            fontSize: 20
                          ),
                        ),
                      ),
                    ),
                  ],
                             ),
              ),
             const SizedBox(height: 40),
             const Text(
                'Contato:',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                  fontWeight: FontWeight.bold
                ),),
              const SizedBox(height: 8),
              TextFormField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: const BorderSide(
                    color: Colors.grey,
                    width: 1,
                    style: BorderStyle.solid
                  ),
               )),
                keyboardType: TextInputType.url,
                controller: contatoController,
                validator: (value){
                  if(value!.isEmpty){
                    return 'Contato Obrigatorio!';
                  }
                  else{
                    return null;
                  }
                },
                ),
                const SizedBox(height: 10),
            
                  InkWell(
                  onTap: _adicionarDocumento,
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
                           offset: const Offset(0, 1), // changes position of shadow
                         ),
                       ]
                     ),
                     child: const Text(
                       'Salvar',
                       style: TextStyle(
                         color: Colors.white,
                         fontWeight: FontWeight.w600, 
                         fontSize: 18,
                       ),
                     ),
                   ),
                  )
                ],
              ),
            ),
          ),
        );
  }

  void _selecionarImagem() async {
    
    final ImagePicker picker = ImagePicker();
    try {
      XFile? file = await picker.pickImage(source: ImageSource.gallery);
      if(file != null){
          await AuthManager.seveFoto(file.path);
            setState(() {
           _imagemSelecionada = file;
           foto = file.path;
          });
      } 
    } catch (e) {
      print(e);
    }
  }

Future<void> _adicionarDocumento() async {

    // Coletar os dados do formulário
    final contato = contatoController.text;
    final userId = await AuthManager.getUserId();
    print('O id do usuario na tela editUser e : $userId');
    // Crie o corpo da requisição
    var request = http.MultipartRequest(
      'put',
      Uri.parse('http://${Config.serverIpAddres}:3000/administrador/atualizar/$userId'),
    );

      // Adicionar imagem ao corpo da requisição
      if (_imagemSelecionada != null && _imagemSelecionada!.path.isNotEmpty) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'foto',
            _imagemSelecionada!.path,
          ),
        );
      }
  
    // Adicione outros dados
    if (contato.isNotEmpty) {
      request.fields['contato'] = contato;
      await AuthManager.saveContato(contato);
      
    }

    // Envie a requisição
    var response = await request.send();

    // Verifique o código de status da resposta
    if (response.statusCode == 200) {
      sucesso('Documento adicionado com sucesso!');
      Navigator.pop(context, true);
    } else {
      erro('Erro ao adicionar o documento');
    }
}


  // Função para exibir um snackbar de sucesso
  void sucesso(String msg) {
    final snackBar = SnackBar(
      content: Text(
        msg,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.green[600],
      duration: const Duration(seconds: 2),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  // Função para exibir um snackbar de erro
  void erro(String msg) {
    final snackBar = SnackBar(
      content: Text(
        msg,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.red[600],
      duration: const Duration(seconds: 2),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}