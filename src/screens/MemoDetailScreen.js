import { dateToString } from "../utils";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AppBar from "../components/AppBar";
import CircleButton from "../components/CircleButton";
import firebase from "firebase";

export default MemoDetailScreen = ({ navigation, route }) => {
  const [memo, setMemo] = useState(null);
  const { id } = route.params;
  console.log(id);
  let unSub = () => {};
  useEffect(() => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unSub = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data.bodyText,
          updateAt: data.updateAt.toDate(),
        });
      });
    }
    return unSub;
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo && memo.bodyText}
        </Text>
        <Text style={styles.memoDate}>
          {memo && dateToString(memo.updateAt)}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.memoBodyInner}>
          <Text style={styles.memoText}>{memo && memo.bodyText}</Text>
        </View>
      </ScrollView>
      <CircleButton
        style={{ top: 60, bottom: "auto" }}
        name="edit-2"
        onPress={() => {
          navigation.navigate("MemoEdit", {
            id: memo.id,
            bodyText: memo.bodyText,
          });
        }}
      />
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
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  memoBodyInner: {
    paddingTop: 32,
    paddingBottom: 80,
    paddingHorizontal: 27,
  },
});
