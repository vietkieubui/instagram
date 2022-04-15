import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import { auth } from "./firebase/config";

//REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reudx/reducers";
import from 'redux-thunk'

const Stack = createStackNavigator();

export default function App() {
  const [logState, setLogState] = useState({ loaded: false, loggedIn: false });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setLogState({ loggedIn: false, loaded: true });
      } else {
        setLogState({ loggedIn: true, loaded: true });
      }
    });
  }, []);

  if (!logState.loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!logState.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={styles.container}>
      <Text>User Is Logged In</Text>
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
