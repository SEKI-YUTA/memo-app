import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";

export default MemoDetailScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2021/05/30 10:00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          買い物リスト。書体やレイアウトなどを確認するために用います。
          本文用なので使い方を間違えると不自然に見えることもありますので要注意。
        </Text>
      </ScrollView>
      <CircleButton style={{ top: 160, bottom: "auto" }} name="edit-2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  memoHeader: {
    backgroundColor: "#467fd3",
    height: 96,
    justifyContent: "center",
    paddingHorizontal: 19,
    paddingVertical: 24,
  },
  memoTitle: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 32,
    fontWeight: "bold",
  },
  memoDate: {
    fontSize: 12,
    color: "#fff",
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
