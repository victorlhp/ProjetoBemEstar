import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Link } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  const handleLogin = () => {
    // Lógica de login aqui
  };

  const handleCreateAccount = () => {
    // Aqui você pode adicionar a lógica para criar uma conta
  };

  const handleForgotPassword = () => {
    // Aqui você pode adicionar a lógica para recuperar a senha
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Alternar entre mostrar e ocultar a senha
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
  <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
</View>

      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Ocultar a senha se showPassword for false
        />
        {/* Botão para alternar a visibilidade da senha */}
        <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
          <Text style={styles.showPasswordButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Link href="introducao" asChild>
        <Text style={styles.buttonText}>Login</Text>
        </Link>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
      <Link href="criacaoConta" asChild>
      <Text style={styles.createAccountButtonText}>Criar conta</Text>
      </Link>
        
        
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#CCCCFF',
  },
  
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordButtonText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPasswordButtonText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  createAccountButton: {
    marginTop: 10,
  },
  createAccountButtonText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
