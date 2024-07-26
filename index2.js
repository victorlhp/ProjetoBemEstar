// PRINCIPAL

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ScrollView, Pressable } from 'react-native';
import { Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { auth } from './firebaseConfig'; // Importe a instância do auth inicializada
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app } from './firebaseConfig'


const LoginScreen = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const router = useRouter();
// Estado para controlar a visibilidade da senha

// Configurar o provedor de autenticação do Google
const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  clientId: "1:123743475693:web:36043abf2701a929eff9e4", // Substitua pelo seu Client ID do Google
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
    // Aqui você pode adicionar a lógica para criar uma conta
  };

  const handleForgotPassword = () => {
    // Aqui você pode adicionar a lógica para recuperar a senha
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

        <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#ddd' : '#2196F3'
        },
        styles.button
      ]}
      onPress={() => {
        fazerLogin(email, password, router);
      }}
    >
      <Text style={styles.text}>Login</Text>
    </Pressable>

    <Button title="Login" style={styles.button} onPress={handleLogin} />

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
        <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      
      
    </ScrollView>
  );
};

const fazerLogin = (email, password, router) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(email, password);
      // Signed in 
      
      const user = userCredential.user;
      console.log(user);
      console.log('Login realizado com sucesso!');
      router.replace ('/introducao');
      // ...
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Usuário não existe!');
      console.log(errorCode);
      console.log(errorMessage);
    });  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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


  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    
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
    fontWeight: 'condensedBold',
    fontStyle:'italic'
  },
  googleButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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