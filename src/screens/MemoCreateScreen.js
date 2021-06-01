import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";
import firebase from "firebase";

export default MemoCreateScreen = ({ navigation }) => {
  const [bodyText, setBodyText] = useState("");
  const handlePress = () => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`);

    ref
      .add({ bodyText: bodyText, updateAt: new Date() })
      .then((docRef) => {
        console.log("Created!", docRef.id);
        navigation.goBack();
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <CircleButton name="check" onPress={handlePress} />
    </KeyboardSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
  },
});
