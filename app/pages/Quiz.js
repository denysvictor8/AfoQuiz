import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, query, getDocs } from "firebase/firestore";
import { FlashList } from '@shopify/flash-list'

import db from '../util/firebaseConfig'

const Quiz = ({ route }) => {
    const navigation = useNavigation(route);
    const [categoriaId] = useState(route.params.item.id);
    const [categoriaDesc] = useState(route.params.item.descricao);
    const [questoes, setQuestoes] = useState([]);
    const [ques, setQues] = useState(0);
    const [resultado, setResultado] = useState(0)
    const [respostas, setRespostas] = useState([]);
    const [carregado, setCarregado] = useState(false);
  
    async function getQuestoes(db) {
      try {
        const q = query(collection(db, 'quizzes/' + categoriaId + '/questoes'));
        const querySnapshot = await getDocs(q);
        const questoesLista = [];
        querySnapshot.forEach((doc) => {
          questoesLista.push({ ...doc.data(), id: doc.id })
        });
        setQuestoes(questoesLista);
        setCarregado(true);
      } catch (error) {
        console.log("Erro ao selecionar questoes :(" + error);
      }
    }
  
    useEffect(() => {
      getQuestoes(db);
      
    }, []);
  
    const navegarQuestao = (index) => {
      setQues(index);
    };
  
    const proximaQuestao = () => {
      if (ques < questoes.length - 1) {
        navegarQuestao(ques + 1);
      }
    };
  
    const anteriorQuestao = () => {
      if (ques > 0) {
        navegarQuestao(ques - 1);
      }
    };
  
    if (!carregado) {
      return (
        <View style={styles.container}>
          <Text>Aguarde, enquanto carregamos....</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.parent}>

          <View style={styles.top}>
            <Text style={styles.question}>{`${ques + 1}. ${questoes[ques].titulo}`}</Text>
          </View>
       
          <View style={styles.options}>
            {questoes[ques].opcoes.map((opcao, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => {
                  const respostaCorreta = questoes[ques].resposta;
                  const respostaSelecionada = index;
                  
                  if (respostaCorreta === respostaSelecionada) {
                    setResultado(resultado + 1);
                  }
                  setRespostas([...respostas, respostaSelecionada]);
                }}
              >
                <Text style={styles.option}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>
                    
          <View style={styles.bottom}>
            <TouchableOpacity
              style={[styles.button, ques === 0 ? styles.disabledButton : null]}
              onPress={anteriorQuestao}
              disabled={ques === 0}
            >
              <Text style={styles.buttonText}>Anterior</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.button, ques === questoes.length - 1 ? styles.disabledButton : null]}
              onPress={proximaQuestao}
              disabled={ques === questoes.length - 1}
            >
              <Text style={styles.buttonText}>Próxima</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    );
  };
  

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4', //0066B2
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});