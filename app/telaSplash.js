import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('index'); // Navegar para a tela de login (BemEstar.js) após 5 segundos
    }, 5000); // 5000 milissegundos = 5 segundos

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Sua logomarca */}
      <Image
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCFF', // Cor de fundo igual à tela de login
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 248, // Ajuste conforme necessário
    height: 218, // Ajuste conforme necessário
    resizeMode: 'contain',
  },
});

export default SplashScreen;
