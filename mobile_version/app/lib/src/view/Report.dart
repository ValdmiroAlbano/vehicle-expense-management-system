// ignore_for_file: file_names
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/src/view/UserPerfil.dart';
import 'package:app/src/widgets/bottonGlogal.dart';
import 'package:http/http.dart' as http;

class Report extends StatefulWidget {
  const Report({super.key});

  @override
  State<Report> createState() => _ReportState();
}

class _ReportState extends State<Report> {
  final GlobalKey<FormState> formKey =GlobalKey<FormState>();
  final TextEditingController _descricaoController = TextEditingController();
  String? placa ;
  String? foto;
  int? veiculoID;
  int? userID;
  @override
  void initState() {
    super.initState();
    getFoto();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:  AppBar(
        title: const Text(
            'Avarias!',
            style: TextStyle(
              color: Colors.black,
              fontSize: 23,
              fontWeight: FontWeight.bold
          ),
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        toolbarHeight: 80,
        actions: [
           InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const UserPerfil()));
              },
              child: Container(
                  alignment: Alignment.center,
                  margin: const EdgeInsets.only(right: 10),
                  height: 50,
                  width: 50,
                  decoration: BoxDecoration(
                    color:  Colors.grey[300],
                    borderRadius: BorderRadius.circular(50),),
                   child: foto != null && foto != 'Sem foto'
                    ? ClipRRect(
                      borderRadius: BorderRadius.circular(25),
                      child: Image.file(
                        File(foto!),
                        fit: BoxFit.cover,
                      ),
                    )
                    : const Icon(
                      Icons.person,
                      color: Colors.black,
                    )
                      ),
                  ),
          ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding:  const EdgeInsets.all(16.0),
          child: Form(
            key: formKey ,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Matrícula do veiculo',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 15),
                  child: Text(
                    placa ?? 'nunhum veiculo atribuido!',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.grey,
                    ),
                  ),
                ),

                const SizedBox(height: 60),
                const Text(
                  'Descrição',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 6),
                TextFormField(
                  controller: _descricaoController,
                  keyboardType: TextInputType.multiline,
                  decoration: const InputDecoration(
                    hintStyle: TextStyle(
                      color: Colors.black,
                      fontSize: 20,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  minLines: 3,
                  maxLines: 100,
                  validator: (value) {
                    if(value!.isEmpty){
                      return 'Discrição Obigatória';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 100),
                BtnGlobal(
                  text: 'Reportar',
                  onTap:problemaVeiculo,
                  tamanho: 4),
              ],
            ),
          ),
        ),
      ),
    );
  }
  Future<void> getFoto() async{
    foto = await AuthManager.getFoto();
    placa = await AuthManager.getPlacaVeiculo();
    userID = await AuthManager.getUserId();
    veiculoID = await AuthManager.getIDVeiculo();
    setState(() {
      foto;
    });
  }

  Future<void> problemaVeiculo() async{

    if( formKey.currentState!.validate()){
    final descricao = _descricaoController.text;

    if (veiculoID == 0 || veiculoID == null)    {
    print('O Id do veiculo e: $veiculoID');
    return showDialog(
      context: context,
       builder: (context) =>  SimpleDialog(
         title: const Text('Erro'),
         contentPadding: const EdgeInsets.all(20.0),
         children: <Widget>[
           const Text(
             'Nenhum veiculo atribuido',
             style: TextStyle(
               fontWeight: FontWeight.w600,
               fontSize: 18,
             ),
           ),
           TextButton(onPressed: (){
            _descricaoController.text = "";
             Navigator.of(context).pop();
           }, child: const Text('Fechar'))
         ],
       ));
  }
      final body = {
        "id_motorista": userID,
        "id_veiculo": veiculoID,
        "descricao_problema": descricao,
      };
      final url = Uri.parse('http://${Config.serverIpAddres}:3000/motorista/reportarProblema');
      final resposta = await http.post( url, body: jsonEncode(body),
      headers: {'Content-Type': 'application/json'}
  );

  if(formKey.currentState!.validate()){
    formKey.currentState!.save();
  }

  if (resposta.statusCode == 200) {
    _descricaoController.text = "";
    reclamarSucesso('Problema reportado');
  }else{
    reclamarErro('Erro!');
  }
    }
  }

  void reclamarSucesso(String menssagem){
    final snackBar = SnackBar(
      content: Text(
        menssagem,
        style: const TextStyle(
          color: Colors.white,
        ),
        ),
      backgroundColor: Colors.green[600],
      duration: const Duration(seconds: 2),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  void reclamarErro(String menssagem) {
    final snackBar = SnackBar(
      content: Text(
        menssagem,
        style: const TextStyle(
          color: Colors.white,
        )
      ),
      backgroundColor: Colors.red[600],
      duration: const Duration(seconds: 2),
      );
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}