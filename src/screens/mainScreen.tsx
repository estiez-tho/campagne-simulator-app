import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ListItem } from "../components/listItem";
import { useSelector, useDispatch } from "react-redux";
import { DATA } from "../data/items";
import { updateInterval } from "../data/updateInterval";
import { updateProgression } from "../../redux/actions";

const Header = () => {
  const amount = useSelector((state) => state.amount);
  return (
    <Layout style={styles.header}>
      <Text
        style={{ fontSize: 30, color: "#E9E9E9" }}
      >{`SCORE : ${amount}`}</Text>
    </Layout>
  );
};

export const MainScreen = () => {
  const dispacth = useDispatch();
  setInterval(() => {
    DATA.forEach((elem, index) => {
      if (!elem.id)
        throw new Error(`could not get ID at index : ${index}; got ${elem}`);
      dispacth(updateProgression(elem.id));
    });
  }, updateInterval);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <ListItem {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 5, justifyContent: "center", alignItems: "center" },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    flexDirection: "column",
  },
  contentContainer: {
    justifyContent: "center",
    padding: 0,
    flexDirection: "column",
  },
  header: {
    height: "20%",
    width: "100%",
    backgroundColor: "green",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10%",
  },
});
