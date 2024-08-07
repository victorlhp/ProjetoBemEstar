// PRINCIPAL

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { auth } from './firebaseConfig'; // Importe a instância do auth inicializada
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Configurar o provedor de autenticação do Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "123743475693-469jbmsbpq8nn59ob35nl1cqfdj1mqhs.apps.googleusercontent.com", // Substitua pelo seu Client ID do Google
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          console.log('Login realizado com sucesso!', userCredential.user);
          router.replace('/introducao');
        })
        .catch(error => {
          console.error('Erro de login com Google', error);
        });
    }
  }, [response]);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Login realizado com sucesso!', userCredential.user);
        router.replace('/introducao');
      })
      .catch(error => {
        console.error('Erro ao fazer login', error);
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

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#ddd' : '#2196F3'
          },
          styles.button
        ]}
        onPress={handleLogin} // Use handleLogin diretamente
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>

      {/* Botão de Login com Google */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Login com Google</Text>
      </TouchableOpacity>

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
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
    height: 62,
    backgroundColor: '#6666ff',
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
    padding: 10,
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
