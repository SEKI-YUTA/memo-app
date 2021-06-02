import { dateToString } from "../utils";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  FlatList,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

export default MemoList = ({ memos }) => {
  const navigation = useNavigation();

  function deleteMemo(id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      Alert.alert("メモを削除します", "よろしいですか？", [
        {
          text: "キャンセル",
          onPress: () => {},
        },
        {
          text: "削除する",
          style: "destructive",
          onPress: () => {
            ref.delete().catch(() => {
              Alert.alert("削除に失敗しました。");
            });
          },
        },
      ]);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => {
          navigation.navigate("MemoDetail", { id: item.id });
        }}
      >
        <View style={styles.memoInner}>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {dateToString(item.updateAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => {
            deleteMemo(item.id);
          }}
        >
          <Feather name="x" size={24} color="#b0b0b0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  memoDelete: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  memoInner: {
    flex: 1,
  },
});
