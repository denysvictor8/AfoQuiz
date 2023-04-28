import { Text, View, StyleSheet, Button, Pressable } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { FlashList } from '@shopify/flash-list'

import db from '../util/firebaseConfig'

const Home = () => {

  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {

    async function getQuizzes(db) {
      const q = query(collection(db, "quizzes"));
      const querySnapshot = await getDocs(q);
      const quizList = [];
      querySnapshot.forEach((doc) => {
        quizList.push({...doc.data(), id: doc.id})
      });
      setQuizzes(quizList);
      setCarregado(true);
      //console.log(quizList)
    }
    getQuizzes(db)
  }, []);


  if (!carregado) {
    return (
      <View style={styles.container}>
        <Text>Aguarde, enquanto carregamos as categorias....</Text>
      </View>
    );
  } else {
    return (
      <View style={ styles.container }>
        <Text style={ styles.titulo } >Selecione uma das categorias abaixo:</Text>
        <FlashList
          data={quizzes}
          estimatedItemSize={200}
          renderItem={({ item }) => 
            <View>
              <Pressable style={ styles.opcoes }
                onPress={ 
                    () => navigation.navigate('Quiz', {item})
                }
              >
                <View>
                  <Text style = { styles.id } >{item.id}</Text>
                  <Text>{item.descricao}</Text>
                </View>
              </Pressable>
            </View>
          }
        />
      </View>
    )
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:"#fff",    
  },
  opcoes: {
    backgroundColor: '#eee',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    //paddingHorizontal: 16,
    //marginBottom: 30,
  },
  titulo: {
    fontSize: 20,
    margin: 10,
  },
  id: {
    fontSize: 25,
    textAlign: 'left',
    paddingBottom: 5
  }
})