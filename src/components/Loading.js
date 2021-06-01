import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default Loading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  );
};
Loading.defaultProps = {
  isLoading: true,
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 1,
  },
  inner: {
    marginBottom: 80,
  },
});
