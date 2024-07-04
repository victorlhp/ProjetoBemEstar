// TESTE 1

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import { initializeApp } from "firebase/app";
import { Link, useRouter } from 'expo-router';

const firebaseConfig = {
    apiKey: "AIzaSyAHO7rhIrfypj-x27HetVym-08K9YmE22U",
    authDomain: "bem-estar-3fb2c.firebaseapp.com",
    databaseURL: "https://bem-estar-3fb2c-default-rtdb.firebaseio.com",
    projectId: "bem-estar-3fb2c",
    storageBucket: "bem-estar-3fb2c.appspot.com",
    messagingSenderId: "123743475693",
    appId: "1:123743475693:web:36043abf2701a929eff9e4",
    measurementId: "G-NFR3GLN5R7"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth();

// Vincular a função ao formulário de criação de usuário
document.getElementById("createUserForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    // Obter o e-mail e a senha do usuário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        // Criar um novo usuário com e-mail e senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Usuário criado com sucesso
        const user = userCredential.user;
        alert("Usuário criado com sucesso!");
    } catch (error) {
        // Erro ao criar o usuário
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Erro ao criar o usuário: " + errorMessage);
    }
});


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Hook para navegação

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Login bem-sucedido', 'Você está logado!');
      router.push('/introducao'); // Navegar para a tela de introdução
    } catch (error) {
      Alert.alert('Erro de login', error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Conta criada', 'Sua conta foi criada com sucesso!');
      router.push('/introducao'); // Navegar para a tela de introdução
    } catch (error) {
      Alert.alert('Erro na criação da conta', error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Email enviado', 'Verifique seu email para redefinir a senha.');
    } catch (error) {
      Alert.alert('Erro na recuperação de senha', error.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.showPasswordButton} onPress={toggleShowPassword}>
          <Text style={styles.showPasswordButtonText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Link href="introducao" asChild></Link>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Link href="criacaoConta" as Child></Link>
        <Text style={styles.createAccountButtonText}>Criar conta</Text>
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
