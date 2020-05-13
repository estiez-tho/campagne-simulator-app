import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { MainButton } from "../components/mainButton";
import { createUser } from "../api/backend";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
export const Menu = () => {
  const email = useSelector((state) => state.email);
  const username = useSelector((state) => state.username);
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(false);
  const logOut = async () => {
    try {
      setDisabled(true);
      await SecureStore.deleteItemAsync("UserInfo");
      await SecureStore.deleteItemAsync("token");
      navigation.navigate("Login");
    } catch (err) {
      setDisabled(false);
      alert("Could not log out");
    }
  };

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.text}>{username}</Text>
      <Button
        style={styles.logout}
        onPress={() => {
          logOut();
        }}
        disabled={disabled}
      >
        Log out
      </Button>
      <Button style={styles.goBack} onPress={goBack} disabled={disabled}>
        Go Back
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
    fontSize: 20,
  },

  logout: {
    backgroundColor: "red",
    color: "white",
  },
  goBack: {
    marginTop: "10%",
  },
});
