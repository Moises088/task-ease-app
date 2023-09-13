import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/home/homeScreen";
import { RootStackParamList } from "../interfaces/screens/route.interface";

const Stack = createStackNavigator<RootStackParamList>();

const AppRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;