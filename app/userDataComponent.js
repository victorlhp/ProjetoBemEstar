import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveUserData, getUserData } from './firestoreService'; // Importa as funções do firestoreService.js

const UserDataComponent = () => {
  const [userData, setUserData] = useState(null);

  // Dados de exemplo do usuário
  const email = 'email@example.com'; // Email do usuário
  const nome = 'Nome do Usuário'; // Nome do usuário
  const respostas = [
    { indice: 0, valor: 3 },
    { indice: 1, valor: 2 },
    // Outras respostas...
  ];
  const resultadoFinal = { ansiedade: 10, depressao: 8 };

  // Função para salvar os dados do usuário no Firestore
  const handleSaveData = async () => {
    await saveUserData(email, nome, respostas, resultadoFinal);
  };

  // Função para buscar os dados do usuário do Firestore
  const handleFetchData = async () => {
    const data = await getUserData(email);
    setUserData(data); // Atualiza o estado com os dados obtidos
  };

  return (
    <View style={styles.container}>
      <Button title="Salvar Dados" onPress={handleSaveData} />
      <Button title="Obter Dados" onPress={handleFetchData} />
      
      {userData && ( // Se userData não for null, exibe as informações do usuário
        <View style={styles.userDataContainer}>
          <Text>Nome: {userData.nome}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Resultado Ansiedade: {userData.resultadoFinal.ansiedade}</Text>
          <Text>Resultado Depressão: {userData.resultadoFinal.depressao}</Text>
          <Text>Respostas:</Text>
          {userData.respostas.map((resposta, index) => (
            <Text key={index}>Pergunta {resposta.indice}: {resposta.valor}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userDataContainer: {
    marginTop: 20,
  },
});

export default UserDataComponent;
