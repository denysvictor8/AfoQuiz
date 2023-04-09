import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Resultados = ({ route }) => {
    const navigation = useNavigation(route);
    const [acertos, setAcertos] = useState(route.params.acertos);
    const [erros, setErros] = useState(route.params.erros);
    

    const zerarTudo = () => {
        () => navigation.navigate('Home', {acertos: 0, erros:0})
    }

    return(
        <View style={ styles.container }>
            <View>
                <Text>
                    Total de acertos: { acertos }
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
      flex:1, 
      backgroundColor:"#f6d7b0",    
    },
    opcoes: {
      backgroundColor: '#34A0A4',
      padding: 12,
      paddingHorizontal: 16,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 30,
      alignItems: 'center',
    },
  })