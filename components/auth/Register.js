import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocument, setDocument } from "../../firebase/services";
import { auth } from "../../firebase/config";

export default function Register() {
  const [info, setInfo] = useState({ email: "", password: "", name: "" });

  const onSignUp = async () => {
    const { email, password, name } = info;
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      setDocument("users", { name, email }, auth.currentUser.uid);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="name"
        onChangeText={(name) => {
          setInfo({ ...info, name });
        }}
      />
      <TextInput
        placeholder="email"
        onChangeText={(email) => {
          setInfo({ ...info, email });
        }}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => {
          setInfo({ ...info, password });
        }}
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
