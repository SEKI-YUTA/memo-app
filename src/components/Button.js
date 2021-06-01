import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default Button = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};
Button.defaultProps = {
  label: "Submit",
  onPress: null,
  style: null,
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
