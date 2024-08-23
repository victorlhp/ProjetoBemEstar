import React from 'react';
import { View, ImageBackground, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const TelaPersonalizada = () => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <ImageBackground
          source={require('./../assets/logoBemEstar.png')}
          style={styles.logoBackground}
          imageStyle={{ opacity: 0.1 }}
          resizeMode="cover"
        >
          <Text style={styles.textContainer}>
            Escala HAD - Avaliação do nível de ansiedade e depressão (Universidade Estadual Paulista "Júlio de Mesquita Filho")
          </Text>
          <Text style={styles.textContainer}>
            Referências: Zigmond, A.S.7 Snaith,R.P. The Hospital Anxiety and Depression Scale. Acta Psychiatrica Scandinavica 1983; 67,361-370 Botega NJ,
          </Text>
          <Text style={styles.textContainer}>
            Bio MR, Zomignami MA, Garcia JR C, Pereira WAB. Transtornos do humor em enfermaria de clínica médica e validação de escala de medida (HAD) de ansiedade e depressão. Revista de Saúde Pública, 29(5): 355-63, 1995.
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.button2}>
        <Link href="app" asChild>
          <Button
            style={styles.button}
            mode="text"
            onPress={() => console.log('Iniciar')}
            labelStyle={styles.buttonText}
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
    backgroundColor: '#9ed9', // Cor de fundo
    width: '100%',
  },

  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9, // Proporcional à largura da tela
    height: height * 0.5, // Proporcional à altura da tela
  },

  textContainer: {
    fontFamily: 'Inder_400Regular',
    textAlign: 'center',
    fontSize: width * 0.05, // Proporcional à largura da tela
    paddingBottom: 30,
    width: '100%',
  },

  text: {
    flex: 9,
    color: '#333', // Cor do texto
    marginHorizontal: width * 0.05, // Proporcional à largura da tela
  },

  button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonText: {
    color: 'black',
    fontSize: width * 0.05, // Proporcional à largura da tela
    fontFamily: 'Inder_400Regular',
  },

  button2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: width * 0.05, // Proporcional à largura da tela
  },
});

export default TelaPersonalizada;
