// PRINCIPAL

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'react-native';
import { Button } from 'react-native-paper'
import { Link, useRouter } from 'expo-router';
import { auth } from './firebaseConfig'; // Importe a instância do auth inicializada
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  // Verifica se o Firebase já está inicializado
  if (!firebase.apps.length) {
    // Inicializa o Firebase
    firebase.initializeApp(App);
  }

  return (
    <View>
      <Text>Firebase Configurado!</Text>
    </View>
  );
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Configurar o provedor de autenticação do Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "123743475693-469jbmsbpq8nn59ob35nl1cqfdj1mqhs.apps.googleusercontent.com", // Substitua pelo seu Client ID do Google
  });

  

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setLoading(true);
        console.log('Login realizado com sucesso!', userCredential.user);
        router.replace('/inicio');
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao fazer login', error);
        setLoading(false);
      });
  };

  const handleCreateAccount = () => {
  };

  const handleForgotPassword = () => {
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Alternar entre mostrar e ocultar a senha
  };

  return (
    <ScrollView style={styles.container}>
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

    <View style={styles.buttonContainer}>
      <Button
        mode="contained" // Define o estilo do botão
        onPress={handleLogin}
        loading={loading} 
        disabled={loading}
        contentStyle={styles.buttonContent} // Estilo para o conteúdo do botão
        labelStyle={styles.text} // Estilo para o texto do botão
      >
        Login
      </Button>
    </View>

      

      <Pressable style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Link href="criacaoConta" asChild>
          <Text style={styles.createAccountButtonText}>Criar conta</Text>
        </Link>
      </Pressable>

      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
      <Link href="recuperarConta" asChild>
        <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
        </Link>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#CCCCFF',
    width: '100%',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  buttonContainer: {
    marginHorizontal: 0,
  },

  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6666ff',
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  googleButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 62,
    backgroundColor: '#6666ff',
    margin: 10,
    
},

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ebebff',
    
  },

  passwordInputContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#ebebff',
    justifyContent: 'space-between',
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 35,
  },

  showPasswordButton: {
    padding: 0,
  },

  showPasswordButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  forgotPasswordButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  createAccountButton: {
    marginTop: 20,
  },

  createAccountButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default LoginScreen;
