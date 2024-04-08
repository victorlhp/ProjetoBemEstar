import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TelaPersonalizada = () => {
  return (
    <View style={styles.container}>
      {/* Logomarca ao fundo com efeito de marca d'água */}
      
      <ImageBackground
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logoBackground} imageStyle={{opacity: 0.2}}
        resizeMode="cover"
        
      >
        {/* Texto sobreposta à logomarca */}
        {/* <View style={styles.textContainer}> */}
          <Text style={styles.text}>O Bem Estar é a ferramenta que você precisa para uma pré-avaliação simples e objetiva da sua ansiedade. Com perguntas cuidadosamente elaboradas, nossa abordagem direta permite que você avalie seu estado emocional de forma rápida e eficaz. Lembre-se de que esta avaliação é apenas um ponto de partida e não substitui um diagnóstico feito por um profissional de saúde mental qualificado.</Text>
        {/* </View> */}
      </ImageBackground>

      {/* Botão "Próximo" na parte inferior da tela */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCFFCC', // Cor de fundo
  },
  
  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 415, // Largura da logomarca
    height: 800, // Altura da logomarca
    
  },
  
  textContainer: {
    //backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor de fundo com transparência para efeito de marca d'água
    //paddingHorizontal: 20,
    //paddingVertical: 10,
    //borderRadius: 10,
  },
  
  text: {
    
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333', // Cor do texto
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  
  button: {
    //backgroundColor: '#CCCCFF',
    //paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  
  buttonText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'right',
  },
});

export default TelaPersonalizada;
