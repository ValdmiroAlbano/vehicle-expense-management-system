// ignore_for_file: file_names
import 'dart:async';

import 'package:app/src/controllers/Localizacao.dart';
import 'package:flutter/material.dart';
import 'package:app/src/view/Abastecimento.dart';
import 'package:app/src/view/Historico.dart';
import 'package:app/src/view/Report.dart';
import 'package:app/src/view/Setting.dart';
import 'package:app/src/view/Veiculo.dart';
import 'package:app/utils/globalColor.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _Hometate();
}

class _Hometate extends State<Home> {
  late LocationUpdater locationUpdater;
  
  int currentTab = 0;
  final List<Widget> screen =[
    const Historicos(),
    const Report(),
    const Setting(),
    const Veiculo(),
    const Abastecimento(),
  ]; 

  final PageStorageBucket bucket = PageStorageBucket();
  Widget currentScreen = const Historicos();
  List items = []; 

  @override
  void initState(){
    super.initState();
    Timer(const Duration(seconds: 5), () {
      locationUpdater = LocationUpdater();
    });

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: PageStorage(
        bucket: bucket,
        child: currentScreen,
      ),
      floatingActionButton: FloatingActionButton(
        isExtended:true,
        backgroundColor: GlobalColors.mainColor,
        shape: const CircleBorder(),
        child:  const Icon(
          Icons.add,
          color: Colors.white,
          size: 25,
          ),
        onPressed: (){
          showModalBottomSheet(
            context: context,
             builder: (BuildContext context) {
               return SizedBox(
                height: 140,
                width: double.infinity,
                child: ElevatedButton(
                  child:  Column(
                    children: [
                      const SizedBox(height: 20),
                      
                      InkWell(
                        onTap: (){
                        setState(() {
                         Navigator.push(context, MaterialPageRoute(
                        builder: (context) => const Abastecimento(),
                        )
                      );
                        });
                        },
                        child: const SizedBox(
                          width: double.infinity,
                          child: Text(
                            'Abastecimento',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 25
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: double.infinity,
                        child: Container(
                          color: Colors.grey,
                          height: 2,
                        ),
                      ),

                      const SizedBox(height: 20),
                      InkWell(
                        onTap: (){
                        setState(() {
                        Navigator.pop(context);
                      });
                        },
                        child: const SizedBox(
                          width: double.infinity,
                          child: Text(
                            'Cancelar',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 25
                            ),
                          ),
                        ),
                      ),
                     
                    ],
                  ),
                  onPressed: (){
                    Navigator.pop(context);
                  },
                  ),
               );
             },
            );
        },
        
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        bottomNavigationBar: BottomAppBar(
          height: 60,
          color: GlobalColors.textColor,
          shape: const CircularNotchedRectangle(),
          notchMargin: 7,
          child: Row(
           mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [

              MaterialButton(
                minWidth: 40,
                onPressed: (){
                  setState(() {
                    currentScreen = const Historicos();
                    currentTab = 0;
                  });
                },
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.history_outlined,
                      size: 30,
                      color: currentTab == 0 ? Colors.blue : Colors.white,
                    ),     
                  ],
                ),
                ),
              
              MaterialButton(
                minWidth: 40,
                onPressed: (){
                  setState(() {
                    currentScreen = const Veiculo();
                    currentTab = 1;
                  });
                },
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      size: 30,
                      Icons.directions_car_filled_outlined,
                      color: currentTab == 1 ? Colors.blue : Colors.white,
                    ),
                  ],
                ),
                ),

              const SizedBox(),
          
              MaterialButton(
                minWidth: 40,
                onPressed: () async{
                  setState(() {
                    currentScreen = const Report();
                    currentTab = 2;
                  });
                },
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      size: 30,
                      Icons.car_crash_outlined,
                      color: currentTab == 2 ? Colors.blue : Colors.white,
                    ),
                  ],
                ),
                ),
          
              MaterialButton(
                minWidth: 40,
                onPressed: (){
                  setState(() {
                    currentScreen = const Setting();
                    currentTab = 3;
                  });
                },
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      size: 30,
                      Icons.settings_outlined,
                      color: currentTab == 3 ? Colors.blue : Colors.white,
                    ),
                  ],
                ),
                )
            ],
          ),
        ),
    );
  }
  
  @override
  void dispose() {
    locationUpdater.dispose(); // Encerramento da instância LocationUpdater
    super.dispose();
  }
}