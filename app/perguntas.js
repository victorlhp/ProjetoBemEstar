import React, { useState } from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const perguntas = [
  {
    enunciado: 'Você tem sentido um medo ou preocupação excessiva na maioria dos dias nas últimas semanas?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem dificuldade para dormir ou manter o sono?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem sintomas físicos como tremores, sudorese ou palpitações devido à ansiedade?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem dificuldades para se concentrar ou tomar decisões?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você sente que não consegue relaxar ou ficar calmo?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem ataques de pânico inesperados?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você evita situações ou lugares por medo de ter um ataque de ansiedade?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você se preocupa com muitas coisas diferentes ao mesmo tempo?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você se sente tenso ou no limite?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem pensamentos negativos constantes?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você sente que algo ruim vai acontecer, mesmo sem motivo?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você tem dificuldades para controlar suas preocupações?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você sente que seus níveis de energia estão baixos?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
  {
    enunciado: 'Você se sente constantemente estressado?',
    respostas: [
      { texto: 'A maior parte do tempo', valor: 3 },
      { texto: 'Boa parte do tempo', valor: 2 },
      { texto: 'De vez em quando', valor: 1 },
      { texto: 'Raramente', valor: 0 },
    ],
  },
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

  const handleResposta = async (resposta, indice) => {
    try {
      const novasRespostas = [
        ...respostas,
        { pergunta: indice + 1, resposta: resposta.texto, valor: resposta.valor },
      ];
      setRespostas(novasRespostas);
      await AsyncStorage.setItem('respostas', JSON.stringify(novasRespostas));

      if (indice < perguntas.length - 1) {
        setIndice(indice + 1);
      } else {
        router.replace('/resultados');
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
    }
  };

  return <Pergunta indice={indice} handleResposta={handleResposta} />;
};

const styles = StyleSheet.create({
  fullScreenBackground: {
    backgroundColor: '#CCCCFF',
    flex: 1,
    width: 435,
    height: 500,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pergunta: {
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
    paddingHorizontal: 25,
    fontWeight: '300',
  },
  botoesContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    top: 100,
  },
  botao1: {
    backgroundColor: '#CCFFCC',
    paddingVertical: 25,
    paddingHorizontal: 100,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao1Pressed: {
    backgroundColor: '#7a997a',
    paddingVertical: 25,
    paddingHorizontal: 100,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao2: {
    backgroundColor: '#CCF6FF',
    paddingVertical: 25,
    paddingHorizontal: 105,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao2Pressed: {
    backgroundColor: '#88a7b5',
    paddingVertical: 25,
    paddingHorizontal: 105,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao3: {
    backgroundColor: '#FFFFCC',
    paddingVertical: 25,
    paddingHorizontal: 75,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao3Pressed: {
    backgroundColor: '#99997a',
    paddingVertical: 25,
    paddingHorizontal: 75,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao4: {
    backgroundColor: '#FFCCCC',
    paddingVertical: 25,
    paddingHorizontal: 130,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botao4Pressed: {
    backgroundColor: '#a67a7a',
    paddingVertical: 25,
    paddingHorizontal: 130,
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 10,
  },
  botaoTexto: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000000',
  },
});

export default App;

