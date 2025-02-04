import React, {useEffect, useState} from 'react'
import {
  View, Text, TextInput, ScrollView,
  Image, TouchableOpacity, Alert, FlatList, VirtualizedList
}
  from 'react-native'
import estilo from './Estilo'
import axios from 'axios'
 
const App = () => {
  const [texto, setTexto] = useState([]);
  const [clicou, setClicou] = useState(false);
  const [entrada, setEntrada] = useState('');
 
  const pesquisa = () => {
    axios.get('https://www.omdbapi.com/?apikey=d8a44ab&type=movie&r=json&page=1&s=love')
    .then((response)=>{
      setTexto(response.data)
    })
    .catch((error)=> {
      console.log(error);
    });
  }
 
  useEffect(()=>{
    if(clicou == true) {
      //Alert.alert('Botão foi acionado ' + (entrada) )
      //setTexto(entrada)
      pesquisa()
    }
    return ()=>{
      setClicou(false)
    }
  }, [clicou])
 
  const Item = ({titulo, capa}) => {
    return (
      <View style={estilo.container}>
        <Text>{titulo}</Text>
        <Image source={{uri:capa}} 
          style={{width:150, height:200, borderRadius:3, margin:30}} 
        />
      </View>
    )
  }

  return (
    <ScrollView>
    <View style={estilo.container}>
      <Text style={estilo.texto}>{JSON.stringify(texto.Search)}</Text>
 
      <TextInput style={estilo.caixa}
        value={entrada}
        onChangeText={(e)=>setEntrada(e)} />
 
      <TouchableOpacity style={estilo.botao}
        onPress={()=>setClicou(true)}
      >
        <Text style={estilo.textoBotao}>BUSCAR DADOS</Text>
      </TouchableOpacity>

      <FlatList
        data={texto.Search}
        renderItem={({item})=><Item titulo={item.Title} capa={item.Poster} />}
        keyExtractor={(item)=>item.imdbID}
      />

    </View>
    </ScrollView>
  )
}
 
export default App;