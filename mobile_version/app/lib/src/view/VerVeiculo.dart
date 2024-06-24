import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';


class DetalhesVeiculos extends StatefulWidget {
  const DetalhesVeiculos({super.key});

  @override
  State<DetalhesVeiculos> createState() => _DetalhesVeiculosState();
}

class _DetalhesVeiculosState extends State<DetalhesVeiculos> {
  List items = [];

  @override
  void initState(){
    super.initState();
    detalhesVeiculos();
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: AppBar(
        leading: InkWell(
          onTap: (){
            Navigator.pop(context);
          },
          child: const Icon(
            Icons.arrow_back,
            size: 30),
        ),
        automaticallyImplyLeading: false,
        toolbarHeight: 80,
        centerTitle: true,
        title: const Text(
          'Detalhes',
          style: TextStyle(
            color: Colors.black,
            fontSize: 23,
            fontWeight: FontWeight.bold
            ),
          ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15),
        child: ListView.builder(
          itemCount: items.length,
          itemBuilder: (context, index){
            final item = items[index] as Map;
            final dataFornecida = item['DataUltimaManutencao'];
            final novaData = DateFormat('dd/MM/yyyy').format(DateTime.parse(dataFornecida));
            return  Column(
              children: [
        
                Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    const Text(
                      'Marca',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 25,
                        fontWeight: FontWeight.w600
                        )),
                    Text(
                      item['Marca'],
                      style: const TextStyle(
                        color: Colors.grey,
                        fontSize: 20,
                        fontWeight: FontWeight.w600
                      )),
                  ],
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      children: [
                        const Text(
                          'Ano',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                        Text(
                          item['Ano'].toString(),
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                      ]),
        
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text(
                            'Modelo',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.w600
                            ),
                            ),
                          Text(
                            item['Modelo'],
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                              fontWeight: FontWeight.w600
                            ),
                            ),
                      ]),
                     
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text(
                            'Matrícula',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                              fontWeight: FontWeight.w600
                            ),
                            ),
                          Text(
                            item['Placa'],
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 20,
                              fontWeight: FontWeight.w600
                            ),
                            ),
                        ]),
                    ]
                  ),   
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                        'Combustivel',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                            Text(
                              item['TipoCombustivel'],
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                                fontWeight: FontWeight.w600
                              ),
                              ),
                          ],
                        ),
                     
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                          'Tanque',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                            Text(
                              '${item['CapacidadeTanque'].toString()} L',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                                fontWeight: FontWeight.w600
                              ),
                              ),
                          ],
                        ),
                     
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                          'Nivel atual',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                            Text(
                              '${item['CombustivelAtual']} L',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                                fontWeight: FontWeight.w600
                              ),
                              ),
                          ],
                        )
                    ]
                  ),  
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                            const Text(
                          'Quilometragem',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                            Text(
                              '${item['QuilometragemAtual']} KM',
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                                fontWeight: FontWeight.w600
                              ),
                              ),
                          ],
                        ),
                     
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                          'Ult. Manutenção',
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 20,
                            fontWeight: FontWeight.w600
                          ),
                          ),
                            Text(
                              novaData,
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 20,
                                fontWeight: FontWeight.w600
                              ),
                              ),
                          ],
                        )
                    ]
                  ),
              
              ]);
            }
          ),
      ),
      );
  }
  Future<void> detalhesVeiculos() async{
    final userId = await AuthManager.getUserId();
    final urlVeiculos = Uri.parse('http://${Config.serverIpAddres}:3000/motorista/veiculos-atribuidos/$userId');
    final respostaVeiculo = await http.get(urlVeiculos);

    if (respostaVeiculo.statusCode == 200) {
      final veiculo = jsonDecode(respostaVeiculo.body) as List;

      if (veiculo.isNotEmpty) {
        final primeiroVeiculo = veiculo[0] as Map<String, dynamic>;
        final IdVeiculo = primeiroVeiculo['IDVeiculo'] as int;

        final url = Uri.parse('http://${Config
            .serverIpAddres}:3000/motorista/detalhes-veiculo/$IdVeiculo');
        final resposta = await http.get(url);

        if (resposta.statusCode == 200) {
          final json = jsonDecode(resposta.body);
          final result = json as List;

          setState(() {
            items = result;
          });
        }
      }
    } else {
          await AuthManager.saveIDVeiculo(0);
          print('O id do veiculo e: 0');
        }
      }
    }
