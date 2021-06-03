import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppBar from "../components/AppBar";
import Button from "../components/Button";
import firebase from "firebase";
import Loading from "../components/Loading";
import { translateErrors } from "../utils";
import { isFuture } from "date-fns";
import { Feather } from "@expo/vector-icons";

export default LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [secureFlg, setSecureFlg] = useState(true);

  useEffect(() => {
    const unSub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      } else {
        setLoading(false);
      }
    });
    return unSub;
  }, []);

  const handlePress = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: "MemoList" }],
        });
      })
      .catch((err) => {
        const errorMsg = translateErrors(err.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="password"
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={secureFlg}
          />
          <Feather
            name={secureFlg ? "eye-off" : "eye"}
            size={24}
            color="black"
            onPress={() => {
              setSecureFlg(!secureFlg);
            }}
          />
        </View>

        {/* <TextInput
          value="テスト"
          style={styles.input}
          // secureTextEntry={false}
          textContentType="password"
        /> */}
        <Button label="Submit" onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not register?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "SignUp" }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 16,
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
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
