import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GrediantContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={["black", "#11022E", "black"]}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GrediantContainer;
