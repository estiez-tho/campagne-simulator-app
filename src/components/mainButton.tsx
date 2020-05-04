import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

interface mainButtonProps {
  dest: string | null;
  text: string;
  color: string;
}

export const MainButton: React.FC<mainButtonProps> = ({
  dest,
  text,
  color,
}) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    if (dest) navigate(dest);
  };
  return (
    <Button style={styles.button} onPress={onPress}>
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: { height: "15%" },
});
