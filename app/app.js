// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
import { addUser, addResposta, addResultados } from './firestoreService'; // Certifique-se de que o caminho está correto

const perguntas = [
  // Perguntas aqui (mantenha como está)
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
      imageStyle={{ opacity: 0.1, flex: 1 }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.pergunta}>{perguntaAtual.enunciado}</Text>
        <View style={styles.botoesContainer}>
          {perguntaAtual.respostas.map((resposta, idx) => (
            <View key={idx}>
              <Pressable
                style={styles[`botao${idx + 1}`]}
                onPress={() => handleResposta(resposta, indice)}
              >
                <Text style={styles.botaoTexto}>{resposta.texto}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  const router = useRouter();
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const email = user.email;
        const nome = user.displayName || 'Usuário';
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

        router.replace('/resultados');
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pergunta indice={indice} handleResposta={handleResposta} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos aqui (mantenha como está)
  container: {
    flex: 1,
  },
  fullScreenBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pergunta: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004257',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    width: '100%',
  },
  botao1: {
    backgroundColor: '#004257',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  botao2: {
    backgroundColor: '#3b82a0',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  botao3: {
    backgroundColor: '#82bdd0',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  botao4: {
    backgroundColor: '#c7e4ee',
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
