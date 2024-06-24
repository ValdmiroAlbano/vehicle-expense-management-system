// ignore_for_file: file_names
import 'dart:convert';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:app/src/view/Home.dart';
import 'package:app/utils/globalColor.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:ionicons/ionicons.dart';



class Abastecimento extends StatefulWidget {
  const Abastecimento({super.key});

  @override
  State<Abastecimento> createState() => _AbastecimentoState();
}

class _AbastecimentoState extends State<Abastecimento> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final dropValue = ValueNotifier('');
  final dropOpcoes = ['Gasolina', 'Diesel'];
  TextEditingController precoController = TextEditingController();
  TextEditingController postoController = TextEditingController();
  TextEditingController litroController = TextEditingController();
  TextEditingController enderecoController = TextEditingController();
  int? veiculoID;
  String buttonText = 'Sem ficheiro';
  String? comprovativoPath;


  @override
  void initState() {
    super.initState();
    getIDVeiculo();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text(
          'Abastecimento',
          style: TextStyle(
              fontSize: 25,
              color: Colors.black,
              fontWeight: FontWeight.w500
          ),
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.push(
                context, MaterialPageRoute(builder: (context) => const Home()));
          },
          icon: const Icon(Ionicons.chevron_back_outline),
        ),
        leadingWidth: 70,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(left: 10),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 45),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Poste',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(
                          height: 60,
                          width: 170,
                          child: TextFormField(
                            controller: postoController,
                            keyboardType: TextInputType.text,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.local_gas_station),
                              hintText: 'Posto',
                              hintStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Campo Obrigatório';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),

                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Endereço',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(
                          height: 60,
                          width: 170,
                          child: TextFormField(
                            controller: enderecoController,
                            keyboardType: TextInputType.text,
                            decoration: const InputDecoration(
                              prefixIcon: Padding(
                                padding: EdgeInsets.only(bottom: 7),
                                child: Icon(Icons.map_outlined),
                              ),
                              hintText: 'Endereço',
                              hintStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Campo Obrigatório';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Litros',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        Container(
                          height: 60,
                          width: 170,
                          padding: const EdgeInsets.only(top: 5),
                          child: TextFormField(
                            controller: litroController,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              hintText: 'Litros',
                              hintStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Campo Obrigatório';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),

                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Preço',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        Container(
                          height: 60,
                          width: 170,
                          padding: const EdgeInsets.only(top: 7),
                          child: TextFormField(
                            controller: precoController,
                            keyboardType: TextInputType.number,
                            decoration: const InputDecoration(
                              prefixIcon: Icon(Icons.price_change),
                              hintText: 'preço',
                              hintStyle: TextStyle(
                                color: Colors.black,
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),

                            ),
                            validator: (value) {
                              if (value!.isEmpty) {
                                return 'Campo Obrigatório';
                              }
                              return null;
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Tipo de Combustivel',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 20),
                        ValueListenableBuilder(
                            valueListenable: dropValue,
                            builder: (BuildContext context, String value, _) {
                              return SizedBox(
                                width: 340,
                                height: 70,
                                child: DropdownButtonFormField(
                                  isExpanded: true,
                                  hint: const Text('Seleciona o combustivel'),
                                  value: (value.isEmpty) ? null : value,
                                  onChanged: (escolha) =>
                                  dropValue.value = escolha.toString(),
                                  items: dropOpcoes
                                      .map(
                                          (op) =>
                                          DropdownMenuItem(
                                            value: op,
                                            child: Text(op),
                                          )
                                  )
                                      .toList(),
                                ),
                              );
                            }),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                const SizedBox(height: 40),
                Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: InkWell(
                    onTap: () async {
                      final userId = await AuthManager.getUserId();
                      cadastrar(userId, veiculoID);
                    },
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
                              offset: const Offset(
                                  0, 1), // changes position of shadow
                            ),
                          ]
                      ),
                      child: const Text(
                        'Cadastrar',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 18,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> getIDVeiculo() async {
    final userId = await AuthManager.getUserId();
    final urlVeiculos = Uri.parse('http://${Config
        .serverIpAddres}:3000/motorista/veiculos-atribuidos/$userId');
    final respostaVeiculo = await http.get(urlVeiculos);

    if (respostaVeiculo.statusCode == 200) {
      final veiculo = jsonDecode(respostaVeiculo.body) as List;

      if (veiculo.isNotEmpty) {
        final primeiroVeiculo = veiculo[0] as Map<String, dynamic>;
        final idVeiculo = primeiroVeiculo['IDVeiculo'] as int;
        setState(() {
          veiculoID = idVeiculo;
        });
      }
      else {
        await AuthManager.saveIDVeiculo(0);
        print('O id do veiculo e: 0');
      }
    } else {
      print(respostaVeiculo.statusCode);
    }
  }

  // Função para cadastrar os dados no servidor
  Future<void> cadastrar(int? userId, int? idVeiculo) async {
    if (_formKey.currentState!.validate()) {
      final posto = postoController.text;
      final endereco = enderecoController.text;
      final tipoConbustivel = dropValue.value.toString();
      final litros = litroController.text;
      final preco = precoController.text;

      if (idVeiculo == 0 || idVeiculo == null) {
        print('O Id do veiculo e: $idVeiculo');
        return showDialog(
          context: context,
          builder: (context) => SimpleDialog(
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
              TextButton(
                onPressed: () {
                  postoController.text = "";
                  enderecoController.text = "";
                  dropValue.value = '';
                  litroController.text = "";
                  precoController.text = "";
                  Navigator.of(context).pop();
                },
                child: const Text('Fechar'),
              )
            ],
          ),
        );
      }

      final body = {
          'postoNome': posto,
          'endereco': endereco,
          'tipoCombustivel': tipoConbustivel,
          'litrosAbastecidos': litros,
          'custo': preco,
          'id_veiculo': idVeiculo,
          'id_motorista': userId
        };

        try {

          final url = Uri.parse('http://${Config.serverIpAddres}:3000/motorista/registrar-despesa');
          final response = await http.post(url, body: jsonEncode(body),
              headers: {'Content-Type': 'application/json'}
          );

          if (response.statusCode == 200) {
            postoController.clear();
            enderecoController.clear();
            litroController.clear();
            precoController.clear();
            dropValue.value = '';
            registroBemSucessido('Registrado com sucesso!');
          } else {
            registroErro('Erro no registro!');
          }
        } catch (e) {
          registroErro('Erro na conexão com o servidor!');
        }
    }
  }


  // Função para exibir mensagem de sucesso
  void registroBemSucessido(String message) {
    final snackBar = SnackBar(
      content: Text(
        message,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.green[600],
      duration: const Duration(seconds: 2),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  // Função para exibir mensagem de erro
  void registroErro(String message) {
    final snackBar = SnackBar(
      content: Text(
        message,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.red[600],
      duration: const Duration(seconds: 2),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}