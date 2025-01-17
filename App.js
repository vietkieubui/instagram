import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//Screen
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import CommnetScreen from "./components/main/Comment";

import { auth } from "./firebase/config";

//REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reudx/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App(props) {
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            navigation={props.navigation}
          />
          <Stack.Screen name="Save" component={SaveScreen} />
          <Stack.Screen name="Comment" component={CommnetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
