import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/src/view/UserPerfil.dart';
import 'package:app/src/view/VerVeiculo.dart';
import 'package:app/src/widgets/Lista.dart';


class Veiculo extends StatefulWidget {
  const Veiculo({Key? key});

  @override
  State<Veiculo> createState() => _VeiculoState();
}

class _VeiculoState extends State<Veiculo> {
  List items = []; 
  bool logado = true;
  String? foto;

  @override
  void initState() {
    super.initState();
    listarVeiculoAtribuido();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
            'Veiculos',
            style: TextStyle(
              color: Colors.black,
              fontSize: 23,
              fontWeight: FontWeight.bold,
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
                shape: BoxShape.circle,
              ),
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
      body: Column(
        children: [
          Expanded(
            child: Container(
              color: Colors.grey[200],
              child: logado 
              ?const Center(child: CircularProgressIndicator())
              : items.isEmpty
                    ? const Center(
                        child: Text(
                          'Sem nenhum veículo atribuído',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      )
                    : ListView.builder(
                        itemCount: items.length,
                        itemBuilder: (context, index) {
                          final item = items[index] as Map;
                          return HistoricoLista(
                            textTitle: item['Marca'],
                            textSubtitle: item['Modelo'],
                            icon: Icons.directions_car_filled,
                            cors: Colors.green,
                            caminho: () {
                              final route = MaterialPageRoute(
                                builder: (context) => const DetalhesVeiculos(),
                              );
                              Navigator.push(context, route);
                            },
                          );
                        },
                      ),
              ),
            ),
        ],
      ),
    );
  }

  Future<void> listarVeiculoAtribuido() async {
    try {
    foto = await AuthManager.getFoto();
    final userId = await AuthManager.getUserId();
    final url = Uri.parse('http://${Config.serverIpAddres}:3000/motorista/veiculos-atribuidos/$userId');
    final resposta = await http.get(url);

    if (resposta.statusCode == 200) {
      final json = jsonDecode(resposta.body);
      final getData = json[0] as Map<String, dynamic>;
      final idVeiculo = getData['IDVeiculo'] as int;
      final placa = getData['Placa'];
      await AuthManager.saveIDVeiculo(idVeiculo);
      await AuthManager.salvarPlaca(placa);
      final result = json as List;

      setState(() {
        items = result;
      });

      setState(() {
        logado = false;
      });

    }
    
    } catch (e) {
      print('Erro ao buscar dados: $e ');
    }
  }
}
