import 'dart:async';
import 'dart:convert';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/controllers/config.dart';
import 'package:web_socket_channel/io.dart';
import 'package:geolocator/geolocator.dart';

class LocationUpdater {
  final String _serverUrl = 'ws://${Config.serverIpAddres}:3001';

  late Timer _timer;
  late IOWebSocketChannel _channel;

  LocationUpdater() {
    _timer = Timer.periodic(const Duration(seconds: 10), _sendLocationUpdate);
    _channel = IOWebSocketChannel.connect(_serverUrl);
  }

  void _sendLocationUpdate(Timer timer) async {
    try {
      Position position = await _posicaoAtual();

      String? contato = await AuthManager.getContacto();
      String? nome = await AuthManager.getNome();

      final userData = {
        'nome': nome,
        'contato': contato,
        'timestamp': DateTime.now().toIso8601String(),
        'latitude': position.latitude.toString(),
        'longitude': position.longitude.toString(),
      };
      print(userData);

      // Converter o mapa de dados em uma string JSON
      final jsonData = jsonEncode(userData);
      _channel.sink.add(jsonData);
    } catch (e) {
      print('Erro ao enviar atualização de localização: $e');
    }
  }

  void dispose() {
    _timer.cancel();
    _channel.sink.close();
  }

  Future<Position> _posicaoAtual() async {
    LocationPermission permissao;

    bool ativado = await Geolocator.isLocationServiceEnabled();
    if(!ativado){
      return Future.error('habilite a localização!');
    }

    permissao = await Geolocator.checkPermission();
    if(permissao == LocationPermission.denied){
      permissao = await Geolocator.requestPermission();
      if(permissao == LocationPermission.denied){
        return Future.error('Permissão negada!');
      }
    }

    if(permissao == LocationPermission.deniedForever){
      return Future.error('Permissão autorizar o acesso a localização!');
    }

    return await Geolocator.getCurrentPosition();
  }
}
