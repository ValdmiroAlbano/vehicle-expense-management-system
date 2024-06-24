import 'dart:async';
import 'package:app/src/auth/Login.dart';
import 'package:app/src/controllers/LoginController.dart';
import 'package:app/src/view/Home.dart';
import 'package:app/utils/globalColor.dart';
import 'package:flutter/material.dart';


class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 3), () {
      checkAuthStatus();
    });
    
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalColors.mainColor,
      body: Center(
        child: SizedBox(
          width: 100,
          height: 100,
          child: Image.asset('assets/images/logo.png'),
        ),
      ),
    );
  }

  void checkAuthStatus() async {
    final token = await AuthManager.getToken();
    if (token != null) {
      // O usuário está autenticado, continue para a tela principal
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const Home()),
      );
    } else {
      // O usuário não está autenticado, redirecione para a tela de login
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginScreen()),
      );
    }
  }
}
