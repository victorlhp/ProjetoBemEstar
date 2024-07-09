import React from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const TelaPergunta5 = () => {
  const handleResposta = (resposta) => {
    // Lógica para lidar com a resposta
    console.log('Resposta selecionada:', resposta);
  };

  return (
    <ImageBackground
      source={require('./../assets/logoBemEstar.png')} // Ajuste para o caminho correto
      style={styles.fullScreenBackground}
      resizeMode="cover" // Isso garante que a imagem cubra o fundo, mas pode alterar sua proporção
      imageStyle={{ opacity: 0.2 }}
    >
      <View style={styles.contentContainer}>
        {/* Pergunta ao centro da tela */}
        <Text style={styles.pergunta}>Nos últimos meses, você teve dificuldade em controlar suas preocupações?</Text>

        {/* Botões de resposta */}
        <View style={styles.botoesContainer}>
          <View>
            <Link href="pergunta6" asChild>
              <Pressable style={styles.botao1} onPress={() => handleResposta('Sim')}>
                <Text style={styles.botaoTexto}>A maior parte do tempo</Text>
              </Pressable>
            </Link>
          </View>
          <View>
            <Link href="pergunta6" asChild>
              <Pressable style={styles.botao2} onPress={() => handleResposta('Não')}>
                <Text style={styles.botaoTexto}>Boa parte do tempo</Text>
              </Pressable>
            </Link>
          </View>
          <View>
            <Link href="pergunta6" asChild>
              <Pressable style={styles.botao3} onPress={() => handleResposta('Sim')}>
                <Text style={styles.botaoTexto}>De vez em quando</Text>
              </Pressable>
            </Link>
          </View>
          <View>
            <Link href="pergunta6" asChild>
              <Pressable style={styles.botao4} onPress={() => handleResposta('Sim')}>
                <Text style={styles.botaoTexto}>Raramente</Text>
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
    backgroundColor: '#CCCCFF',
    flex: 1,
    width: 435,
    height: 500,
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
    flexDirection: 'column',
    marginVertical: 20,
    top: 100,
  },
  botao1: {
    backgroundColor: '#CCFFCC',
    paddingVertical: 25,
    paddingHorizontal: 100,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },

  botao2: {
    backgroundColor: '#CCF6FF',
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },

  botao3: {
    backgroundColor: '#FFFACC',
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },

  botao4: {
    backgroundColor: '#FFCCCC',
    paddingVertical: 25,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },

  botaoTexto: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default TelaPergunta5;
