import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Setting_switch extends StatelessWidget {
  const Setting_switch({super.key, required this.text, required this.bdColor, required this.iconColor, required this.icon, required this.value, required this.onTap});

  final String text;
  final Color bdColor;
  final Color iconColor;
  final IconData icon;
  final bool value;
  final Function(bool value) onTap;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
       width: double.infinity,
       child: Row(
         children: [
           Container(
             width: 60,
             height: 60,
             decoration: BoxDecoration(
               shape: BoxShape.circle,
               color: bdColor
             ),
             child: Icon(
               icon,
               size: 30,
               color: iconColor,
               ),
           ),
           const SizedBox(width: 10),
          Text(
             text,
             style: const TextStyle(
               fontSize: 20,
               fontWeight: FontWeight.bold
             ),
           ),
           const Spacer(),
          Text(
            value 
            ? "ON":"Off",
              style: const TextStyle(
              fontSize: 16,
               fontWeight: FontWeight.bold,
               color: Colors.grey
              ),
             ),
           const SizedBox(width: 20),
           CupertinoSwitch(value: value, onChanged: onTap)
         ]
       ),
     );
  }
}