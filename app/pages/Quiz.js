import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, query, getDocs } from "firebase/firestore";
import { FlashList } from '@shopify/flash-list'

import db from '../util/firebaseConfig'

const Quiz = ({ route }) => {
  const navigation = useNavigation(route);
  const [categoriaId] = useState(route.params.item.id);
  const [questoes, setQuestoes] = useState([]);
  const [ques, setQues] = useState(0);
  const [carregado, setCarregado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  
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
    if (ques < questoes.length - 1 ) {
      navegarQuestao(ques + 1);
    } else {
      fimQuiz()
    }
  };

  const fimQuiz = () => {
    navigation.navigate('Resultados', {erros, acertos})
  }

  const verificarResposta = (opMarcada, opCorreta) => {
    if (opMarcada == opCorreta) {
      setAcertos((prevAcertos) => prevAcertos + 1);
    } else {
      setErros((prevErros) => prevErros + 1);
    }
    proximaQuestao();
  };

  
  if (!carregado) {
    return (
      <View style={styles.container}>
        <Text>Aguarde, enquanto carregamos....</Text>
      </View>
    );
  } else{
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
                  var opMarcada = opcao;
                  var opCorreta = questoes[ques].correta;
                  verificarResposta(opMarcada, opCorreta)
                }}
              >
                <Text style={styles.option}>{opcao}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </View>
    );
  }
};
  

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
    backgroundColor:"#fff", 
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
    backgroundColor: '#eee',
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
    color: '#000',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#eee', //0066B2
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});