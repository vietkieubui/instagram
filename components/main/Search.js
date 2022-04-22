import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchUsersList } from "../../firebase/services";

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const data = fetchUsersList(search);
  useEffect(() => {
    setUsers(data);
  }, [data]);

  return (
    <View>
      <TextInput
        placeholder="Type here....."
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
