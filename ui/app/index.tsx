import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import QuizCard from "./components/QuizCard";
import BottomNav from "./components/BottomNav";

interface Quiz {
  _id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}

export default function QuizHub() {
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('http://192.168.153.215:3000/quizs');
      const data = await response.json();
      setQuizData(data);
    } catch (err: any) {
      setError("Failed to fetch quizzes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Welcome to Quiz Hub!</Text>
        <Image source={require('../assets/images/Quiz.jpg')} style={styles.quizimage} />
        <Text style={styles.subtext}>Browse and manage quizzes below.</Text>

        {loading ? (
          <Text>Loading quizzes...</Text>
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          <QuizCard quiz={quizData}  /> 
        )}
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingBottom:60
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#555",
  },
  quizimage: {
    width: 300,
    height: 150,
    marginBottom: 15,
  }
});

