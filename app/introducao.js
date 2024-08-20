import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from './firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 

const TelaPersonalizada = () => {
  // const [nomeUsuario, setNomeUsuario] = useState('');
  const user = auth.currentUser;
  const [nomeExibicao, setNomeExibicao] = useState(user.displayName);
  const [loading, setLoading] = useState(false);
  
  

  useEffect(() => {
    const recuperarNome = async () => {
      try {
        setLoading(true);
        await updateProfile(user, { displayName: nomeExibicao });
        await setDoc(doc(db, "usuarios", user.uid), {
            nomeExibicao: nomeExibicao
        });
        setLoading(false);
        
    } catch (error) {
        console.error(error.code);
        console.error(error.message);
        setLoading(false);
    }
    };

    recuperarNome();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logomarca ao fundo com efeito de marca d'água */}
      <View style={styles.text}>
        <ImageBackground
          source={require('./../assets/logoBemEstar.png')}
          style={styles.logoBackground}
          imageStyle={{ opacity: 0.2 }}
          resizeMode="cover"
        >
          <Text style={styles.user}>Bem Vindo, {nomeExibicao}</Text>

            <View>
          <Text style={styles.text1}>
            O Bem Estar é a ferramenta que você precisa para uma pré-avaliação simples e objetiva da sua ansiedade. 
            </Text> 
            </View>
            
            <View>
            <Text style={styles.text2}>
            Lembre-se de que esta avaliação é apenas um ponto de partida e não substitui um diagnóstico feito por um profissional de saúde mental qualificado.
            </Text>
            </View>
            
        </ImageBackground>
      </View>

      <View style={styles.button}>
        <Link href="referencias" asChild>
          <Button
           
            mode="text"
            onPress={() => console.log('Sobre')}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Referências
          </Button>
        </Link>
     
        <Link href="app" asChild>
          <Button
            
            mode="contained"
            onPress={() => console.log('Iniciar')}
            labelStyle={{ color: 'white', fontSize: 18 }}
          >
            Iniciar Avaliação
          </Button>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424266', // Cor de fundo
  },

  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 415, // Largura da logomarca
    height: 700, // Altura da logomarca
    padding: 40,
  },

  text1: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Inder_400Regular',
    color: '#e5e5ff', // Cor do texto
  },

  text2: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 20,
    fontFamily: 'Inder_400Regular',
    color: '#e5e5ff', // Cor do texto
  },

  text: {
    flex: 9,
    color: '#e5e5ff', // Cor do texto
    marginHorizontal: 5,
    fontFamily: 'Inder_400Regular',
  },

  button: {
    flex: 1,
    // alignSelf: 'flex-end',
    fontFamily: 'Inder_400Regular',
    alignItems: 'flex-end',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },


  user: {
    padding: 50,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 17,
    fontFamily: 'Inder_400Regular',
    color: '#e5e5ff', // Cor do texto
  },
});

export default TelaPersonalizada;
