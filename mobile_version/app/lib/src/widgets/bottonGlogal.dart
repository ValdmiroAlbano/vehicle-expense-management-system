// ignore_for_file: file_names

import 'package:flutter/material.dart';
import 'package:app/utils/globalColor.dart';

class BtnGlobal extends StatelessWidget {
  const BtnGlobal({super.key, required this.text, required this.onTap, required this.tamanho});

  final String text;
  final VoidCallback onTap;
  final double tamanho;
  
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
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
              offset: const Offset(0, 1), // changes position of shadow
            ),
          ]
        ),
        child: Text(
          text,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w600, 
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}