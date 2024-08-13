import React, { useState } from 'react';
import { View, TextInput, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from './firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 

const AtualizarPerfil = () => {
  const user = auth.currentUser;
  const [nomeExibicao, setNomeExibicao] = useState(user.displayName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAtualizarPerfil = async () => {
      try {
          setLoading(true);
          await updateProfile(user, { displayName: nomeExibicao });
          await setDoc(doc(db, "usuarios", user.uid), {
              nomeExibicao: nomeExibicao
          });
          setLoading(false);
          router.replace('/introducao');
      } catch (error) {
          console.error(error.code);
          console.error(error.message);
          setLoading(false);
      }
  }

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
        value={nomeExibicao}
        onChangeText={setNomeExibicao}
        placeholder="Digite seu nome"
        placeholderTextColor="#000"
      />
      <Button mode="contained" onPress={handleAtualizarPerfil} loading={loading} style={styles.button}>
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

export default AtualizarPerfil;
