import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaPersonalizada = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  

  useEffect(() => {
    const recuperarNome = async () => {
      try {
        const nome = await AsyncStorage.getItem('nomeUsuario');
        if (nome !== null) {
          setNomeUsuario(nome);
        }
      } catch (error) {
        console.error('Erro ao recuperar nome:', error);
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
          <Text style={styles.user}>Bem Vindo, {nomeUsuario}</Text>

          <Text style={styles.textContainer}>
            O Bem Estar é a ferramenta que você precisa para uma pré-avaliação simples e objetiva da sua ansiedade. Com perguntas cuidadosamente elaboradas, nossa abordagem direta permite que você avalie seu estado emocional de forma rápida e eficaz. Lembre-se de que esta avaliação é apenas um ponto de partida e não substitui um diagnóstico feito por um profissional de saúde mental qualificado.
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.button}>
        <Link href="referencias" asChild>
          <Button
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
            mode="text"
            onPress={() => console.log('Sobre')}
            labelStyle={{ color: 'black', fontSize: 18 }}
          >
            Sobre
          </Button>
        </Link>
      </View>

      <View style={styles.button2}>
        <Link href="app" asChild>
          <Button
            style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
            mode="text"
            onPress={() => console.log('Iniciar')}
            labelStyle={{ color: 'black', fontSize: 18 }}
          >
            Iniciar
          </Button>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeb8b4', // Cor de fundo
  },

  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 415, // Largura da logomarca
    height: 700, // Altura da logomarca
    padding: 40,
  },

  textContainer: {
    fontStyle: 'italic',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 20,
  },

  text: {
    flex: 9,
    color: '#333', // Cor do texto
    marginHorizontal: 5,
  },

  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    top: 83,
  },

  button2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  user: {
    fontStyle: 'italic',
    padding: 50,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 17,
  },
});

export default TelaPersonalizada;
