import 'package:flutter/material.dart';

  class HistoricoLista extends StatelessWidget {
  const HistoricoLista({ super.key, required this.textTitle, required this.textSubtitle, required this.icon, required this.cors, required this.caminho,  });

  final String textTitle;
  final String textSubtitle;
  final IconData icon;
  final Color cors;
  final Function() caminho;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16)
        ) ,
        child:  ListTile(
          onTap: caminho,
          leading: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Container(
              padding: const EdgeInsets.all(16),
              color: cors,
              child: Icon(
                icon,
                color: Colors.white,
                )
              ),
          ),
          title:  Text(
            textTitle,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16),
            ),
          subtitle:  Text(
            textSubtitle,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.grey,
              fontSize: 14),
            ),
            trailing: PopupMenuButton(
              onSelected: (value) {
                if(value == 'apagar'){
                  //apagar abastecimento
                }
              },
              itemBuilder: (context){
              return [
                 const PopupMenuItem(value: 'apagar',child: Text('apagar'),
                 ) ,
              ];
            }) 
          ),
      ),
    );
  }
}

