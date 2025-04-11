import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from 'expo-router';
import { useState } from "react";
import BottomNav from "./components/BottomNav";


export default function AddQuiz() {

    const router=useRouter();

    const [question,setQuestion]=useState<string>("");
    const [option1,setOption1]=useState<string>("");
    const [option2,setOption2]=useState<string>("");
    const [option3,setOption3]=useState<string>("");
    const [option4,setOption4]=useState<string>("");
    const [correctAnswer,setCorrectAnswer]=useState<string>("");

    const handleSubmit = async () => {
      interface Quiz {
        question: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        correctAnswer: string;
      }
    
      const quizData: Quiz = {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
      };

      try
      {
        const response = await fetch("http://192.168.153.215:3000/quizs", {
          method: 'POST',
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(quizData)
        });
         
      const data=await response.json()
      console.log(data);
      

        if (response.ok){
          Alert.alert("Success", data.message || "Quiz submitted successfully!");
          setQuestion("");
          setOption1("");
          setOption2("");
          setOption3("");
          setOption4("");
          setCorrectAnswer("");
          router.push("/")
        }
        else
        {
          Alert.alert("Error","Failed to submit quiz");
        }
      }
      catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert("Error", error.message);
          console.error(error.message);
        }
      }
      

    };
    

  return (
    <View style={styles.container}>
    <Text style={styles.topnav}>Quiz Hub</Text>

    <ScrollView>
      <Text style={styles.title}>Create a Quiz </Text>

      <Text>Question</Text>
      <TextInput style={styles.question} value={question} onChangeText={setQuestion}></TextInput>

      <Text>Option 1</Text>
      <TextInput style={styles.option1} value={option1} onChangeText={setOption1}></TextInput>

      <Text>Option 2</Text>
      <TextInput style={styles.option2} value={option2} onChangeText={setOption2}></TextInput>

      <Text>Option 3</Text>
      <TextInput style={styles.option3} value={option3} onChangeText={setOption3}></TextInput>

      <Text>Option 4</Text>
      <TextInput style={styles.option4} value={option4} onChangeText={setOption4}></TextInput>

      <Text style={styles.correct}>Correct Answer</Text>
      <TextInput style={styles.correctAnswer} value={correctAnswer} onChangeText={setCorrectAnswer}></TextInput>

      <Button title="Submit Quiz" onPress={handleSubmit}></Button>
      </ScrollView>
     
    <BottomNav></BottomNav>
      
      
      
    </View>
  );
}

const styles= StyleSheet.create({
  topnav:{
    fontSize:25,
    marginTop:4,
    marginBottom:2,
    marginLeft:10
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize:22,
    marginTop:20

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
  }
})

 