import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "#000",
    backgroundColor: "#0000",
    width: "200px",
  },
});
