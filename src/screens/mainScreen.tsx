import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { ListItem, listItemProps } from "../components/listItem";
import { useSelector, useDispatch } from "react-redux";
import { DATA } from "../data/items";
import { updateInterval } from "../data/updateInterval";
import { updateProgression, setState } from "../../redux/actions";
import { getUserInfo } from "../api/index";

const USER_ID = "5eb83ef7d14cdb201dc4d7da";

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
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const fetchUserInfo = async () => {
    if (Object.keys(items).length === 0) {
      try {
        const payload = await getUserInfo(USER_ID);
        dispatch(setState(payload.data));
      } catch (err) {
        throw err;
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    return () => {
      console.log("Retrieved info");
    };
  }, []);

  const initTimer = () => {
    return setInterval(() => {
      dispatch(updateProgression());
    }, updateInterval);
  };

  useEffect(() => {
    const interval = initTimer();
    return () => {
      clearInterval(interval);
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
