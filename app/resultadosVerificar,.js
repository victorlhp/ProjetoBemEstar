import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Resultados = () => {
  const [respostasAnsiedade, setRespostasAnsiedade] = useState([]);
  const [respostasDepressao, setRespostasDepressao] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadRespostas = async () => {
      try {
        const respostasAnsiedadeJson = await AsyncStorage.getItem('respostasAnsiedade');
        const respostasDepressaoJson = await AsyncStorage.getItem('respostasDepressao');
        
        if (respostasAnsiedadeJson) {
          setRespostasAnsiedade(JSON.parse(respostasAnsiedadeJson));
        }
        if (respostasDepressaoJson) {
          setRespostasDepressao(JSON.parse(respostasDepressaoJson));
        }
      } catch (error) {
        console.error('Erro ao carregar respostas:', error);
      }
    };

    loadRespostas();
  }, []);

  const calcularPontuacao = (respostas) => {
    return respostas.reduce((total, resposta) => total + resposta.valor, 0);
  };

  const gerarDadosGrafico = (respostas) => {
    const perguntas = [
      ' 1',
      ' 2',
      ' 3',
      ' 4',
      ' 5',
      ' 6',
      ' 7',
      ' 8',
      ' 9',
      ' 10',
      ' 11',
      ' 12',
      ' 13',
      ' 14',
    ];

    return perguntas.map((pergunta, index) => {
      const resposta = respostas.find((r) => r.pergunta === index + 1);
      return {
        question: pergunta,
        score: resposta ? resposta.valor : 0,
      };
    });
  };

  const dataAnsiedade = gerarDadosGrafico(respostasAnsiedade);
  const dataDepressao = gerarDadosGrafico(respostasDepressao);

  const graficoData = (data) => ({
    labels: data.map((item) => item.question),
    datasets: [
      {
        data: data.map((item) => item.score),
      },
    ],
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Resultados de Ansiedade</Text>
      <BarChart
        data={graficoData(dataAnsiedade)}
        width={screenWidth - 40}
        height={220}
        fromZero={true}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#ffa726',
          backgroundGradientTo: '#fb8c00',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.grafico}
      />
      
      <Text style={styles.titulo}>Resultados de Depressão</Text>
      <BarChart
        data={graficoData(dataDepressao)}
        width={screenWidth - 40}
        height={220}
        fromZero={true}
        chartConfig={{
          backgroundColor: '#2b8a3e',
          backgroundGradientFrom: '#1d9a40',
          backgroundGradientTo: '#22b44d',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.grafico}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF',
    padding: 20,
  },
  titulo: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  grafico: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Resultados;
