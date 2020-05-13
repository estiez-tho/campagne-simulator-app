import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Spinner } from "@ui-kitten/components";

export const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Spinner size="giant" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 5, justifyContent: "center", alignItems: "center" },
});
