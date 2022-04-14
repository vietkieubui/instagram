import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import firebase, { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [info, setInfo] = useState({ email: "", password: "" });
  // console.log(info);
  const onLogin = () => {
    const { email, password } = info;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("successsssssssssss");
      })
      .catch((error) => {
        console.log("ERROR LOGINNNNNNNNN: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setInfo({ ...info, email })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setInfo({ ...info, password })}
      />
      <Button onPress={onLogin} title="Log in" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
