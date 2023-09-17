import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TEXT_PRIMARY } from '../../constants/colors.constant';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import styles from './styles';
import { Language } from '../../services/language.service';
import { ApiContext } from '../../contexts/api.context';
import HomeCreateIcon from '../../components/home/create-icon';
import { HOME_CREATE } from '../../constants/home.constant';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>()
    const { language } = React.useContext(ApiContext)

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>{Language.translate("Welcome", language)}</Text>

                <View style={styles.containerHeaderBtns}>
                    <TouchableOpacity style={[styles.containerHeaderBtn, { marginLeft: 0, marginRight: 6 }]}>
                        <Ionicons name="notifications-outline" size={20} color={TEXT_PRIMARY} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.containerHeaderBtn} onPress={() => navigation.navigate("SettingsScreen")}>
                        <AntDesign name="setting" size={20} color={TEXT_PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerCreate}>
                <FlatList
                    data={HOME_CREATE}
                    renderItem={({ item }) =>
                        <HomeCreateIcon
                            item={item}
                            click={() => {
                                navigation.navigate("CreateScreen", { action: item.action })
                            }}
                        />
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>
        </View >
    );
}

export default HomeScreen;