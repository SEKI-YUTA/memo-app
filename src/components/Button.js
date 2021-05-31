import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default Button = ({ label }) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
};
Button.defaultProps = {
  label: "Submit",
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#467df3",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 24,
    color: "#fff",
  },
});
