import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EditItem extends StatelessWidget {
  const EditItem({
    super.key, required this.widget, required this.title,
  });

  final Widget widget;
  final String title;
  
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            color: Colors.grey,
          ),
        ),
          Container(
            child: widget,
        ),
       
      ],
    );
  }
}