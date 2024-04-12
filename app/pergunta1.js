import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const TelaPergunta = () => {
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
        <Text style={styles.pergunta}>Você tem sentido um medo ou preocupação excessiva na maioria dos dias nas últimas semanas?</Text>

        {/* Botões de resposta */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botao} onPress={() => handleResposta('Sim')}>
            <Text style={styles.botaoTexto}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={() => handleResposta('Não')}>
            <Text style={styles.botaoTexto}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    width: 415, // Largura da logomarca
    height: 700, // Altura da logomarca
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
    color: '#000000', // Considerando uma cor que se destaque sobre a logomarca
    paddingHorizontal: 25,
    fontWeight: '100'
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 20,
  },
  botao: {
    //backgroundColor: 'blue',
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
