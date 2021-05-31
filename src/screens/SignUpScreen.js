import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
export default SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.inner}>
        <Text style={styles.title}>Sign UP</Text>
        <TextInput style={styles.input} value="email address" />
        <TextInput style={styles.input} value="password" />
        <Button label="Sign UP!" />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registerd</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Log in!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
  },

  footerText: {
    fontSize: 14,
    lineHeight: 24,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467df3",
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
  },
});
