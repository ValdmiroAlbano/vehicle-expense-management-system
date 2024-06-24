import 'package:flutter/cupertino.dart';
import 'package:geolocator/geolocator.dart';

class postosController extends ChangeNotifier {
  double lat = 0.0;
  double long = 0.0;
  String erro = "";

  postosController(){
    
    getPosicao();
  }

  getPosicao() async {
    try{
      Position position = await _posicaoAtual();
      lat = position.latitude;
      long = position.longitude;
      notifyListeners();
    } catch(e){
      erro = e.toString();
      notifyListeners();
    }
  }

  Future<Position> _posicaoAtual() async{
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