// firestoreService.js

import { db } from './firebaseConfig'; // Certifique-se de que o caminho está correto
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Função para adicionar ou atualizar dados de um usuário
export const addUser = async (userId, nome, email) => {
  try {
    // Referencia o documento pelo ID do usuário
    const userDoc = doc(db, 'usuarios', userId);

    // Define os dados do usuário
    const userData = {
      nome,
      email,
    };

    // Adiciona ou atualiza os dados do usuário
    await setDoc(userDoc, userData, { merge: true });

    console.log('Dados do usuário salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

// Função para adicionar uma resposta do usuário
export const addResposta = async (userId, pergunta, resposta) => {
  try {
    // Referencia o documento do usuário e a coleção de respostas
    const respostasCollection = doc(db, 'usuarios', userId, 'respostas', pergunta);

    // Adiciona a resposta ao documento
    await setDoc(respostasCollection, { resposta }, { merge: true });

    console.log('Resposta salva com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar resposta:', error);
  }
};

// Função para adicionar resultados finais do usuário
export const addResultados = async (userId, pontuacaoAnsiedade, pontuacaoDepressao) => {
  try {
    // Referencia o documento do usuário e a coleção de resultados
    const resultadosDoc = doc(db, 'usuarios', userId);

    // Define os dados dos resultados
    const resultadosData = {
      pontuacaoAnsiedade,
      pontuacaoDepressao,
    };

    // Adiciona ou atualiza os resultados
    await setDoc(resultadosDoc, resultadosData, { merge: true });

    console.log('Resultados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar resultados:', error);
  }
};

// Função para obter dados de um usuário específico
export const getUserData = async (email) => {
  try {
    // Referencia o documento do usuário pelo email
    const userDoc = doc(db, 'usuarios', email);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('Usuário não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
};


// VnAnvUvYnGPRRVQHvmz9b4LYmTz2