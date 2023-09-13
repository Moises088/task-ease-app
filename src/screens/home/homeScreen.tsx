import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TEXT_PRIMARY } from '../../constants/colors.constant';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import styles from './styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>()

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>Bem vindo</Text>

                <View style={styles.containerHeaderBtns}>
                    <TouchableOpacity style={[styles.containerHeaderBtn, { marginLeft: 0, marginRight: 6 }]}>
                        <Ionicons name="notifications-outline" size={20} color={TEXT_PRIMARY} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerHeaderBtn}>
                        <AntDesign name="setting" size={20} color={TEXT_PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

export default HomeScreen;