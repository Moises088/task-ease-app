import React from 'react';
import AuthProvider from './src/contexts/auth.context';
import ApiProvider from './src/contexts/api.context';
import Routes from './src/routes/index.routes';
import { LogBox, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { COLOR_PRIMARY } from './src/constants/colors.constant';
import { useFonts } from "expo-font";
import { FontFamily } from './src/constants/fonts.constant';

export default function App() {
  const [fontsLoaded] = useFonts({
    [FontFamily.Poppins_Bold]: require("./assets/fonts/Poppins-Bold.ttf"),
    [FontFamily.Poppins_Light]: require("./assets/fonts/Poppins-Light.ttf"),
    [FontFamily.Poppins_Regular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [FontFamily.Poppins_Italic]: require("./assets/fonts/Poppins-Italic.ttf"),
  });

  if (!fontsLoaded) return <View />;

  LogBox.ignoreLogs(['Sending']); // not found solution for problem: https://github.com/satya164/react-native-tab-view/issues/1258

  return (
    <ApiProvider>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
          <StatusBar backgroundColor={COLOR_PRIMARY} style='light' />
        </NavigationContainer>
      </AuthProvider>
    </ApiProvider>
  );
}
