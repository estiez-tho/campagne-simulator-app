import React from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { HomeScreen } from "./src/screens/home";
import { MainScreen } from "./src/screens/mainScreen";
import { updateItems } from "./redux/reducer";

const Stack = createStackNavigator();

const store = createStore(updateItems, applyMiddleware(thunkMiddleware));

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
}
