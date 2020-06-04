import React, {useState} from 'react';
import { View, Platform, Text, Image, Alert, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import BotaoCabecalho from '../componentes/BotaoCabecalho';

console.disableYellowBox = true;

const TelaMapa = (props) => {

  const [linha, setLinha] = useState(props.navigation.getParam('lin'))

  const[linhaMap, setLinhaMap] = useState(props.navigation.getParam('cordMap'))
  const[primeiro, setPrimeiro] = useState(props.navigation.getParam('posInical'))
  const[ultimo, setUltimo] = useState(props.navigation.getParam('posFinal'))
  const [posicoes, setPosicoes] = useState(props.navigation.getParam('posicaoBus'))
  const [posicaoPessoa, setPosicaoPessoa] = useState(props.navigation.getParam('posPessoa'))

  console.log(posicaoPessoa.lat)
  console.log(posicaoPessoa.lng)


  let latitude = (parseFloat(ultimo.latitude) + parseFloat(primeiro.latitude)) / 2;
  let longitude = (parseFloat(ultimo.longitude) + parseFloat(primeiro.longitude)) / 2;

  let position = <Marker coordinate={{latitude: 0, longitude: 0}}/>


  console.log(posicoes.vehicles)

  
  if(posicoes.vehicles === null){
    Alert.alert(
      'Onibus não encontrado',
      'Nenhuma onibus em operação no momento.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

  }else{
    
      position = posicoes.vehicles.map((pos) =>
      
      
        <MapView.Marker key= {pos.lat.toString()}
              coordinate={{latitude: parseFloat(pos.lat) , longitude: parseFloat(pos.lng)}}
            > 
              <Image 
                style={estilos.imagem}
                source={require('../assets/Onibus1.png')}/>
        </MapView.Marker>
      )

  }

  
  return (
            
     <View style={estilos.container}> 
        <Text>Linha destino selecionada:</Text> 
        {
          linha.item.direction === 2 ?
          <Text style={estilos.linha}> {linha.item.secondaryTerminal} </Text>
          :
          <Text style={estilos.linha}> {linha.item.mainTerminal} </Text>
        }
        <MapView
          style= {estilos.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapView.Marker
            coordinate={{latitude: parseFloat(primeiro.latitude) , longitude: parseFloat(primeiro.longitude)}}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoInicial.png')}/>
              <Callout>
                <Text> Inicio do Trajeto </Text>
            </Callout>
          </MapView.Marker> 
          <MapView.Marker
            coordinate={{latitude: parseFloat(ultimo.latitude) , longitude: parseFloat(ultimo.longitude)}}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoFinal.png')}/>
            <Callout>
              <Text> Fim do Trajeto </Text>
            </Callout>
          </MapView.Marker> 

          {position}

          <MapView.Marker
              coordinate={{latitude: posicaoPessoa.lat , longitude: posicaoPessoa.lng}}
            > 
              <Image 
                style={estilos.imagem}
                source={require('../assets/mapas-e-localizacao.png')}/>
          </MapView.Marker>
          
          <Polyline
            coordinates={linhaMap}
            strokeColor='#04B4AE'
            strokeWidth={6}
          />



        </MapView>
  
    </View>
  );
}

TelaMapa.navigationOptions = dadosNav => {
  return {
    headerTitle: "Trajeto",        
    headerRight:            
    <HeaderButtons                
      HeaderButtonComponent={BotaoCabecalho}>                
      <Item                    
        title="Adicionar"                    
        iconName={Platform.OS === 'android' ? 'md-home' : 'ios-home'}                    
        onPress={() => { dadosNav.navigation.navigate("Inicial") }} 
        /> 
     </HeaderButtons> 
  }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding:5
  },
  map: {
    height: '100%',
    width: '100%',
  },
  imagem: {
    height: 40,
    width: 40,
  },
  linha: {
    fontWeight: "bold",
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#20B2AA'
  },
  homeButton: {
    paddingBottom: 5
  },
})

export default TelaMapa;