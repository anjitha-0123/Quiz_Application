import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Quiz {
  _id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}

export default function QuizCard({ quiz }: { quiz: Quiz[] }) {

  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [isCorrect, setIsCorrect] = useState<{ [key: string]: boolean }>({});

  const handleSelect = (quizId: string, selected: string, correct: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [quizId]: selected }));
    setIsCorrect((prev) => ({ ...prev, [quizId]: selected === correct }));
  };

  const handleDelete = async (id: string) => {
    try {
    const res=  await fetch(`http://192.168.153.215:3000/quizs/${id}`, {
        method: 'DELETE',
      });
      if (res.ok)
      {
        alert("Quiz deleted successfully");
      }
      else
      {
        alert("Failed to delete quiz");
      } 
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  return (
    <View>
      {quiz.map((quizItem) => (
        <View key={quizItem._id} style={styles.quizCard}>
          <Text style={styles.quizQuestion}>{quizItem.question}</Text>

          {["option1", "option2", "option3", "option4"].map((opt, idx) => {
            const labels = ["A", "B", "C", "D"];
            const label = labels[idx];
            const value = quizItem[opt as keyof Quiz];
            const isSelected = selectedAnswers[quizItem._id] === value;
            const isAnswerCorrect = isCorrect[quizItem._id];

            return (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.optionButton,
                  isSelected && (isAnswerCorrect ? styles.correctOption : styles.incorrectOption),
                ]}
                onPress={() => handleSelect(quizItem._id, value, quizItem.correctAnswer)}
              >
                <Text style={styles.optionText}>{label}. {value}</Text>
              </TouchableOpacity>
            );
          })}

          {selectedAnswers[quizItem._id] && (
            <Text style={styles.feedback}>
              {isCorrect[quizItem._id] ? "✅ Correct Answer" : "❌ Incorrect"}
            </Text>
          )}
      <View style={styles.editdash}>
      <TouchableOpacity onPress={()=> router.push(`/UpdateQuiz?id=${quizItem._id}`)}>
        <Text style={styles.update}>UPDATE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(quizItem._id)}>
        <Text style={styles.delete}>DELETE</Text>
      </TouchableOpacity>
      </View>
        </View>
      ))}
     
    </View>
  );
}
const styles = StyleSheet.create({
  
    quizCard: {
    width:300,
    height:350,
    backgroundColor:"#5f9ea0",
    borderBlockColor:"#00008b",
    borderWidth:2,
    padding:4,
    margin:4

  },
    quizQuestion: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    optionButton: {
      backgroundColor: "#e0e0e0",
      padding: 10,
      borderRadius: 8,
      marginVertical: 4,
    },
    optionText: {
      fontSize: 16,
    },
    correctOption: {
      backgroundColor: "#c8e6c9", 
    },
    incorrectOption: {
      backgroundColor: "#ffcdd2", 
    },
    feedback: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
    },
    update:{
      backgroundColor: "#ff00ff",
      padding: 10,
      borderRadius: 8,
      marginVertical: 4,
      width:100,
      height:40
    },
    delete:{
      backgroundColor:"#b22222",
      padding: 10,
      borderRadius: 8,
      marginVertical: 4,
      width:100,
      height:40
    },
    editdash:{
      flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    paddingHorizontal: 20, 
    marginTop: 20
      

    }
  });
  