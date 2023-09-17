import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from "../interfaces/screens/route.interface";
import HomeScreen from "../screens/home/homeScreen";
import SettingsScreen from "../screens/settings/settingsScreen";
import CreateScreen from "../screens/create/createScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CreateScreen" component={CreateScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;