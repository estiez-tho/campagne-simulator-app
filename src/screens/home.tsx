import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { MainButton } from "../components/mainButton";

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainButton text="Go to game" dest="Main" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 5, justifyContent: "center", alignItems: "center" },
});
