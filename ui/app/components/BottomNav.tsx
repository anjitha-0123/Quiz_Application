import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";


export default function BottomNav(){
   const router=useRouter()

return(
    <View style={styles.navbar}>
    <TouchableOpacity onPress={() => router.push("/")}>
      <Text style={styles.tab}>Quiz Hub</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => router.push("/AddQuiz")}>
      <Text style={styles.tab}>Add Quiz</Text>
    </TouchableOpacity>
   
  </View>
)
}


const styles = StyleSheet.create({
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
})