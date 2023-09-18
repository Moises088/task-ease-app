import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { BUTTON_PRIMARY, MODAL_PRIMARY, TEXT_PRIMARY, TEXT_SECOND, TEXT_SUCCESS } from '../../constants/colors.constant';
import { TransformDate } from '../../utils/date.util';
import { GetCoverImage, WALLPAPER_IMAGE } from '../../constants/image.constant';
import { Language } from '../../services/language.service';
import { ApiContext } from '../../contexts/api.context';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type TaskScreenRouteProp = RouteProp<RootStackParamList, 'TaskScreen'>;
type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskScreen'>;

const TaskScreen: React.FC = () => {
    const route = useRoute<TaskScreenRouteProp>().params;
    const textInputRef = React.useRef<TextInput>(null);
    const textInputRefs = React.useRef<TextInput[] | null[]>([]);
    const navigation = useNavigation<TaskScreenNavigationProp>();
    const defaultList = {
        type: "check",
        title: "",
        check: false
    }

    const [activeOption, setActiveOption] = React.useState<"check" | "list" | "list-ol">("check");
    const [itens, setItens] = React.useState([defaultList])

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

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <View style={styles.containerTitle}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="keyboard-arrow-left" size={24} color={TEXT_SECOND} />
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.containerHeaderText}>{route.task.title}</Text>
                            {route.task.createdAt && (
                                <Text style={styles.containerHeaderSmall}>
                                    {TransformDate(route.task.createdAt)}
                                </Text>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.containerHeaderBtns} onPress={() => { }}>
                        <Text style={styles.containerTextSave}>
                            {Language.translate("Saved", language)}
                        </Text>
                        <View style={styles.containerHeaderBtn}>
                            <AntDesign name="check" size={20} color={TEXT_SUCCESS} />
                        </View>
                    </TouchableOpacity>
                </View>

                {GetCoverImage(route.task.coverId) && (
                    <View style={styles.coverImage}>
                        <Image source={GetCoverImage(route.task.coverId)?.image} resizeMode='cover' style={styles.image} />
                    </View>
                )}

                <View style={styles.containerBody}>
                    <TextInput
                        ref={textInputRef}
                        multiline
                        numberOfLines={4}
                        placeholder={Language.translate("EnterDescription", language)}
                        placeholderTextColor="#989898"
                        style={{ color: TEXT_SECOND, maxHeight: 200 }}
                    />

                    <View style={styles.options}>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                { backgroundColor: activeOption !== "check" ? MODAL_PRIMARY : BUTTON_PRIMARY }
                            ]}
                            onPress={() => setActiveOption("check")}
                        >
                            <MaterialCommunityIcons name="format-list-checks" size={21} color={TEXT_SECOND} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                { backgroundColor: activeOption !== "list" ? MODAL_PRIMARY : BUTTON_PRIMARY }
                            ]}
                            onPress={() => setActiveOption("list")}
                        >
                            <Feather name="list" size={24} color={TEXT_SECOND} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                { backgroundColor: activeOption !== "list-ol" ? MODAL_PRIMARY : BUTTON_PRIMARY }
                            ]}
                            onPress={() => setActiveOption("list-ol")}
                        >
                            <FontAwesome name="list-ol" size={18} color={TEXT_SECOND} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <FlatList
                            ListFooterComponent={<View style={{ height: 500 }} />}
                            data={itens}
                            renderItem={({ item, index }) => (
                                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <BouncyCheckbox
                                        isChecked={item.check}
                                        text=""
                                        disableBuiltInState
                                        onPress={() => {
                                            const updatedItens = [...itens];
                                            updatedItens[index].check = !item.check;
                                            setItens(updatedItens);
                                        }}
                                        fillColor={BUTTON_PRIMARY}
                                    />

                                    <TextInput
                                        ref={(ref) => {
                                            textInputRefs.current[index] = ref;
                                        }}
                                        placeholder='Escreva sua tarefa'
                                        value={item.title}
                                        placeholderTextColor='#969696'
                                        style={{ color: TEXT_PRIMARY, width: "100%" }}
                                        onChangeText={(text) => {
                                            const updatedItens = [...itens];
                                            updatedItens[index].title = text;
                                            setItens(updatedItens);
                                        }}
                                        onSubmitEditing={() => {
                                            const itensMap = itens.map(i => i);
                                            if (!item?.title?.length) return

                                            if ((itens.length - 1) == index) {
                                                itensMap.push(defaultList)
                                                setItens(itensMap)
                                            } else {
                                                itensMap.splice(index + 1, 0, defaultList);
                                                setItens(itensMap);
                                            }

                                            setTimeout(() => {
                                                if (textInputRefs.current[index + 1]) {
                                                    textInputRefs.current[index + 1]?.focus();
                                                }
                                            }, 100);

                                        }}
                                    />
                                </View>
                            )}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}

export default TaskScreen;