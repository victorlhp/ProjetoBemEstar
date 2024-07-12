import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.resultadoTexto}>Seu nível de ansiedade é: {resultado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCFF',
  },
  resultadoTexto: {
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default TelaResultados;
