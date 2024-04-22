import React, { useState } from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

const TelaPergunta = ({ navigation }) => {
  const [resposta, setResposta] = useState(null);

  const handleResposta = async (opcao) => {
    // Define a resposta selecionada
    setResposta(opcao);

    // Armazena a resposta no AsyncStorage
    try {
      await AsyncStorage.setItem('@respostaPergunta', opcao);
    } catch (error) {
      console.error('Erro ao armazenar a resposta:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./../assets/logoBemEstar.png')}
      style={styles.fullScreenBackground}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.pergunta}>
          Você tem sentido um medo ou preocupação excessiva na maioria dos dias nas últimas semanas?
        </Text>
        <View style={styles.botoesContainer}>
          
          <View>
          <Link href="pergunta2" asChild>
          <Pressable style={styles.botao} onPress={() => handleResposta('Sim')}>
            <Text style={styles.botaoTexto}>Sim</Text>
          </Pressable>
          </Link>
          </View>

        <View>
        <Link href="pergunta2" asChild>
          <Pressable style={styles.botao} onPress={() => handleResposta('Não')}>
            <Text style={styles.botaoTexto}>Não</Text>
          </Pressable>
          </Link>
        </View>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pergunta: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
    paddingHorizontal: 25,
    fontWeight: '100',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  botaoTexto: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default TelaPergunta;
