import React, {useState} from 'react';
import { View,Text, StyleSheet, Button, Platform, TextInput, TouchableWithoutFeedback, Image, Keyboard, Alert } from 'react-native';
import * as bus from 'bus-promise';

console.disableYellowBox = true;

const TelaInicial = (props) => {

    const [texto, setTexto] = useState('');

    const capturaTexto = (textoDigitado) => {
        setTexto(textoDigitado);
    }

    const getLines = (auth) => {
        bus.find({
            auth,
            type: 'lines',
            terms: texto
          }).then((response) => {
              props.navigation.navigate("Resultado" , {resultado: response})
          })
    }

    const fazConsulta = () =>{
        if(texto.trim() != ""){
            bus.auth('5c32ec06af1099b7310a9e195a66981b80375eb3adc5fd90c4615dfb27347a3c')
            .then(getLines)
        } else {
            Alert.alert('Erro', 'Você precisa inserir alguma informação para pesquisar.', [
            { text: "OK", onPress: () => console.log("OK Pressed")}
        ]);
        }

    }
    
  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={estilos.container}>
                    
            <Text style={estilos.title}> SPLinhas </Text>
            <Image 
                style={estilos.image}
                source={require('../assets/logo.png')}
            />
            <Text style={estilos.body}> Informe aqui a linha que deseja buscar </Text>
            <TextInput
                style={estilos.search}
                placeholder='Exemplo: Lapa ou 809L'
                onChangeText={capturaTexto}
                value={texto}
                
            />  
            
            <Button
                title = "Buscar"
                color = '#20B2AA'
                onPress={fazConsulta}
            />
        </View>
    </TouchableWithoutFeedback>
  );
}

TelaInicial.navigationOptions = dadosNav => {
    return {
        headerTitle: "Tela Inicial"
    }
}


const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding:5
    },
    title: {
        fontSize: 40,
        paddingBottom: 5,
        fontWeight: "bold",
        paddingTop: 50
    },
    body: {
        fontSize: 15,
        paddingBottom: 10,
        paddingTop: 25,
        marginTop: 10
    },
    search: {
        height: 40, 
        width: 300,
        borderBottomColor: '#20B2AA', 
        borderBottomWidth: 1,
        marginBottom: 10
    },
      button: {
        marginTop: 30,
        color: '#20B2AA',
        fontSize: 20
    },
    image:{
        width: 100,
        height: 100
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    item: {
        fontSize: 14,
        padding: 2,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        alignSelf: 'flex-start'
    },
    div: {
        alignSelf: 'flex-start'
    },
    access:{
        fontSize: 32,
        marginBottom: 10,
        marginTop: 5,
        padding: 1,
        color: '#20B2AA'
    },
})

export default TelaInicial;