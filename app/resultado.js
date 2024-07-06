import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultadoFinal = () => {
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const calcularResultado = async () => {
      try {
        let soma = 0;
        for (let i = 1; i <= 10; i++) {
          const resposta = await AsyncStorage.getItem(`respostaPergunta${i}`);
          if (resposta) {
            soma += parseInt(resposta, 10);
          }
        }
        setResultado(soma);
      } catch (error) {
        console.error('Erro ao calcular o resultado:', error);
      }
    };

    calcularResultado();
  }, []);

  return (
    <ImageBackground
      source={require('./../assets/logoBemEstar.png')}
      style={styles.fullScreenBackground}
      resizeMode="cover"
      imageStyle={{ opacity: 0.2 }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.resultadoTexto}>Seu nível de ansiedade é:</Text>
        {resultado !== null ? (
          <Text style={styles.resultado}>{resultado}</Text>
        ) : (
          <Text style={styles.loading}>Calculando...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultadoTexto: {
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  resultado: {
    fontSize: 50,
    color: '#000000',
    textAlign: 'center',
  },
  loading: {
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
  },
});

export default ResultadoFinal;
