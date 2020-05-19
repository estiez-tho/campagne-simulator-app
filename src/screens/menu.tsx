import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { deleteUser } from "../api/backend";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
export const Menu = () => {
  const email = useSelector((state) => state.email);
  const username = useSelector((state) => state.username);
  const userId = useSelector((state) => state._id);
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

  const deleteUserFromBackend = async () => {
    try {
      setDisabled(true);
      await deleteUser(userId);
      await SecureStore.deleteItemAsync("UserInfo");
      await SecureStore.deleteItemAsync("token");
      navigation.navigate("Login");
    } catch (err) {
      setDisabled(false);
      alert("Une erreur est survenue");
    }
  };

  const checkBeforeDeleting = () => {
    Alert.alert("Attention", "Voulez vous vraiment supprimer le compte ?", [
      {
        text: "Oui",
        onPress: () => {
          deleteUserFromBackend();
        },
      },
      { text: "Non", onPress: () => {} },
    ]);
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
      <Text style={styles.text}>Username : {username}</Text>
      <Button
        style={styles.delete}
        onPress={() => {
          checkBeforeDeleting();
        }}
        disabled={disabled}
      >
        Supprimer le compte
      </Button>
      <Button style={styles.goBack} onPress={goBack} disabled={disabled}>
        Revenir en arrière
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
    marginTop: "10%",
    backgroundColor: "orange",
    borderColor: "orange",
    color: "white",
  },
  delete: {
    backgroundColor: "red",
    borderColor: "red",
    color: "white",
  },
  goBack: {
    marginTop: "10%",
  },
});
