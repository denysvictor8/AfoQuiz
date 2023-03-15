import { Text, View } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, query, getDocs } from "firebase/firestore";
import { FlashList } from '@shopify/flash-list'

import db from '../util/firebaseConfig'

const Quiz = ({route}) => {

    const navigation = useNavigation(route);
    const [categoriaId] = useState(route.params.item.id);
    const [categoriaDesc] = useState(route.params.item.descricao);
    const [questoes, setQuestoes] = useState([]);

    useEffect(() => {

        async function getQuestoes(db) {
            try {
                const q = query(collection(db, 'quizzes/'+categoriaId+'/questoes'));
                const querySnapshot = await getDocs(q);
                const questoesLista = [];
                querySnapshot.forEach((doc) => {
                    questoesLista.push({...doc.data(), id: doc.id})
                });
                setQuestoes(questoesLista);
                //console.log(questoesLista);
            } catch (error) {
                console.log("Erro ao selecionar questoes :(");
            }
        }

        getQuestoes(db)
        console.log(questoes)

      }, []);

    return (
        <View style={{ flex:1 }}>
        <Text>Selecione uma das categorias abaixo:</Text>
        <FlashList
          data={questoes}
          estimatedItemSize={200}
          renderItem={({ item }) => 
            <View>
                <Text>
                  {item.titulo} {"\n"}
                  {item.correta} {"\n"}
                  {item.opcoes} {"\n"}
                </Text>
            </View>
          }
        />
      </View>
    )
}

export default Quiz;
