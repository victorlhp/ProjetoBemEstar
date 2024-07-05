// TESTE 2

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Image } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link, useRouter } from 'expo-router';

// Firebase Configuration
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

GoogleSignin.configure({
  webClientId: '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', // ID do cliente da Web (obtido no Console do Google Cloud)
});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Verifique se o dispositivo suporta o Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Obtenha o ID do token do usuário
      const { idToken } = await GoogleSignin.signIn();

      // Crie uma credencial do Google com o token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Faça login com a credencial
      await auth().signInWithCredential(googleCredential);

      console.log('Login com o Google realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error.message);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Conta criada', 'Sua conta foi criada com sucesso!');
      router.push('/introducao'); // Navegar para a tela de introdução
    } catch (error) {
      Alert.alert('Erro na criação da conta', error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
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
