import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppBar from "./src/components/AppBar";
import MemoList from "./src/components/MemoList";
import CircleButton from "./src/components/CircleButton";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f0f4f8",
  },
});