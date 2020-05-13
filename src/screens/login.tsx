import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Input, Button, Avatar, Layout, Text } from "@ui-kitten/components";
import { MainButton } from "../components/mainButton";
import { createUser } from "../api/backend";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [username, setUsername] = useState("test");
  const [mail, setMail] = useState("thomas.estiez@gmail.com");
  const [disabled, setDisabled] = useState(false);
  const [params, setParams] = useState({});

  const navigation = useNavigation();

  const fetchUserAndRedirect = async () => {
    try {
      setDisabled(true);
      const createdUser = await createUser(mail, username);
      navigation.setParams(createdUser);
      navigation.navigate("Verify", createdUser);
    } catch (err) {
      setDisabled(false);
      alert(err.message);
    }
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
      }}
    >
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Avatar
          source={require("../../assets/item1.png")}
          style={{ height: 200, width: 200 }}
        />
      </Layout>
      <Text style={{ fontSize: 30, padding: 10 }}>Inscription</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(nextValue) => setUsername(nextValue)}
      />
      <Input
        placeholder="Email"
        value={mail}
        onChangeText={(nextValue) => setMail(nextValue)}
      />
      <Button
        onPress={() => {
          fetchUserAndRedirect();
        }}
        disabled={disabled}
      >
        SEND
      </Button>
    </SafeAreaView>
  );
};
