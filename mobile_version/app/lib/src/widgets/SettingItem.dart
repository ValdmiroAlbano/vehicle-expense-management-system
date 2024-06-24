import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:ionicons/ionicons.dart';

class DefinicaoItem extends StatelessWidget {
  const DefinicaoItem({
    super.key, required this.text, required this.bdColor, required this.iconColor, required this.icon, required this.onTap,  this.value,
  });
  final String text;
  final Color bdColor;
  final Color iconColor;
  final IconData icon;
  final String? value;
  final Function() onTap;

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
           value != null ? Text(
             value!,
             style: const TextStyle(
               fontSize: 16,
               fontWeight: FontWeight.bold,
               color: Colors.grey
             ),
             ): const SizedBox(),

           const SizedBox(width: 20),
           GestureDetector(
            onTap: onTap,
             child: Container(
             width: 60,
             height: 60,
             decoration: BoxDecoration(
               color: Colors.grey[200],
               borderRadius: BorderRadius.circular(15)
             ),
             child: const Icon(Ionicons.chevron_forward_outline),
                    ),
           ) ,
         ]
       ),
              );
  }
}