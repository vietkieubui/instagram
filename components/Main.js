import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { fetchUser } from "../reudx/actions";
import FeedScreen from "./main/Feed";
import ProfileScreen from "./main/Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();
const EpmtyScreen = () => {
  return null;
};

function Main(props) {
  useEffect(() => {
    // console.log(props);
    props.fetchUser();
  }, []);
  const { currentUser } = props;
  console.log(props);
  // if (currentUser == undefined) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>LOADING USERRRRRRRR</Text>
  //     </View>
  //   );
  // }
  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddContainer"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        component={EpmtyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
