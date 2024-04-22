import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TelaResposta = () => {
  const [nivelAnsiedade, setNivelAnsiedade] = useState(0);

  useEffect(() => {
    const obterResultados = async () => {
      try {
        let nivelTotal = 0;

        // Loop sobre as 10 perguntas
        for (let i = 1; i <= 10; i++) {
          const chave = `respostaPergunta${i}`;
          const valorResposta = await AsyncStorage.getItem(chave);
          if (valorResposta !== null) {
            nivelTotal += parseInt(valorResposta, 10);
          }
        }

        setNivelAnsiedade(nivelTotal);
      } catch (error) {
        console.error('Erro ao obter resultados:', error);
      }
    };

    obterResultados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resultado Final</Text>
      <Text style={styles.mensagem}>Seu nível de ansiedade é:</Text>
      <Text style={styles.valor}>{nivelAnsiedade}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mensagem: {
    fontSize: 18,
    marginBottom: 10,
  },
  valor: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default TelaResposta;
