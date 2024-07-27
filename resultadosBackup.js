import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenWidth = Dimensions.get('window').width;

const Resultados = () => {
  const [pontuacaoAnsiedade, setPontuacaoAnsiedade] = useState(0);
  const [pontuacaoDepressao, setPontuacaoDepressao] = useState(0);

  useEffect(() => {
    const calcularPontuacao = async () => {
      try {
        const respostasJson = await AsyncStorage.getItem('respostas');
        const respostas = JSON.parse(respostasJson) || [];

        const pontuacaoAns = respostas
          .filter((_, idx) => idx % 2 === 0)
          .reduce((acc, resposta) => acc + resposta.valor, 0);

        const pontuacaoDep = respostas
          .filter((_, idx) => idx % 2 !== 0)
          .reduce((acc, resposta) => acc + resposta.valor, 0);

        setPontuacaoAnsiedade(pontuacaoAns);
        setPontuacaoDepressao(pontuacaoDep);
      } catch (error) {
        console.error('Erro ao calcular pontuação:', error);
      }
    };

    calcularPontuacao();
  }, []);

  const getGaugeColor = (score) => {
    if (score <= 7) return 'green';
    if (score <= 11) return 'yellow';
    return 'red';
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Resultado de Ansiedade</Text>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={(pontuacaoAnsiedade / 21) * 100}
          tintColor={getGaugeColor(pontuacaoAnsiedade)}
          backgroundColor="#eeeeee"
          lineCap="round"
          rotation={-90}
          arcSweepAngle={180}
          style={styles.gauge}
        >
          {(fill) => (
            <Text style={styles.gaugeText}>
              {pontuacaoAnsiedade}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.resultado}>{interpretacao(pontuacaoAnsiedade)}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Resultado de Depressão</Text>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={(pontuacaoDepressao / 21) * 100}
          tintColor={getGaugeColor(pontuacaoDepressao)}
          backgroundColor="#eeeeee"
          lineCap="round"
          rotation={-90}
          arcSweepAngle={180}
          style={styles.gauge}
        >
          {(fill) => (
            <Text style={styles.gaugeText}>
              {pontuacaoDepressao}
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.resultado}>{interpretacao(pontuacaoDepressao)}</Text>
      </View>
    </View>
  );
};

const interpretacao = (pontuacao) => {
  if (pontuacao >= 0 && pontuacao <= 7) return 'Improvável';
  if (pontuacao >= 8 && pontuacao <= 11) return 'Possível';
  if (pontuacao >= 12 && pontuacao <= 21) return 'Provável';
  return 'Resultado fora do intervalo';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF',
    padding: 0,
  },
  logo: {
    width: '100%', // Mesma proporção usada na tela de criação de conta
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  resultado: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    color: '#000000',
  },
  gauge: {
    marginBottom: 20,
  },
  gaugeText: {
    fontSize: 24,
    color: '#000000',
  },
});

export default Resultados;
