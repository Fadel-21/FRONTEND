import { LogBox } from "react-native";
import React, { Component } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { useToast } from "native-base";

// Redux
import { Provider } from "react-redux";
import store from "./src/Redux/store";

// Context API
import Auth from "./src/Context/store/Auth";

// Navigators
import Main from "./src/Navigators/Main";

// Screens
import ProductContainer from "./src/Screens/Products/ProductContainer";
import Header from "./src/Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Header />
            <Main />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </Auth>
  );
}
