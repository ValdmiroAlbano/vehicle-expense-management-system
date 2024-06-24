import 'dart:convert';
import 'package:app/src/controllers/config.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:web_socket_channel/io.dart';
import '../controllers/postosController.dart';

class MapaPosto extends StatefulWidget {
  const MapaPosto({Key? key}) : super(key: key);

  @override
  State<MapaPosto> createState() => _MapaPostoState();
}

class _MapaPostoState extends State<MapaPosto> {
  final IOWebSocketChannel channel = IOWebSocketChannel.connect('ws://${Config.serverIpAddres}:3001');

  @override
  Widget build(BuildContext context) {
    final local = context.watch<postosController>();
    // ignore: unnecessary_null_comparison
    if (local.lat != null && local.long != null) {
      // Enviar os dados de geolocalização ao servidor WebSocket
      Map<String, dynamic> locationData = {
        'latitude': local.lat,
        'longitude': local.long,
      };
      channel.sink.add(jsonEncode(locationData));
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Meu local'),
        centerTitle: true,
        backgroundColor: Colors.blueGrey,
        elevation: 0.5,
      ),
      body: Center(
        child: local.erro == ''
            ? Text('Latitude: ${local.lat} | Longitude: ${local.long}')
            : Text(local.erro),
      ),
    );
  }

  @override
  void dispose() {
    channel.sink.close();
    super.dispose();
  }
}
