import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as SecureStore from "expo-secure-store";
import { HomeScreen } from "./src/screens/home";
import { MainScreen } from "./src/screens/mainScreen";

import { updateItems } from "./redux/reducer";
import { LoginScreen } from "./src/screens/login";
import { VerifyScreen } from "./src/screens/verify";
import { LoadingScreen } from "./src/screens/loading";
import { Menu } from "./src/screens/menu";

const Stack = createStackNavigator();

const store = createStore(updateItems, applyMiddleware(thunkMiddleware));

export default function App() {
  const [loading, setLoading] = useState(true);

  const [initialRouteName, setInitialRouteName] = useState("Login");

  const isLoggedIn = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userId = await SecureStore.getItemAsync("userId");
      if (token && userId) setInitialRouteName("Main");
      setLoading(false);
    } catch (err) {
      alert("Could not load the app");
    }
  };

  useEffect(() => {
    if (loading) isLoggedIn();
  });
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer>
          {loading ? (
            <LoadingScreen />
          ) : (
            <Stack.Navigator
              initialRouteName={initialRouteName}
              headerMode="none"
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Verify" component={VerifyScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Menu" component={Menu} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
