import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const getNomeCompleto = (nome, sobrenome) => {
  return nome + ' ' + sobrenome;
}

const Cat = ({nome, sobrenome, idade}) => {
  let texto = (idade <=1) ? "ano" : "anos"
  
  return <Text>Oi, Eu sou {getNomeCompleto(nome, sobrenome).toUpperCase()}, e eu tenho {(idade)} {texto}</Text>
}

export default IFAL;

function IFAL() {
  return (
    <View style={styles.container}>
      <Cat nome="Black" sobrenome="Panterinha" idade={3} />
      <Cat nome="Garfield" sobrenome="Lasanha" idade={4}/>
      <Cat nome="Apolo" sobrenome="God" idade={1}/>
      <StatusBar style="auto" />
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
