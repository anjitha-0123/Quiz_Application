

import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, ScrollView, TextInput, View, Text, StyleSheet } from 'react-native';
import BottomNav from './components/BottomNav';

export default function UpdateQuiz() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // get quiz ID from route

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Fetch existing quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://192.168.153.215:3000/quizs/${id}`); // Replace with your backend URL
        const data = await response.json();
        setQuestion(data.question);
        setOption1(data.option1);
        setOption2(data.option2);
        setOption3(data.option3);
        setOption4(data.option4);

        setCorrectAnswer(data.correctAnswer);
      } catch (error) {
        console.error('Failed to load quiz', error);
      }
    };

    if (id) fetchQuiz();
  }, [id]);

  const handleUpdate = async () => {
    try {
    //   await fetch(`http://192.168.6.93:3000/quizs/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body:JSON.stringify({
    //       question,
    //       option1,
    //       option2,
    //       option3,
    //       option4,
    //       correctAnswer,
    //     })
        
    //   });

    //   alert("Quiz updated successfully!");
    //   router.back(); // Navigate back after update
    //
    const res = await fetch(`http://192.168.153.215:3000/quizs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
              option1,
              option2,
              option3,
              option4,
              correctAnswer,
      }),
    });
    
    const result = await res.json();
    console.log("Update response:", result);
    alert("Quiz updated successfully!");
    router.back(); 

     } 
    catch (error) {
      console.error('Failed to update quiz', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Update Quiz</Text>

        <Text>Question</Text>
        <TextInput style={styles.question} value={question} onChangeText={setQuestion} />

        <Text>Option 1</Text>
        <TextInput style={styles.option1} value={option1} onChangeText={setOption1} />

        <Text>Option 2</Text>
        <TextInput style={styles.option2} value={option2} onChangeText={setOption2} />

        <Text>Option 3</Text>
        <TextInput style={styles.option3} value={option3} onChangeText={setOption3} />

        <Text>Option 4</Text>
        <TextInput style={styles.option4} value={option4} onChangeText={setOption4} />

        <Text style={styles.correct}>Correct Answer</Text>
        <TextInput style={styles.correctAnswer} value={correctAnswer} onChangeText={setCorrectAnswer} />

        <Button title="Update Quiz" onPress={handleUpdate} />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
    topnav:{
        fontSize:25,
        marginTop:4,
        marginBottom:2,
        marginLeft:10
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  question:{
    borderBlockColor:"#ccc",
    borderWidth:3,
    width:300,
    height:60,
  },
  option1:{
    borderBlockColor:"#ccc",
    borderWidth:1,
    width:300,
    height:40,
    marginTop:8
  },
  option2:{
    borderBlockColor:"#ccc",
    borderWidth:1,
    width:300,
    height:40,
    marginTop:2
  },
  option3:{
    borderBlockColor:"#ccc",
    borderWidth:1,
    width:300,
    height:40,
    marginTop:2
  },
  option4:{
    borderBlockColor:"#ccc",
    borderWidth:1,
    width:300,
    height:40,
    marginTop:2
  },
  correct:{
    marginTop:30,
    marginBottom:2
  },
  correctAnswer:{
    borderBlockColor:"#ccc",
    borderWidth:1,
    width:300,
    height:40,
    marginTop:3,
    marginBottom:35
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f8f8f8",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tab: {
    fontSize: 16,
    color: "#333",
  },
});
