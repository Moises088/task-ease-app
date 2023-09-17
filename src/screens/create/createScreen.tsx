import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { HOME_CREATE } from '../../constants/home.constant';
import { HomeCreate } from '../../interfaces/screens/home.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BUTTON_PRIMARY } from '../../constants/colors.constant';
import { ApiContext } from '../../contexts/api.context';
import CustomButton from '../../components/global/custom-button';
import styles from './styles';
import { Language } from '../../services/language.service';

type CreateScreenRouteProp = RouteProp<RootStackParamList, 'CreateScreen'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateScreen'>;

const CreateScreen: React.FC = () => {
    const inputRef = React.useRef<TextInput>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const route = useRoute<CreateScreenRouteProp>();
    const action = route.params.action;

    const [createType, setCreateType] = React.useState<HomeCreate>();

    const { makeLocalRequest, language } = React.useContext(ApiContext)

    React.useEffect(() => {
        const create = HOME_CREATE.find(home => home.action == action)
        if (!create) return navigation.navigate("HomeScreen");

        setCreateType(create);

        setTimeout(() => {
            inputRef?.current?.focus()
        }, 100);
    }, []);

    const onOpen = () => {
        inputRef?.current?.blur()
    };

    const setCover = (item: any) => {
        inputRef?.current?.focus()
    }

    const create = () => {
        makeLocalRequest(() => new Promise(resolve => setTimeout(resolve, 1000)))
    }

    return createType ? (
        <View style={styles.container} >
            <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>
                    {Language.translate(createType.label, language).replace("<br>", " ")}
                </Text>
                {createType?.icon()}
            </View>

            <TextInput
                ref={inputRef}
                placeholder={Language.translate("Title", language)}
                placeholderTextColor="#8888"
                style={styles.input}
            />

            <View style={styles.containerBtn}>
                <CustomButton
                    click={create}
                    icon={() => <AntDesign name="arrowright" size={24} color="black" />}
                    style={[styles.btn]}
                    color='#000'
                    backgroundColor={createType?.backgroundColor ?? BUTTON_PRIMARY}
                />
            </View>
        </View >
    ) : <View />;
}

export default CreateScreen;