import React from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaPergunta = () => {
  const handleResposta = async (resposta) => {
    // Define os valores das respostas
    let valorResposta = null;
    if (resposta === 'Sim') {
      valorResposta = 1; // Valor para resposta "Sim"
    } else if (resposta === 'Não') {
      valorResposta = 0; // Valor para resposta "Não"
    }

    // Armazena o valor da resposta no AsyncStorage
    try {
      await AsyncStorage.setItem('respostaTelaPergunta', JSON.stringify({ resposta, valorResposta }));
    } catch (error) {
      console.error('Erro ao armazenar a resposta:', error);
    }

    // Lógica adicional para navegar para a próxima tela ou executar outra ação
    // Por exemplo, você pode usar o Link para navegar para a próxima tela
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
    width: 415,
    height: 700,
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  botao: {
    paddingVertical: 25,
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
