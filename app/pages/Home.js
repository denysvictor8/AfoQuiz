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
    <View style={{ flex:1 }}>
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
              <Text>
                {item.id} {"\n"}
                {item.descricao}
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  opcoes: {
    fontSize: 24,
    color: 'blue',
    backgroundColor: 'yellow',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    borderBottomWidth: 1/2,
    borderLeftWidth: 1/2,
  }
})