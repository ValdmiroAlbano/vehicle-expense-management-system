import 'package:flutter/material.dart';

class Sem extends StatelessWidget {
  const Sem({ super.key, required this.texto });

  final String texto;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18.0),
      color: const Color(0xFFE7E7E7),
      child: Text(
        texto == ' ' ? 'Clique no + e registre seu primeiro abastecimento.' : texto,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 20,
          fontWeight: FontWeight.w500
        ),
      ),
    );
  }
}