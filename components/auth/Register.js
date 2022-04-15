import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocument } from "../../firebase/services";
import { auth } from "../../firebase/config";

export default function Register() {
  const [info, setInfo] = useState({ email: "", password: "", name: "" });

  const onSignUp = async () => {
    const { email, password, name } = info;
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      addDocument("users", { name, email });
    });
  };

  const testHandle = () => {
    const { email, password, name } = info;
    addDocument("users", { name, email });
  };

  return (
    <View style={styles.container}>
      <Button title="testtt" onPress={testHandle} />
      <TextInput
        placeholder="name"
        onChangeText={(name) => {
          console.log(info);
          setInfo({ ...info, name });
        }}
      />
      <TextInput
        placeholder="email"
        onChangeText={(email) => {
          console.log(info);
          setInfo({ ...info, email });
        }}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => {
          console.log(info);
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
