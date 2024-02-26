import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Cat = () => {
  return <Text>Hello, I am a Cat!</Text>
}

export default Cat;

function App() {
  return (
    <View style={styles.container}>
      <Text>Victor</Text>
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
