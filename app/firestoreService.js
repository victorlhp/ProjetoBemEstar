// Importa o Firestore do Firebase
import firestore from '@react-native-firebase/firestore';

// Função para adicionar ou atualizar dados de um usuário
export const saveUserData = async (email, nome, respostas, resultadoFinal) => {
  try {
    // Referencia o documento pelo email do usuário (ou outro identificador único)
    const userDoc = firestore().collection('usuarios').doc(email);

    // Define os dados do usuário
    const userData = {
      nome,
      email,
      respostas,
      resultadoFinal
    };

    // Adiciona ou atualiza os dados do usuário
    await userDoc.set(userData, { merge: true });

    console.log('Dados do usuário salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

// Função para obter dados de um usuário específico
export const getUserData = async (email) => {
  try {
    const userDoc = await firestore().collection('usuarios').doc(email).get();

    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log('Usuário não encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    return null;
  }
};
