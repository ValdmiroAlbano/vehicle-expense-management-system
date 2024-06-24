import 'package:shared_preferences/shared_preferences.dart';

class AuthManager {
  static const _tokenKey = 'usuario_token';
  static const _keyNome = 'usuario_nome';
  static const _keyEmail = 'usuario_email';
  static const _keyContacto = 'usuario_contato';
  static const _keytipoUsuario = 'usuario_tipo';
  static const _keyUserId = 'user_id';
  static const _Keyfoto = 'usuario_foto';
  static const _keyIdVeiculo = 'id_veiculo';
  static const _keyPlacaVeiculo = 'veiculo_placa';


//Guardar dAdos do usuario

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  static Future<String?> getFoto() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_Keyfoto);
  }

  static Future<String?> getNome() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyNome);
  }

  static Future<String?> getEmail() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyEmail);
  }
  
  static Future<String?> getContacto() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyContacto);
  }

  static Future<String?> getTipoUsuario() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keytipoUsuario);
  }

  static Future<int?> getUserId() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_keyUserId);
  }

  static Future<int?> getIDVeiculo() async{
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_keyIdVeiculo);
  }

  static Future<String?> getPlacaVeiculo() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyPlacaVeiculo);
  }

  //Salvar os dados do usuario;
  static Future<void> saveNome(String nome) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_keyNome, nome);
  }

  static Future<void> saveEmail(String email) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_keyEmail, email);
  }

  static Future<void> saveContato(String contacto) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_keyContacto, contacto);
  }

  static Future<void> saveTipoUsuario(String tipoUsuario) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_keytipoUsuario, tipoUsuario);
  }

  static Future<void> saveUserId(int userId) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setInt(_keyUserId, userId);
  }

  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_tokenKey, token);
  }
//Salve Veiculo
  static Future<void> saveIDVeiculo(int idVeiculo) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setInt(_keyIdVeiculo, idVeiculo);
  }

  static Future<void> salvarPlaca(String placa) async {
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_keyPlacaVeiculo, placa);
  }

  //Salve Imagem
  static Future<void> seveFoto(String imagepath) async{
    final prefs = await SharedPreferences.getInstance();
    prefs.setString(_Keyfoto, imagepath);
  }

  Future<void> removeImagePath() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('imagePath');
  }

//delete token
  static Future<void> deleteToken() async {
    final prefs = await SharedPreferences.getInstance();
    prefs.remove(_tokenKey);
  }

}

/*

void login(String token) async {
  await AuthManager.saveToken(token);
}

void logout() async {
  await AuthManager.deleteToken();
}

void checkAuthStatus() async {
  final token = await AuthManager.getToken();
  if (token != null) {
    // O usuário está autenticado, continue para a tela principal
  } else {
    // O usuário não está autenticado, redirecione para a tela de login
  }
}
*/