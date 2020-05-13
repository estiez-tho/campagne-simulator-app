import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Layout, Text, Spinner, Button } from "@ui-kitten/components";
import { ListItem, listItemProps } from "../components/listItem";
import { useSelector, useDispatch } from "react-redux";
import { updateInterval } from "../data/updateInterval";
import { updateProgression, setState } from "../../redux/actions";
import { getUserInfo } from "../api/index";
import { LoadingScreen } from "./loading";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const amount = useSelector((state) => state.amount);
  const navigation = useNavigation();
  return (
    <Layout style={styles.header}>
      <Button
        style={{ height: 20, width: 20 }}
        onPress={() => {
          navigation.navigate("Menu");
        }}
      />
      <Text
        style={{ fontSize: 30, color: "#E9E9E9" }}
      >{`SCORE : ${amount}`}</Text>
    </Layout>
  );
};

export const GameScreen = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items);

  const updateTimer = () => {
    return setInterval(() => {
      if (Object.keys(items).length > 0) dispatch(updateProgression());
    }, updateInterval);
  };

  useEffect(() => {
    const timerInterval = updateTimer();
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        style={styles.list}
        data={Object.values(items) as Array<listItemProps>}
        renderItem={({ item, index }) => (
          <ListItem {...item} id={`${index}`} key={index} />
        )}
        keyExtractor={(item: listItemProps) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export const MainScreen = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state._id);
  const items = useSelector((state) => state.items);

  const fetchUserInfo = async () => {
    if (Object.keys(items).length === 0) {
      try {
        const payload = await getUserInfo(userId);
        dispatch(setState(payload));
      } catch (err) {
        throw err;
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  });
  return Object.keys(items).length === 0 ? <LoadingScreen /> : <GameScreen />;
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
    backgroundColor: "grey",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "10%",
  },
});
