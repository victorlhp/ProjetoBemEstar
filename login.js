// app/login.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebase';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1:123743475693:android:e65a40511829123743475693-469jbmsbpq8nn59ob35nl1cqfdj1mqhs.apps.googleusercontent.comcecbeff9e4', // Substitua pelo seu clientId do Google
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Lógica de login aqui
  };

  const handleCreateAccount = () => {
    // Lógica para criar uma conta
  };

  const handleForgotPassword = () => {
    // Lógica para recuperar a senha
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
      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.googleButtonText}>Login com Google</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
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
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
