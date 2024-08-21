import React, { useState } from 'react';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Certifique-se de que o caminho esteja correto

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Sucesso', 'Email de recuperação de senha enviado!');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Erro', 'Email não cadastrado.');
        } else {
          Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logoBackground}
        resizeMode="contain"
      />
      <View style={styles.formContainer}>
        <Text style={styles.instructions}>E-mail de Recuperação:</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Enviar Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    width: '120%',
    aspectRatio: 2,
    justifyContent: 'center',
    alignItems: 'center',
    right: 45,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'left',
    fontFamily: 'Inder_400Regular',
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
    fontFamily: 'Inder_400Regular',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
    height: 62,
    right: 10,
    backgroundColor: '#6666ff',
    borderRadius: 5,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inder_400Regular',
    textAlign: 'center',
  },
});

export default PasswordReset;
