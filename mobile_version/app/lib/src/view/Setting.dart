import 'dart:io';
import 'package:flutter/material.dart';
import 'package:ionicons/ionicons.dart';
import 'package:app/src/auth/Login.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/widgets/SettingItem.dart';
import 'package:app/src/widgets/Setting_Swict.dart';
import 'package:app/src/view/UserPerfil.dart';

class Setting extends StatefulWidget {
  const Setting({super.key});

  @override
  State<Setting> createState() => _SettingState();
}

class _SettingState extends State<Setting> {
  bool isDarkMode = false;
  List items = [];
  String? _foto;
  String? _nome;
  String? _tipoUsuario;
  
  

  @override
  void initState(){
    super.initState();
    // Chame a função getData com o ID do usuário
    getMotorista();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          Padding(
          padding: const EdgeInsets.all(18.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 30),
               const Text(
                'Conta',
                style: TextStyle(
                  fontSize: 34,
                  fontWeight: FontWeight.w500
              )),
              const SizedBox(height: 40),
              ListTile(
                leading: Container(
                  alignment: Alignment.center,
                  height: 60,
                  width: 60,
                  decoration: BoxDecoration(
                  color: Colors.grey[300],
                  shape: BoxShape.circle,
                  ),
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
                      )
                ),
              title: Text(
                _nome ?? "Sem nome",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w500
                ),
                ),
              subtitle: Text(
                _tipoUsuario ?? "Motorista",
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.grey
                ),
                ), 
              trailing: GestureDetector(
                onTap: (){
                  Navigator.push(context, MaterialPageRoute(
                    builder: (context) => const UserPerfil(),
                    )
                  );
                },
              child: Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(15)
                ),
                child: const Icon(Ionicons.chevron_forward_outline),
                ),
              ) ,
            ),
          
            const SizedBox(height: 30),
          
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text( 
            'Definições',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w500
            ),
            ),
            const SizedBox(height: 30),
                  
            DefinicaoItem(
            text: 'Idioma',
            bdColor: Colors.orange.shade100,
            iconColor: Colors.orange,
            icon: Ionicons.earth,
            onTap: (){},
            value: 'Portugues'),
            
            const SizedBox(height: 20),
            
            Setting_switch(
            text: 'Tema',
            bdColor: Colors.purple.shade100,
            iconColor: Colors.purple,
            icon: Ionicons.moon,
            value: isDarkMode,
            onTap: (value){
              setState(() {
              isDarkMode = value;
            });
            }),
            
            const SizedBox(height: 20),
            
            DefinicaoItem(
            text: 'Ajuda',
            bdColor: Colors.red.shade100,
            iconColor: Colors.red,
            icon: Ionicons.help,
            onTap: (){},
            ),

            const SizedBox(height: 20),
            
            DefinicaoItem(
            text: 'Sair',
            bdColor: Colors.blue.shade100,
            iconColor: Colors.white,
            icon: Ionicons.log_out,
            onTap: () async{
               await AuthManager.deleteToken();
               Navigator.pushReplacement(context, MaterialPageRoute(
                builder: (context) => const LoginScreen(),
                )
              );
            },
            ),
              ],
            )
            ],
           ),
        )
        ]
      ),
    );
  }

   Future<void> getMotorista() async {
    try {
    final foto = await AuthManager.getFoto();
    final nome = await AuthManager.getNome();
    final tipoUsuario = await AuthManager.getTipoUsuario();

    setState(() {
      _nome = nome;
      _tipoUsuario = tipoUsuario;
      _foto = foto;
    }); 

    } catch (e) {
      print('Erro ao buscar dados: $e ');
    }
  }
}

