import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal } from 'react-native';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { TEXT_PRIMARY } from '../../constants/colors.constant';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import styles from './styles';
import { LANGUAGES_LIST } from '../../constants/languages.constant';
import { SettingLanguage } from '../../interfaces/screens/settings.interface';
import { ApiContext } from '../../contexts/api.context';
import { Language } from '../../services/language.service';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SettingsScreen'>;

const SettingsScreen: React.FC = () => {

    const navigation = useNavigation<SettingsScreenNavigationProp>()

    const [lenguages] = React.useState<SettingLanguage[]>(LANGUAGES_LIST)
    const [activeLanguage, setActiveLanguage] = React.useState<SettingLanguage>()
    const [showModal, setShowModal] = React.useState<boolean>(false)

    const { makeLocalStorageRequest, setLanguage, language } = React.useContext(ApiContext)

    React.useEffect(() => {
        getActiveLanguage()
    }, [])

    const getActiveLanguage = async () => {
        const { data: activeLanguage } = await makeLocalStorageRequest<SettingLanguage>(() => Language.getActiveLanguage())
        setActiveLanguage(activeLanguage)
        setLanguage(activeLanguage.id)
    }

    const selectLanguage = async (item: SettingLanguage) => {
        const { data: change } = await makeLocalStorageRequest<SettingLanguage>(() => Language.changeLanguage(item))
        setActiveLanguage(change)
        setLanguage(change.id)
        setShowModal(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity style={[styles.containerHeaderBtn]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color={TEXT_PRIMARY} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerBody}>
                <View style={styles.containerSetting}>
                    <Text style={styles.containerSettingText}>
                        {Language.translate("SettingLanguageLabel", language)}
                    </Text>
                    <TouchableOpacity style={styles.btnSetting} onPress={() => setShowModal(true)}>
                        <View style={styles.btnSettingTitle}>
                            <Image source={{ uri: activeLanguage?.image }} style={styles.btnSettingImage} />
                            <Text style={styles.btnSettingText}>{activeLanguage?.label}</Text>
                        </View>

                        <MaterialIcons name="keyboard-arrow-right" size={18} color={TEXT_PRIMARY} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={showModal}>
                <View style={styles.container}>
                    <FlatList
                        data={lenguages}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.btnSetting} onPress={() => selectLanguage(item)} key={index}>
                                <View style={styles.btnSettingTitle}>
                                    <Image source={{ uri: item.image }} style={styles.btnSettingImage} />
                                    <Text style={styles.btnSettingText}>{item.label}</Text>
                                </View>

                                <Entypo name="circle" size={12} color={TEXT_PRIMARY} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </Modal>
        </View >
    );
}

export default SettingsScreen;