import React from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { TEXT_SECOND } from '../../constants/colors.constant';
import { GetCoverImage, WALLPAPER_IMAGE } from '../../constants/image.constant';
import { Language } from '../../services/language.service';
import { ApiContext } from '../../contexts/api.context';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { defaultList } from '../../constants/task.constant';
import styles from './styles';
import TaskHeader from '../../components/task/header';
import TaskOptions from '../../components/task/options';
import { TaskItem } from '../../interfaces/screens/task.interface';
import TaskItens from '../../components/task/item';

type TaskScreenRouteProp = RouteProp<RootStackParamList, 'TaskScreen'>;
type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskScreen'>;

const TaskScreen: React.FC = () => {
    const route = useRoute<TaskScreenRouteProp>().params;
    const textInputRef = React.useRef<TextInput>(null);
    const flatListRef = React.useRef<FlatList>(null);
    const textInputRefs = React.useRef<TextInput[] | null[]>([]);
    const [activeOption, setActiveOption] = React.useState<"check" | "list" | "list-ol">("check");
    const [itens, setItens] = React.useState<TaskItem[]>([defaultList, defaultList])

    const navigation = useNavigation<TaskScreenNavigationProp>();

    const { language } = React.useContext(ApiContext)

    React.useEffect(() => {
        getTaskItens()
    }, [])

    const getTaskItens = async () => {
        console.log(GetCoverImage(route.task.coverId), WALLPAPER_IMAGE[0])
    }

    const dismissKeyboard = () => {
        const isInputFocused = textInputRefs.current.some((ref) => ref && ref.isFocused());
        if (textInputRef.current?.isFocused() || isInputFocused) {
            Keyboard.dismiss();
        }
    };

    const Header = () => (
        <>
            <TaskHeader route={route} />
            <TaskOptions activeOption={activeOption} setActiveOption={setActiveOption} />
            <View style={styles.containerBody}>
                <TextInput
                    ref={textInputRef}
                    multiline
                    numberOfLines={4}
                    placeholder={Language.translate("EnterDescription", language)}
                    placeholderTextColor="#989898"
                    style={{ color: TEXT_SECOND, maxHeight: 200 }}
                />

                {
                    GetCoverImage(route.task.coverId) && (
                        <View style={styles.coverImage}>
                            <Image source={GetCoverImage(route.task.coverId)?.image} resizeMode='cover' style={styles.image} />
                        </View>
                    )
                }
            </View>
        </>
    )

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Comportamento de acordo com a plataforma
            >
                <View style={styles.container}>
                    <View style={{ marginTop: 30 }}>
                        <FlatList
                            ListHeaderComponent={Header}
                            ref={flatListRef}
                            ListFooterComponent={<View style={{ height: 50 }} />}
                            data={itens}
                            renderItem={({ item, index }) => (
                                <TaskItens
                                    index={index}
                                    item={item}
                                    itens={itens}
                                    setItens={setItens}
                                    textInputRefs={textInputRefs}
                                />
                            )}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback >
    );
}

export default TaskScreen;