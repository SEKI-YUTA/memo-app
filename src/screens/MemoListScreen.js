import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { View, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";

export default MemoListScreen = ({ navigation }) => {
  const [memos, setMemos] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unSub = () => {};
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy("updateAt", "desc");
      unSub = ref.onSnapshot(
        (snapshot) => {
          const userMemos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            console.log(doc.id, doc.data());
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updateAt: data.updateAt.toDate(),
            });
          });
          setMemos(userMemos);
        },
        (err) => {
          console.log(err.message);
          alert("データの読み込みに失敗しました。");
        }
      );
    }
    return unSub;
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);
  return (
    <View style={styles.container}>
      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("MemoCreate");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f0f4f8",
  },
});
