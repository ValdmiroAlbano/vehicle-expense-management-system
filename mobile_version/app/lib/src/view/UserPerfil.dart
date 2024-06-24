import 'dart:io';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/view/UserEdit.dart';


class UserPerfil extends StatefulWidget {
  const UserPerfil({super.key});

  @override
  State<UserPerfil> createState() => _UserPerfilState();
}

class _UserPerfilState extends State<UserPerfil> {
  String? _foto;
  String? _nome;
  String? _email;
  String? _contato;
  String? _tipoUsuario;


  @override
  void initState(){
    super.initState();
      getMotorista();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: (){
            Navigator.pop(context);
          },
          icon: const Icon(Ionicons.chevron_back_outline),
        ),
        leadingWidth: 70,
      ),
      body: Padding(
        padding: const EdgeInsets.all(30),
        child: ListView(

          children: [
            const Text(
              'Conta',
              style: TextStyle(
                fontSize: 36,
                fontWeight: FontWeight.bold
              ),),
            const SizedBox(height: 20),
            Column(
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
                          color: Colors.grey[300], // Cor de fundo do Container
                          shape: BoxShape.circle),
                          child: _foto != null && _foto != 'Sem foto'
                          ? ClipRRect(
                            borderRadius: BorderRadius.circular(25),
                            child: Image.file(
                              File(_foto!),
                              fit: BoxFit.cover,
                            ),
                          )
                          : const Icon(
                            Icons.person,
                            color: Colors.black,
                            size: 50,
                          )
                      )
                    ],
                  ),
                  const SizedBox(height: 10),
                  IconButton(
                    onPressed: () async{},
                    icon: const Icon(
                      Icons.image,
                      size: 30,
                      ),
                   ),
              ],
           ),
           const SizedBox(height: 60),
           Row(
            mainAxisAlignment: MainAxisAlignment.start,
             children: [
               const Text(
                'Nome:',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                  fontWeight: FontWeight.bold
                ),
               ),
               const SizedBox(width: 12),
               Text(
              _nome ?? "Sem nome",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500
              ),
              )
             ],
           ),
           const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
             children: [
               const Text(
                'Email:',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                  fontWeight: FontWeight.bold
                ),
               ),
               const SizedBox(width: 12),
               Text(
              _email ?? 'Sem email',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500
                )),
             ],
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
             children: [
               const Text(
                'Função:',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                  fontWeight: FontWeight.bold
                ),
               ),
               const SizedBox(width: 12),
               Text(
              _tipoUsuario ?? 'Motorista',
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500
                ),
               ),
             ],
            ),
           const SizedBox(height: 10),
             Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
             children: [
               const Text(
                'Contato:',
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.grey,
                  fontWeight: FontWeight.bold
                ),
               ),
              Text(
             _contato ?? "sem contato",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w500
              ),
              ),
              IconButton(
                onPressed: () async{
                  final result = await Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const UserEdit()),
                  );
                  if(result!= null){
                    getMotorista();
                  }
                },
                icon: const Icon(Icons.edit),
              ),
             ],
            ),     
              ],
            ),

          ),
    );
  }


  Future<void> getMotorista() async{
    final foto = await AuthManager.getFoto();
    final contato = await AuthManager.getContacto();
    final nome = await AuthManager.getNome();
    final email = await AuthManager.getEmail();
    final tipoUsuario = await AuthManager.getTipoUsuario();

    setState(() {
      _nome = nome;
      _email = email;
      _contato = contato;
      _tipoUsuario = tipoUsuario;
      _foto = foto;
    });
  } 
}

