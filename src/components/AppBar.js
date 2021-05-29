import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default AppBar = () => {
  return (
    <View style={styles.appBar}>
      <View style={styles.appBarInner}>
        <Text style={styles.appBarTitle}>Memo App</Text>
        <Text style={styles.appBarRight}>ログアウト</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    width: "100%",
    height: 104,
    backgroundColor: "#467fd3",
    justifyContent: "flex-end",
  },
  appBarInner: {
    // backgroundColor: "gray",
    alignItems: "center",
  },
  appBarRight: {
    position: "absolute",
    right: 19,
    bottom: 14,
    color: "rgba(255,255,255,.8)",
  },
  appBarTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});
