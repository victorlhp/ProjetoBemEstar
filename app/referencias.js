import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';



const TelaPersonalizada = () => {
  return (
    <View style={styles.container}>
      {/* Logomarca ao fundo com efeito de marca d'água */}
      <View style={styles.text}>
      <ImageBackground
        source={require('./../assets/logoBemEstar.png')}
        style={styles.logoBackground} imageStyle={{opacity: 0.2}}
        resizeMode="cover"
      >
      <Text style={styles.textContainer}>Escala HAD - Avaliação do nível de ansiedade e depressão (Universidade Estadual Paulista "Júlio de Mesquita Filho")</Text>
      <Text style={styles.textContainer}>Referências: Zigmond, A.S.7 Snaith,R.P. The Hospital Anxiety and Depression Scale. Acta Psychiatrica Scandinavica 1983; 67,361-370 Botega NJ Bio MR, Zomignami MA, Garcia JR C, Pereira WAB. Transtornos do humor em enfermaria de clínica médica e validação de escala de medida (HAD) de ansiedade e depressão. Revista de Saúde Pública, 29(5): 355-63, 1995.</Text>
      </ImageBackground>
      </View>

         <View style={styles.button2}>
      <Link href="perguntas" asChild>
      <Button style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}} mode='text' onPress={()=>
      console.log('Iniciar')} labelStyle={{ color: 'black', fontSize: 18}}>
        Iniciar
      </Button>
      </Link>
        </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ed9', // Cor de fundo
  },
  
  logoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 415, // Largura da logomarca
    height: 700, // Altura da logomarca
    
  },
  
  textContainer: {
    fontStyle:'italic',
    justifyContent: 'center',
    flexDirection:'column',
    alignItems:'center',
    fontSize: 25,
  },
  
  text: {
    flex: 9,
    color: '#333', // Cor do texto
    marginHorizontal: 15,
  },
  
   button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        top: 83,
        
  },

  button2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
},
  
});

export default TelaPersonalizada;
