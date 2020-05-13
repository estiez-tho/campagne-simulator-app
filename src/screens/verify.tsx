import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { MainButton } from "../components/mainButton";
import { createUser, verifyUser } from "../api/backend";
import { updateUserInfo } from "../api/storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export const VerifyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [disabled, setDisabled] = useState(false);

  const verifyAndRedirect = async () => {
    try {
      setDisabled(true);
      const { token, user } = await verifyUser(email, verificationCode);
      await updateUserInfo(user._id, user);
      await SecureStore.setItemAsync("token", token);
      navigation.navigate("Main");
    } catch (err) {
      setDisabled(false);
      throw new Error("could not verify User");
    }
  };
  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 20, padding: 10 }}>
        Code de vérification envoyé à {email}
      </Text>
      <Input
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={(nextValue) => {
          if (nextValue.length < 6) setVerificationCode(nextValue);
        }}
      />
      <Button
        onPress={() => {
          verifyAndRedirect();
        }}
        disabled={disabled}
      >
        SEND
      </Button>
    </SafeAreaView>
  );
};
