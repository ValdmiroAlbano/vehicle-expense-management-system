import 'package:app/src/auth/Splash_Screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:app/src/controllers/postosController.dart';

void main() {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => postosController()),
        // Adicione outros provedores, se necessário
      ],
      child: const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: SplashScreen(),
      ),
    );
  }
}
