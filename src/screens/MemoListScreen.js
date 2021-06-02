import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { View, StyleSheet, Text } from "react-native";
import AppBar from "../components/AppBar";
import MemoList from "../components/MemoList";
import CircleButton from "../components/CircleButton";
import LogOutButton from "../components/LogOutButton";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default MemoListScreen = ({ navigation }) => {
  const [memos, setMemos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unSub = () => {};
    if (currentUser) {
      setLoading(true);
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
          setLoading(false);
        },
        (err) => {
          console.log(err.code);
          setLoading(false);
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

  if (memos.length === 0) {
    return (
      <View style={emptyStyle.container}>
        <Loading isLoading={isLoading} />

        <View style={emptyStyle.inner}>
          <Text style={emptyStyle.title}>メモを作成してみよう</Text>
          <Button
            style={emptyStyle.button}
            label="作成する"
            onPress={() => {
              navigation.navigate("MemoCreate");
            }}
          ></Button>
        </View>
      </View>
    );
  }
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

const emptyStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  },
});
