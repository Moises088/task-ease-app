import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/home/homeScreen";
import { RootStackParamList } from "../interfaces/screens/route.interface";
import SettingsScreen from "../screens/settings/settingsScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;