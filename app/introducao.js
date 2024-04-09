import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const TelaPersonalizada = () => {
  return (
    <View style={styles.container}>
      {/* Logomarca ao fundo com efeito de marca d'água */}
      <View style={styles.text}>
      <ImageBackground
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logoBackground} imageStyle={{opacity: 0.2}}
        resizeMode="cover"
      >
      <Text style={styles.textContainer}>O Bem Estar é a ferramenta que você precisa para uma pré-avaliação simples e objetiva da sua ansiedade. Com perguntas cuidadosamente elaboradas, nossa abordagem direta permite que você avalie seu estado emocional de forma rápida e eficaz. Lembre-se de que esta avaliação é apenas um ponto de partida e não substitui um diagnóstico feito por um profissional de saúde mental qualificado.</Text>
      </ImageBackground>
      </View>

      <View style={styles.button}>
      <Link href="pergunta1" asChild>
      <Button style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}} mode="text" onPress={()=>
      console.log('Pressed')} labelStyle={{ color: 'black', fontSize: 18}}>
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
    justifyContent: 'center',
    flexDirection:'column',
    alignItems:'center',
    fontSize: 25,
    fontWeight: 'bold',
    
  },
  
  text: {
    flex: 9,
    color: '#333', // Cor do texto
    marginHorizontal: 15,
  },
  
   button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
  },
  
});

export default TelaPersonalizada;
