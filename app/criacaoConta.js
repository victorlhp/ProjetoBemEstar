import React, { useState } from 'react';
import { Alert, View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Adicionado useRouter para navegação
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importe o método de criação de usuário
import { auth } from './firebaseConfig'; // Importe a instância do auth inicializada


const CriarConta = () => {
  const [senhaVisivel, setSenhaVisivel] = useState(false); // Estado para controlar a visibilidade da senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [repetirSenhaVisivel, setRepetirSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Inicializar o hook useRouter

  // Função para alternar a visibilidade da senha
  const toggleMostrarSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const toggleRepetirSenha = () => {
    setRepetirSenhaVisivel(!repetirSenhaVisivel);
  };

  const validarSenha = (senha, repetirSenha) => {
    var validada = false;
    if(senha !== repetirSenha){
        Alert.alert('Senhas divergentes', 'As duas senhas estão com conteúdos diferentes. Para realizar o cadastro, é preciso que elas sejam iguais.');
    } else if(senha.length < 6) {
        Alert.alert('Senha fraca', 'A senha deve ter no mínimo 6 caracteres.');
    } else {
        validada = true;
    }
    return validada;
  };

  // Função para criar a conta
  const handleCriarConta = async () => {
    try {
    
    const validada = validarSenha(senha, repetirSenha);
    if(validada) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, senha);
      setLoading(false);
      router.replace('/');
  }
} catch (error) {
  console.error(error.code);
  console.error(error.message);
  setLoading(false);
}
  };
  

  return (
    <View style={styles.container}>
      {/* Logomarca ao fundo com efeito de marca d'água */}
      <ImageBackground
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logoBackground}
        resizeMode="contain"
      />

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.senhaContainer}>
          <TextInput
            placeholder="Senha"
            style={[styles.input, styles.senhaInput]}
            secureTextEntry={!senhaVisivel}
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={toggleMostrarSenha} style={styles.mostrarSenhaButton}>
            <Text style={styles.mostrarSenhaButtonText}>{senhaVisivel ? 'Esconder' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.repetirSenha}>
          <TextInput
            placeholder="Repetir Senha"
            style={[styles.input, styles.repetirInput]}
            secureTextEntry={!repetirSenhaVisivel}
            value={repetirSenha}
            onChangeText={setRepetirSenha}
          />
          <TouchableOpacity onPress={toggleRepetirSenha} style={styles.mostrarSenhaButton}>
            <Text style={styles.mostrarSenhaButtonText}>{repetirSenhaVisivel ? 'Esconder' : 'Mostrar'}</Text>
          </TouchableOpacity>
        </View>
        {/* Botão "Criar Conta" */}
        <Pressable style={styles.button} onPress={handleCriarConta}>
          <Text style={styles.buttonText}>Criar Conta</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF', // Cor de fundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    width: '100%',
    aspectRatio: 2, // Ajuste conforme necessário para a proporção da sua logomarca
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor de fundo com transparência para efeito de marca d'água
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ebebff',
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repetirSenha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senhaInput: {
    flex: 1,
  },
  repetirInput: {
    flex: 1,
  },
  mostrarSenhaButton: {
    marginLeft: 10,
    padding: 10,
  },
  mostrarSenhaButtonText: {
    color: 'black',
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
    height: 62,
    backgroundColor: '#6666ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default CriarConta;
