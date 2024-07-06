import { Text, View, Button } from 'react-native';
import { useState } from 'react';

const perguntas = [
  {
    enunciado: 'Pergunta 1',
  },
  {
    enunciado: 'Pergunta 2',
  },
  {
    enunciado: 'Pergunta 3',
  },
];

export default function App() {
  const [indice, setIndice] = useState(0);
  const [houveReposta, setHouveResposta] = useState(false);

  handlePress = () => {
    setIndice(indice + 1);
  };

  return (
    <View>
      <Text>{perguntas[indice].enunciado}</Text>
      <Button title="Próximo" onPress={handlePress} disabled={!houveReposta} />
    </View>
  );
}