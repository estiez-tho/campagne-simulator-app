import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { MainButton } from "../components/mainButton";
import { ListItem, listItemProps } from "../components/listItem";
import { useSelector } from "react-redux";
import { DATA } from "../data/items";
const Header = () => {
  const amount = useSelector((state) => state.amount);
  return (
    <Layout style={styles.header}>
      <Text>{`SCORE : ${amount}`}</Text>
    </Layout>
  );
};

export const MainScreen = () => {
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
    justifyContent: "center",
    paddingLeft: "10%",
  },
});
