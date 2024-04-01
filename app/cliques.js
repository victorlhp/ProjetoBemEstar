import {useState} from 'react'
import { Button, Text, View } from 'react-native'

const Cliques = () => {
    

const [cliques, setCliques] = useState(0);
    return (
<View>
<Button title="Click" onPress={() => {
      setCliques(cliques + 1);
    }} />
    <Button title="Zerar" onPress={()=>
      setCliques(0)
  }/>
  <Text>Quantidade de cliques: {cliques}</Text>
  </View>

    );
}

export default Cliques;