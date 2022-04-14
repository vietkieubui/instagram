import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocument, addDocumentWithoutAwait } from "../../firebase/services";

export default function Register() {
  const [info, setInfo] = useState({ email: "", password: "", name: "" });
  const onSignUp = () => {
    const { email, password, name } = info;
    console.log("first inforrrrr:", info);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("objecttttttttttttttttttttttt", user);
        addDocument("users", { email, name });
      })
      .catch((error) => {
        console.log("errorrrrrrrrrr: ", error);
      });
    console.log("lats inforfffffffffffff:", info);
  };
  return (
    <View style={styles.container}>
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
