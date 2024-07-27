import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaResultados = () => {
  const [resultado, setResultado] = useState(0);

  useEffect(() => {
    const calcularResultado = async () => {
      try {
        const respostas = await AsyncStorage.getItem('respostas');
        const respostasParsed = JSON.parse(respostas) || [];
        const total = respostasParsed.reduce((acc, resposta) => acc + resposta.valor, 0);
        setResultado(total);
      } catch (error) {
        console.error('Erro ao calcular resultado:', error);
      }
    };

    calcularResultado();
  }, []);

  //implementação da resposta com base no resultado da escala HAD (verificar com o Robério)

  if (resultado <= 7) {
    console.log('improvável');
  } else if (resultado > 7 && resultado <= 11) {
    console.log('possível');
  } else if (resultado > 11 && resultado <= 21) {
    console.log('provável');
  } else{
    console.log('erro');
  }

  // -------------------------------------------------------------------------------------------------

  return (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
  <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
</View>
      <Text style={styles.resultadoTexto}>Seu nível de ansiedade é: {resultado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ed9',
  },
  resultadoTexto: {
    flex: 1,
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default TelaResultados;
