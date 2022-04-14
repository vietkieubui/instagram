import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import firebase, { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [info, setInfo] = useState({ email: "", password: "", name: "" });
  // console.log(info);
  const onSignUp = () => {
    const { email, password, name } = info;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential");
      })
      .catch((error) => {
        console.log("errorrrrrrrrrr: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        onChangeText={(name) => setInfo({ ...info, name })}
      />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setInfo({ ...info, email })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setInfo({ ...info, password })}
      />
      <Button onPress={onSignUp} title="Sign Up" />
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
