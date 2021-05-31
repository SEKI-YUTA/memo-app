import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default CircleButton = ({ name, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.circleButton, style]} onPress={onPress}>
      <Feather name={name} size={32} color="white"></Feather>
    </TouchableOpacity>
  );
};

CircleButton.defaultProps = {
  style: null,
  name: null,
  onPress: null,
};
const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: "#467fd3",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 40,
    bottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  circleButtonLabel: {
    color: "#fff",
    fontSize: 40,
    lineHeight: 40,
  },
});
