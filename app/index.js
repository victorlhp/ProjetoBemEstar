import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router'

const getNomeCompleto = (nome, sobrenome) => {
  return nome + ' ' + sobrenome;
}

const Cat = ({nome, sobrenome, idade}) => {
  let texto = (idade <=1) ? "ano" : "anos"
  
  return <Text>Oi, Eu sou {getNomeCompleto(nome, sobrenome).toUpperCase()}, e eu tenho {(idade)} {texto}</Text>
}



function IFAL() {

    
    
  return (
    <View style={styles.container}>
      <Cat nome="Black" sobrenome="Panterinha" idade={3} />
      <Cat nome="Garfield" sobrenome="Lasanha" idade={4}/>
      <Cat nome="Apolo" sobrenome="God" idade={1}/>
      <StatusBar style="auto" />
    
    
    
    <Link href="/calculadora">Abrir Calculadora</Link>
    <Link href="/calculadora" asChild>
      <Pressable>
        <Text>Abrir Calculadora com o Pressable</Text>
      </Pressable>
    </Link>  
    <Link href="/cliques" asChild>
      <Button title="Abrir Contador de Cliques"/>
    </Link>
    <StatusBar style="auto"/>


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

export default IFAL;
