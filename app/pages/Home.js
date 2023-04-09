import { Text, View, StyleSheet, Button, Pressable } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { FlashList } from '@shopify/flash-list'

import db from '../util/firebaseConfig'

const Home = () => {

  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {

    async function getQuizzes(db) {
      const q = query(collection(db, "quizzes"));
      const querySnapshot = await getDocs(q);
      const quizList = [];
      querySnapshot.forEach((doc) => {
        quizList.push({...doc.data(), id: doc.id})
      });
      setQuizzes(quizList);
      console.log(quizList)
    }
    getQuizzes(db)
  }, []);


  return (
    <View style={ styles.container }>
      <Text>Selecione uma das categorias abaixo:</Text>
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
                <Text styles={styles.titulo}>
                  {item.id}
                </Text>
                <Text>
                  {item.descricao}
                </Text>
              </View>
            </Pressable>
          </View>
        }
      />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:"#f6d7b0",    
  },
  opcoes: {
    backgroundColor: '#e7c496',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    alignItems: 'center',
  },
})