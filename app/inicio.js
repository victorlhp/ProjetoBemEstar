import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CapturarNome = () => {
  const [nome, setNome] = useState('');
  
  const router = useRouter();

  const salvarNome = async () => {
    try {
      await AsyncStorage.setItem('nomeUsuario', nome);
      router.replace('/introducao'); // Substitua '/telaSeguinte' pelo caminho da próxima tela
    } catch (error) {
      console.error('Erro ao salvar nome:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./../assets/logoBemEstar.png')}
      style={styles.container}
      imageStyle={{ opacity: 0.2 }}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Digite seu nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
        <Button mode="contained" onPress={salvarNome} style={styles.button}>
          Avançar
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: '#ebebff',
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#9ed9', // Cor do botão
  },
});

export default CapturarNome;
