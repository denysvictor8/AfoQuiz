import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Resultados = ({ route }) => {
    const navigation = useNavigation();
    const [acertos, setAcertos] = useState(route.params.acertos);
    const [erros, setErros] = useState(route.params.erros);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // remove o botão de volta
        });
    }, [navigation]);

    useEffect(() => {
      renderizarImagem();
    }, []);

    const renderizarImagem = () => {
      if (acertos > erros ) {
        return (
          <Image
            style={styles.imagem}
            source={require('../../assets/res_acertos.png')}
          />
        );
      } else {
          <Image
          style={styles.imagem}
          source={require('../../assets/res_erros.png')}
        />
      }
    };      

    return(
        <View style={ styles.container }>
          <View>
            <Text style = { styles.titulo }>
                Total de acertos: { acertos }
                {'\n'}
                Total de erros: { erros }
            </Text>
          </View>
          <View style={ styles.opcoes }>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home', {acertos: 0, erros:0})}
            >
              <Text>Voltar ao início</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}

export default Resultados;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    opcoes: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#f0ad4e',
      borderRadius: 10,
      marginTop: 20,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  });  
