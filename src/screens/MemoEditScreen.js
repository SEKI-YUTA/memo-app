import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";
import KeyboardSafeView from "../components/KeyboardSafeView";
import firebase from "firebase";
import { translateErrors } from "../utils";

export default MemoEditScreen = ({ navigation, route }) => {
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  const handlePress = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref
        .set(
          {
            bodyText: body,
            updateAt: new Date(),
          },
          { merge: true }
        )
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          const errorMsg = translateErrors(err.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        });
    }
  };

  console.log(id);
  return (
    <KeyboardSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => {
            setBody(text);
          }}
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
