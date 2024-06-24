// ignore_for_file: file_names

import 'package:flutter/material.dart';

class TextFormGlobal extends StatelessWidget {
  const TextFormGlobal({
    Key? key,
    required this.text,
    required this.textInputType,
    required this.obscure,
    required this.icons, 
    required this.msgErro,
  }) : super(key: key);

  final String text;
  final TextInputType textInputType;
  final Icon icons;
  final bool obscure;
  final String msgErro;


  static const EdgeInsets _padding = EdgeInsets.only(top: 17, left: 15);
  static  final BoxShadow _boxShadow = BoxShadow(
    color: Colors.black.withOpacity(0.1),
    spreadRadius: 1,
    blurRadius: 1,
    offset: const Offset(0, 1), // changes position of shadow
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      padding: _padding,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(5),
        boxShadow: [_boxShadow],
      ),
      child: TextFormField(
        validator: (String? value) {
          if(value == null){
            return msgErro;
          }
          return null;
        },
        keyboardType: textInputType,
        obscureText: obscure,
        decoration: InputDecoration(
          prefixIcon: Padding(
            padding: const EdgeInsets.only(bottom: 7),
            child: icons,
          ),
          hintText: text,
          hintStyle: const TextStyle(
            color: Colors.black,
            fontSize: 15,
            fontWeight: FontWeight.w600,
          ),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.all(0),
        ),
      ),
    );
  }
}
