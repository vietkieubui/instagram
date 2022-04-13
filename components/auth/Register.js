import React from "react";
import { View, Button, TextInput } from "react-native";

export default function Register() {
  const [info, setInfo] = useState({ email: "", password: "", name: "" });
  return (
    <View>
      <TextInput
        placeholder="name"
        onChange={(name) => setInfo(...info, name)}
      />
    </View>
  );
}
