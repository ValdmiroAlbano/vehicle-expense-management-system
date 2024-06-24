import 'dart:convert';
import 'dart:io';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/src/view/Home.dart';
import 'package:app/src/view/UserPerfil.dart';
import 'package:app/src/widgets/Lista.dart';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class Historicos extends StatefulWidget {
  const Historicos({Key? key}) : super(key: key);

  @override
  State<Historicos> createState() => _HistoricosState();
}

class _HistoricosState extends State<Historicos> {
  bool logado = true;
  List abastecimentos = [];
  List reclamacoes = [];
  String? foto;
  bool notificacaoEnviada = false;

  @override
  void initState() {
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    List historicos = [];
    historicos.addAll(abastecimentos);
    historicos.addAll(reclamacoes);

    return Scaffold(
      appBar: AppBar(
        title:const Text(
            'Historicos',
            style: TextStyle(
              color: Colors.black,
              fontSize: 23,
              fontWeight: FontWeight.bold,
            ),
          ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        toolbarHeight: 80,
        actions: <Widget> [
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
              ?const Center(child: CircularProgressIndicator(),)
                : historicos.isEmpty
                    ? const Center(
                        child: Text(
                          'Sem registros',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      )
                    : ListView.builder(
                        itemCount: historicos.length,
                        itemBuilder: (context, index) {
                          final item = historicos[index] as Map;
                          final tipo = item['tipo'];
                          final data = item['_data'];
                          final dataFormatada = DateFormat('dd/MM/yyyy').format(DateTime.parse(data));
                          IconData icon = Icons.error;
                          Color color = Colors.grey;
                
                          if (tipo == 'Abastecimento') {
                            icon = Icons.local_gas_station;
                            color = Colors.red;
                          } else if (tipo == 'Reclamação') {
                            icon = Icons.car_crash;
                            color = Colors.blue;
                          }
                
                          return HistoricoLista(
                            textTitle: tipo,
                            textSubtitle: dataFormatada,
                            icon: icon,
                            cors: color,
                            caminho: () {
                              final route = MaterialPageRoute(builder: (context) => const Home());
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



  Future<void> getData() async {
    try {
      foto = await AuthManager.getFoto();
      final userId = await AuthManager.getUserId();

      final abastecimentoUrl = Uri.parse('http://${Config.serverIpAddres}:3000/abastecimentos/despesas/$userId');
      final response = await http.get(abastecimentoUrl);

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        final result = json as List;
        
        setState(() {
          abastecimentos = result;
        });
      }

      final reclamacoesUrl = Uri.parse('http://${Config.serverIpAddres}:3000/motorista/reclamacoes/$userId');
      final responseReclamacoes = await http.get(reclamacoesUrl);

      if (responseReclamacoes.statusCode == 200) {
        final json = jsonDecode(responseReclamacoes.body);
        final result = json as List;

        setState(() {
          reclamacoes = result;
        });
      }

      setState(() {
        logado = false;
      });
    } catch (e) {
      print('Erro ao buscar dados: $e ');
    }
  }



}
