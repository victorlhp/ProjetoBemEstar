import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ImageBackground, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
import { addUser, addResposta, addResultados } from './firestoreService'; // Certifique-se de que o caminho está correto
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { signOut } from 'firebase/auth';
import { Image } from "react-native";



// Largura da tela para uso em estilos
const screenWidth = Dimensions.get('window').width;

const perguntas = [
  { nome: 'Pergunta 1', enunciado: 'Você tem sentido um medo ou preocupação excessiva na maioria dos dias nas últimas semanas?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 2', enunciado: 'Você tem dificuldade para dormir ou manter o sono?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 3', enunciado: 'Você tem sintomas físicos como tremores, sudorese ou palpitações devido à ansiedade?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 4', enunciado: 'Você tem dificuldades para se concentrar ou tomar decisões?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 5', enunciado: 'Você sente que não consegue relaxar ou ficar calmo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 6', enunciado: 'Você tem ataques de pânico inesperados?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 7', enunciado: 'Você evita situações ou lugares por medo de ter um ataque de ansiedade?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 8', enunciado: 'Você se preocupa com muitas coisas diferentes ao mesmo tempo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 9', enunciado: 'Você se sente tenso ou no limite?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 10', enunciado: 'Você tem pensamentos negativos constantes?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 11', enunciado: 'Você sente que algo ruim vai acontecer, mesmo sem motivo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 12', enunciado: 'Você tem dificuldades para controlar suas preocupações?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 13', enunciado: 'Você sente que seus níveis de energia estão baixos?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'Pergunta 14', enunciado: 'Você se sente constantemente estressado?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
];

const Pergunta = ({ indice, handleResposta }) => {
  const perguntaAtual = perguntas[indice];

  return (
    <ImageBackground
      source={require('./../assets/logoBemEstar.png')}
      style={styles.fullScreenBackground}
      resizeMode="cover"
      imageStyle={styles.imageBackground}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.pergunta}>{perguntaAtual.enunciado}</Text>
        <View style={styles.botoesContainer}>
          {perguntaAtual.respostas.map((resposta, idx) => (
            <Pressable
              key={idx}
              style={({ pressed }) => [
                styles.botao,
                styles[`botao${idx + 1}`],
                pressed && styles[`botao${idx + 1}Pressed`],
              ]}
              onPress={() => handleResposta(resposta, indice)}
            >
              <Text style={styles.botaoTexto}>{resposta.texto}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const Resultados = ({ pontuacaoAnsiedade, pontuacaoDepressao, onLogout }) => {
  const getGaugeColor = (score) => {
    if (score <= 7) return 'green'; // Cor verde para pontuação baixa
    if (score >=8 && score <= 11) return 'yellow'; // Cor amarela para pontuação média
    return 'red'; // Cor vermelha para pontuação alta
  };

  const interpretacaoA = (pontuacaoAnsiedade) => {
    if (pontuacaoAnsiedade >= 0 && pontuacaoAnsiedade <= 7) return 'Improvável: Não há probabilidade';
    if (pontuacaoAnsiedade >= 8 && pontuacaoAnsiedade <= 11) return 'Possível: Procure um Profissional de Saúde Mental';
    if (pontuacaoAnsiedade >= 12 && pontuacaoAnsiedade <= 21) return 'Provável: Alta Probabilidade. Procure um Especialista em saúde mental';
    return 'Resultado fora do intervalo';
  };

  const interpretacaoD = (pontuacaoDepressao) => {
    if (pontuacaoDepressao >= 0 && pontuacaoDepressao <= 7) return 'Improvável: Você provavelmente não apresenta sintomas significativos de depressão, mas continue cuidando do seu bem-estar emocional.';
    if (pontuacaoDepressao >= 8 && pontuacaoDepressao <= 11) return 'Possível: Há alguns sintomas leves de depressão; considere monitorar seu estado emocional e buscar orientação se necessário.';
    if (pontuacaoDepressao >= 12 && pontuacaoDepressao <= 21) return 'Provável: Sintomas significativos de depressão estão presentes; é importante procurar avaliação e apoio profissional.';
    return 'Resultado fora do intervalo';
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
      
      <Text style={styles.chartTitle}>Transtorno de Ansiedade</Text>
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={-90} // Rotação do gráfico
        arcSweepAngle={180} // Ângulo do arco do gráfico
        fill={(pontuacaoAnsiedade / 21) * 100} // Calcula a porcentagem para o gráfico
        tintColor={getGaugeColor(pontuacaoAnsiedade)}
        backgroundColor="#e0e0e0"
      >
        {() => (
          <Text style={styles.chartText}>
            {pontuacaoAnsiedade}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.interpretacao}>{interpretacaoA(pontuacaoAnsiedade)}</Text>

      <Text style={styles.chartTitle}>Depressão</Text>
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={-90} // Rotação do gráfico
        arcSweepAngle={180} // Ângulo do arco do gráfico
        fill={(pontuacaoDepressao / 21) * 100} // Calcula a porcentagem para o gráfico
        tintColor={getGaugeColor(pontuacaoDepressao)}
        backgroundColor="#e0e0e0"
        
      >
        {() => (
          <Text style={styles.chartText}>
            {pontuacaoDepressao}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.interpretacao}>{interpretacaoD(pontuacaoDepressao)}</Text>

      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [showResultados, setShowResultados] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const email = user.email;
        const nome = user.displayName;
        const userId = user.uid;

        try {
          await addUser(userId, nome, email);
        } catch (error) {
          console.error('Erro ao salvar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleResposta = async (resposta, indice) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('Usuário não está logado!');
        return;
      }
      const userId = user.uid;

      const novasRespostas = [
        ...respostas,
        { pergunta: perguntas[indice].nome, resposta: resposta.texto, valor: resposta.valor },
      ];
      setRespostas(novasRespostas);

      await AsyncStorage.setItem('respostas', JSON.stringify(novasRespostas));

      await addResposta(userId, perguntas[indice].nome, resposta.valor);

      if (indice < perguntas.length - 1) {
        setIndice(indice + 1);
      } else {
        const pontuacaoAnsiedade = novasRespostas
          .filter((_, idx) => idx % 2 === 0)
          .reduce((acc, resposta) => acc + resposta.valor, 0);
        const pontuacaoDepressao = novasRespostas
          .filter((_, idx) => idx % 2 !== 0)
          .reduce((acc, resposta) => acc + resposta.valor, 0);

        await addResultados(userId, pontuacaoAnsiedade, pontuacaoDepressao);

        setShowResultados(true);
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  };

  return (
    <View style={styles.fullScreenBackground}>
      {showResultados ? (
        <Resultados
          pontuacaoAnsiedade={respostas.filter((_, idx) => idx % 2 === 0).reduce((acc, resposta) => acc + resposta.valor, 0)}
          pontuacaoDepressao={respostas.filter((_, idx) => idx % 2 !== 0).reduce((acc, resposta) => acc + resposta.valor, 0)}
          onLogout={handleLogout}
        />
      ) : (
        <Pergunta indice={indice} handleResposta={handleResposta} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeb8b4',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 12,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreenBackground: {
    flex: 1, 
    backgroundColor: '#424266', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: 435,
    height: 500,
    opacity: 0.1,
  },
  pergunta: {
    fontSize: 25,
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#e5e5ff',
    paddingHorizontal: 25,
  },
  botoesContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    top: 100,
  },
  botao: {
    paddingVertical: 25,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao1: {
    backgroundColor: '#CCFFCC',
    paddingHorizontal: 100,
  },
  botao1Pressed: {
    backgroundColor: '#7a997a',
  },
  botao2: {
    backgroundColor: '#CCF6FF',
    paddingHorizontal: 105,
  },
  botao2Pressed: {
    backgroundColor: '#88a7b5',
  },
  botao3: {
    backgroundColor: '#FFFFCC',
    paddingHorizontal: 75,
  },
  botao3Pressed: {
    backgroundColor: '#99997a',
  },
  botao4: {
    backgroundColor: '#FFCCCC',
    paddingHorizontal: 130,
  },
  botao4Pressed: {
    backgroundColor: '#a67a7a',
  },
  botaoTexto: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000',
  },
  chartTitle: {
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 5, // Reduziu o espaçamento inferior
    color: '#000000',
    top: -20,
  },

  chartText: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginBottom: 50, 
  },

  chartContainer: {
    alignItems: 'center',
    marginBottom: 10, // Reduziu o espaçamento inferior
  },

  interpretacao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    fontStyle: 'italic',
    marginTop: 5, // Aumentou a margem superior para aproximar do gráfico
    top: -55, //
  },

  gaugeText: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 10, // Diminuído para deixar o texto mais próximo do gráfico
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: -40,
  },
  
    logoutButton: {
    backgroundColor: '#6666ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
    
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default App;
