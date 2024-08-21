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
  { nome: 'pergunta-01', enunciado: 'Você tem sentido um medo ou preocupação excessiva na maioria dos dias nas últimas semanas?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-02', enunciado: 'Você tem dificuldade para dormir ou manter o sono?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-03', enunciado: 'Você tem sintomas físicos como tremores, sudorese ou palpitações devido à ansiedade?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-04', enunciado: 'Você tem dificuldades para se concentrar ou tomar decisões?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-05', enunciado: 'Você sente que não consegue relaxar ou ficar calmo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-06', enunciado: 'Você tem ataques de pânico inesperados?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-07', enunciado: 'Você evita situações ou lugares por medo de ter um ataque de ansiedade?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-08', enunciado: 'Você se preocupa com muitas coisas diferentes ao mesmo tempo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-09', enunciado: 'Você se sente tenso ou no limite?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-10', enunciado: 'Você tem pensamentos negativos constantes?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-11', enunciado: 'Você sente que algo ruim vai acontecer, mesmo sem motivo?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-12', enunciado: 'Você tem dificuldades para controlar suas preocupações?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-13', enunciado: 'Você sente que seus níveis de energia estão baixos?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
  { nome: 'pergunta-14', enunciado: 'Você se sente constantemente estressado?', respostas: [{ texto: 'A maior parte do tempo', valor: 3 }, { texto: 'Boa parte do tempo', valor: 2 }, { texto: 'De vez em quando', valor: 1 }, { texto: 'Raramente', valor: 0 }] },
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
        <Text style={styles.indiceTexto}>{indice + 1} de {perguntas.length}</Text>
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
  const pontuacaoAnsiedadeFinal = Math.min(pontuacaoAnsiedade, 21);
  const pontuacaoDepressaoFinal = Math.min(pontuacaoDepressao, 21);
  const getGaugeColor = (score) => {
    if (score <= 7) return 'green';
    if (score >=8 && score <= 11) return 'yellow';
    if (score >=12 && score <= 21) return 'red';
  };

  const interpretacaoA = (pontuacaoAnsiedade) => {
    if (pontuacaoAnsiedade >= 0 && pontuacaoAnsiedade <= 7) return 'Improvável: Não há probabilidade';
    if (pontuacaoAnsiedade >= 8 && pontuacaoAnsiedade <= 11) return 'Possível: Procure um Profissional de Saúde Mental';
    if (pontuacaoAnsiedade >= 12 && pontuacaoAnsiedade <= 21) return 'Provável: Alta Probabilidade. Procure um Especialista em saúde mental';
   
  };

  const interpretacaoD = (pontuacaoDepressao) => {
    if (pontuacaoDepressao >= 0 && pontuacaoDepressao <= 7) return 'Improvável: Você provavelmente não apresenta sintomas significativos de depressão, mas continue cuidando do seu bem-estar emocional.';
    if (pontuacaoDepressao >= 8 && pontuacaoDepressao <= 11) return 'Possível: Há alguns sintomas leves de depressão; considere monitorar seu estado emocional e buscar orientação se necessário.';
    if (pontuacaoDepressao >= 12 && pontuacaoDepressao <= 21) return 'Provável: Sintomas significativos de depressão estão presentes; é importante procurar avaliação e apoio profissional.';
    
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logoBemEstar.png')} style={styles.logo} />
      
      <Text style={styles.chartTitle}>Transtorno de Ansiedade</Text>
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={-90}
        arcSweepAngle={180}
        fill={(pontuacaoAnsiedadeFinal / 21) * 100} 
        tintColor={getGaugeColor(pontuacaoAnsiedadeFinal)}
        backgroundColor="#e0e0e0"
      >
        {() => (
          <Text style={styles.chartText}>
            {pontuacaoAnsiedadeFinal}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.interpretacao}>{interpretacaoA(pontuacaoAnsiedadeFinal)}</Text>

      <Text style={styles.chartTitle}>Depressão</Text>
      <AnimatedCircularProgress
        size={180}
        width={15}
        rotation={-90}
        arcSweepAngle={180}
        fill={(pontuacaoDepressaoFinal / 21) * 100}
        tintColor={getGaugeColor(pontuacaoDepressaoFinal)}
        backgroundColor="#e0e0e0"
      >
        {() => (
          <Text style={styles.chartText}>
            {pontuacaoDepressaoFinal}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.interpretacao}>{interpretacaoD(pontuacaoDepressaoFinal)}</Text>

      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText} labelStyle={{fontFamily: 'Inder_400Regular'}}>Sair</Text>
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
    <>
      {!showResultados ? (
        <Pergunta indice={indice} handleResposta={handleResposta} />
      ) : (
        <Resultados
          pontuacaoAnsiedade={respostas.filter((_, idx) => idx % 2 === 0).reduce((acc, resposta) => acc + resposta.valor, 0)}
          pontuacaoDepressao={respostas.filter((_, idx) => idx % 2 !== 0).reduce((acc, resposta) => acc + resposta.valor, 0)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  // Seus estilos aqui
  fullScreenBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  botoesContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botao: {
    padding: 10,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',  // O botão vai ocupar 80% da largura da tela, se ajustando automaticamente
    marginVertical: 10,
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },

  indiceTexto: {
    fontSize: 20,
    color: '#ebebff', // Alterar para a cor que desejar
    textAlign: 'left',
    padding: 22,
    fontFamily: 'Inder_400Regular',

  },
  chartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  chartText: {
    fontSize: 20,
    color: '#333',
  },
  interpretacao: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#555',
  },
 
 
  logo: {
    width: '50%',  // A largura da logo será 50% da largura da tela
    height: undefined, // Deixe a altura indefinida para manter a proporção
    aspectRatio: 1, // Manter a proporção original
    resizeMode: 'contain',
    marginBottom: 20,
  },

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
    alignItems: 'left',
    justifyContent: 'center',
    width: '100%',
},
  fullScreenBackground: {
    flex: 1, 
    backgroundColor: '#424266', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageBackground: {
    width: 435,
    height: 500,
    opacity: 0.1,
  },
  pergunta: {
    fontWeight: '300',
    fontFamily: 'Inder_400Regular',
    textAlign: 'left',
    marginBottom: 20,
    color: '#e5e5ff',
    paddingHorizontal: 25,
    fontSize: screenWidth * 0.06,  // Texto responsivo com 6% da largura da tela
  },
 
  botoesContainer: {
    flexDirection: 'column',
    marginVertical: 0,
    top: 100,
    textAlign: 'left',
    },

  botao: {
    paddingVertical: 25,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao1: {
    backgroundColor: '#CCFFCC',
    paddingHorizontal: 25,
  },
  botao1Pressed: {
    backgroundColor: '#7a997a',
  },
  botao2: {
    backgroundColor: '#CCF6FF',
    paddingHorizontal: 25,
  },
  botao2Pressed: {
    backgroundColor: '#88a7b5',
  },
  botao3: {
    backgroundColor: '#FFFFCC',
    paddingHorizontal: 25,
    
  },
  botao3Pressed: {
    backgroundColor: '#99997a',
  },
  botao4: {
    backgroundColor: '#FFCCCC',
    paddingHorizontal: 25,
  },
  botao4Pressed: {
    backgroundColor: '#a67a7a',
  },
  botaoTexto: {
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'left',
    fontFamily: 'Inder_400Regular',
    color: '#000',
  },
  chartTitle: {
    fontSize: 30,
    fontFamily: 'Inder_400Regular',
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
    fontFamily: 'Inder_400Regular',
  },

  chartContainer: {
    alignItems: 'center',
    marginBottom: 10, // Reduziu o espaçamento inferior
  },

  interpretacao: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Inder_400Regular',
    marginTop: 5, // Aumentou a margem superior para aproximar do gráfico
    top: -55, //
  },

  gaugeText: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 10, // Diminuído para deixar o texto mais próximo do gráfico
    fontFamily: 'Inder_400Regular',
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inder_400Regular',
  },

});

export default App;