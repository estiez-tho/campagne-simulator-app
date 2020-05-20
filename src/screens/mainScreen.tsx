import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Layout, Text, Spinner, Button, Avatar } from "@ui-kitten/components";
import { ListItem, listItemProps } from "../components/listItem";
import { useSelector, useDispatch } from "react-redux";
import {
  updateInterval,
  syncInterval,
  syncThreshHold,
} from "../data/updateInterval";
import { updateProgression, setState, syncTime } from "../../redux/actions";
import { getUserInfo } from "../api/index";
import { LoadingScreen } from "./loading";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { getTime, updateUserInfo } from "../api/backend";
import { Response } from "express";

const Header = () => {
  const amount = useSelector((state) => state.amount);
  const navigation = useNavigation();
  return (
    <Layout style={styles.header}>
      <Text style={{ fontSize: 30, color: "#E9E9E9" }}>{`${amount} $`}</Text>

      <Button
        style={{ height: 70, width: 70, borderRadius: 70, padding: 0 }}
        onPress={() => {
          navigation.navigate("Menu");
        }}
        accessoryLeft={() => (
          <Avatar
            style={{ height: 70, width: 70 }}
            source={require("../../assets/logo.png")}
          />
        )}
      ></Button>
    </Layout>
  );
};

export const GameScreen = () => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items);

  const deviceTime = useSelector((state) => state.deviceTime);

  const updateTimer = () => {
    return setInterval(() => {
      const timeDrift = new Date().getTime() - new Date(deviceTime).getTime();
      if (Object.keys(items).length > 0 && Math.abs(timeDrift) < syncThreshHold)
        dispatch(updateProgression());
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

  const items = useSelector((state) => state.items);
  const deviceTime = useSelector((state) => state.deviceTime);
  const serverTime = useSelector((state) => state.serverTime);
  const [serverUnreachable, setServerUnreachable] = useState(false);
  const [timeDrift, setTimeDrift] = useState(0);

  const fetchUserInfo = async () => {
    if (Object.keys(items).length === 0) {
      try {
        const id = await SecureStore.getItemAsync("userId");
        const userInfo = await SecureStore.getItemAsync("UserInfo");
        if (userInfo) {
          await updateUserInfo(id, JSON.parse(userInfo));
          await SecureStore.deleteItemAsync("UserInfo");
        }
        if (!id) throw new Error("Aucun identifiants trouvés");
        const payload = await getUserInfo(id);
        payload.deviceTime = new Date();
        dispatch(setState(payload));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const syncWithServer = async () => {
    try {
      setTimeDrift(new Date().getTime() - new Date(deviceTime).getTime());
      if (Math.abs(timeDrift) > syncInterval) {
        const response = await getTime();
        setServerUnreachable(false);
        const newDeviceTime = new Date();
        const newServerTime = new Date(response.serverTime);
        dispatch(syncTime(new Date(newServerTime), newDeviceTime));
      }
    } catch (err) {
      setServerUnreachable(true);
    }
  };

  const syncTimer = () => {
    return setInterval(() => {
      syncWithServer();
    }, syncInterval);
  };

  useEffect(() => {
    const syncInterval = syncTimer();
    return () => {
      clearInterval(syncInterval);
    };
  });

  useEffect(() => {
    fetchUserInfo();
  });

  return Object.keys(items).length === 0 ||
    Math.abs(timeDrift) > syncThreshHold ? (
    <LoadingScreen />
  ) : (
    <GameScreen />
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
    backgroundColor: "#e00785",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 30,
  },
});
