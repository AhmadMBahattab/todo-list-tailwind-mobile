import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GrediantContainer from "./app/components/GrediantContainer";
import Home from "./app/screens/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <GrediantContainer>
        <StatusBar />
        <Home />
      </GrediantContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
