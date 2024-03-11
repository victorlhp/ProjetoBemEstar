import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {useState} from 'react'
import Calculadora  from './Calculadora';

const getNomeCompleto = (nome, sobrenome) => {
  return nome + ' ' + sobrenome;
}

const Cat = ({nome, sobrenome, idade}) => {
  let texto = (idade <=1) ? "ano" : "anos"
  
  return <Text>Oi, Eu sou {getNomeCompleto(nome, sobrenome).toUpperCase()}, e eu tenho {(idade)} {texto}</Text>
}

export default Calculadora;

function IFAL() {

    
    const [cliques, setCliques] = useState(0);
  return (
    <View style={styles.container}>
      <Cat nome="Black" sobrenome="Panterinha" idade={3} />
      <Cat nome="Garfield" sobrenome="Lasanha" idade={4}/>
      <Cat nome="Apolo" sobrenome="God" idade={1}/>
      <StatusBar style="auto" />
    {/* Botoẽs */}
    <Button title="Click" onPress={() => {
      setCliques(cliques + 1);
    }} />
    <Button title="Zerar" onPress={()=>
      setCliques(0)
  }/>
    <Text>Quantidade de cliques: {cliques}</Text>

    <Text></Text>
    </View>


  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
