import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Largura da tela para uso em estilos
const screenWidth = Dimensions.get('window').width;

const Resultados = () => {
// Estados para armazenar a pontuação de ansiedade e depressão
  const [pontuacaoAnsiedade, setPontuacaoAnsiedade] = useState(0);
  const [pontuacaoDepressao, setPontuacaoDepressao] = useState(0);

  useEffect(() => {

// Função para calcular a pontuação de ansiedade e depressão
    const calcularPontuacao = async () => {
      try {
        // Recupera as respostas do armazenamento local
        const respostasJson = await AsyncStorage.getItem('respostas');
        const respostas = JSON.parse(respostasJson) || [];

// Calcula a pontuação de ansiedade somando valores de índices pares
        const pontuacaoAns = respostas
          .filter((_, idx) => idx % 2 === 0)
          .reduce((acc, resposta) => acc + resposta.valor, 0);

// Calcula a pontuação de depressão somando valores de índices ímpares
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

// Função para determinar a cor do gráfico baseado na pontuação
  const getGaugeColor = (score) => {
    if (score <= 7) return 'green'; // Cor verde para pontuação baixa
    if (score <= 11) return 'yellow'; // Cor amarela para pontuação média
    return 'red'; // Cor vermelha para pontuação alta
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Transtorno de Ansiedade</Text>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={(pontuacaoAnsiedade / 21) * 100} // Calcula a porcentagem para o gráfico
          tintColor={getGaugeColor(pontuacaoAnsiedade)} // Define a cor do gráfico
          backgroundColor="#eeeeee"
          // lineCap="round"
          rotation={-90} // Rotação do gráfico
          arcSweepAngle={180} // Ângulo do arco do gráfico
          style={styles.gauge}
        >
          {(fill) => (
            <Text style={styles.gaugeText}>
              {pontuacaoAnsiedade} 
            </Text>
          )}
        </AnimatedCircularProgress>
        <Text style={styles.resultado}>{interpretacaoA(pontuacaoAnsiedade)}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Depressão</Text>
        <AnimatedCircularProgress
          size={180}
          width={15}
          fill={(pontuacaoDepressao / 21) * 100}
          tintColor={getGaugeColor(pontuacaoDepressao)}
          backgroundColor="#eeeeee"
          // lineCap="round"
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
        <Text style={styles.resultado}>{interpretacaoD(pontuacaoDepressao)}</Text>
      </View>
    </View>
  );
};

// Função para interpretar a pontuação e exibir a mensagem correspondente
// const interpretacao = (pontuacao) => {
//   if (pontuacao >= 0 && pontuacao <= 7) return 'Improvável'; // Ansiedade/Depressão improvável
//   if (pontuacao >= 8 && pontuacao <= 11) return 'Possível'; // Ansiedade/Depressão possível
//   if (pontuacao >= 12 && pontuacao <= 21) return 'Provável'; // Ansiedade/Depressão provável
//   return 'Resultado fora do intervalo';
// };

const interpretacaoA = (pontuacaoAnsiedade) => {
  if (pontuacaoAnsiedade >= 0 && pontuacaoAnsiedade <= 7) return 'Improvável: Não há probabilidade'; // Ansiedade/Depressão improvável
  if (pontuacaoAnsiedade >= 8 && pontuacaoAnsiedade <= 11) return 'Possível: Procure um Profissional de Saúde Mental'; // Ansiedade/Depressão possível
  if (pontuacaoAnsiedade >= 12 && pontuacaoAnsiedade <= 21) return 'Provável: Alta Probabilidade. Procure um Especialista em saúde mental'; // Ansiedade/Depressão provável
  return 'Resultado fora do intervalo';
};

const interpretacaoD = (pontuacaoDepressao) => {
  if (pontuacaoDepressao >= 0 && pontuacaoDepressao <= 7) return 'Improvável: Você provavelmente não apresenta sintomas significativos de depressão, mas continue cuidando do seu bem-estar emocional.'; // Ansiedade/Depressão improvável
  if (pontuacaoDepressao >= 8 && pontuacaoDepressao <= 11) return 'Possível: Há alguns sintomas leves de depressão; considere monitorar seu estado emocional e buscar orientação se necessário.'; // Ansiedade/Depressão possível
  if (pontuacaoDepressao >= 12 && pontuacaoDepressao <= 21) return 'Provável: Sintomas significativos de depressão estão presentes; é importante procurar avaliação e apoio profissional.'; // Ansiedade/Depressão provável
  return 'Resultado fora do intervalo';
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF',
    padding: 0,
  },
  logo: {
    width: '100%', 
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  chartContainer: {
    alignItems: 'center',
    marginBottom: 75,
  },

  chartTitle: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },
  resultado: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#000000',
},

  gauge: {
    marginBottom: 10,
},

  gaugeText: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 65,
  },
});

export default Resultados;
