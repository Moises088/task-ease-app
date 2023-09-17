import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { HOME_CREATE } from '../../constants/home.constant';
import { HomeCreate } from '../../interfaces/screens/home.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from '../../constants/colors.constant';
import { ApiContext } from '../../contexts/api.context';
import CustomButton from '../../components/global/custom-button';
import styles from './styles';
import { Language } from '../../services/language.service';
import { WALLPAPER_IMAGE, WallpaperImage } from '../../constants/image.constant';
import CustomPickerImage from '../../components/global/custom-picker-image';
import { Task } from '../../services/task.service';
import { TaskEntity } from '../../database/entities/task.entity';

type CreateScreenRouteProp = RouteProp<RootStackParamList, 'CreateScreen'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CreateScreen'>;

const CreateScreen: React.FC = () => {
    const inputRef = React.useRef<TextInput>(null);
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const route = useRoute<CreateScreenRouteProp>();
    const action = route.params.action;

    const [title, setTitle] = React.useState<string>();
    const [createType, setCreateType] = React.useState<HomeCreate>();
    const [coverModal, setCoverModal] = React.useState<boolean>(false);
    const [coverImage, setCoverImage] = React.useState<WallpaperImage>();

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
        setCoverModal(true)
        inputRef?.current?.blur()
    };

    const setCover = (item: WallpaperImage) => {
        setCoverImage(item)
        setCoverModal(false)
        setTimeout(() => { inputRef?.current?.focus() }, 100);
    }

    const create = async () => {
        if (!title) return;
        if (!createType) return;

        const body: TaskEntity = {
            title,
            type: createType.action
        }

        if (coverImage) body.coverId = coverImage.id;

        const createTask = await makeLocalRequest(() => Task.create(body))
        console.log("createTask", createTask)
    }

    return createType ? (
        <View style={styles.container} >
            <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>
                    {Language.translate(createType.label, language).replace("<br>", " ")}
                </Text>
                {createType?.icon()}
            </View>

            {coverImage ? (
                <>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => setCoverImage(undefined)} style={styles.removeCoverImage}>
                        <AntDesign name="close" size={12} color="black" />
                        <Text style={styles.removeCoverImageText}>Remover</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={onOpen} style={styles.coverImage}>
                        <Image source={coverImage.image} resizeMode='cover' style={styles.image} />
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.containerPosHeader}>
                    <TouchableOpacity style={styles.posHeader} activeOpacity={0.6} onPress={onOpen}>
                        <Ionicons name="image" size={22} color="#868686" />
                        <Text style={styles.posHeaderText}>Adicionar capa</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TextInput
                ref={inputRef}
                placeholder={Language.translate("Title", language)}
                placeholderTextColor="#8888"
                style={styles.input}
                onChangeText={text => setTitle(text)}
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

            <Modal
                transparent={true}
                visible={coverModal}
                onRequestClose={() => setCoverModal(false)}
            >
                <View style={styles.coverModal}>
                    <View style={styles.containerModal}>
                        <View style={styles.containerModalHeader}>
                            <TouchableOpacity
                                style={styles.containerModalHeaderBtn}
                                onPress={() => setCoverModal(false)}
                            >
                                <Text style={{ color: TEXT_PRIMARY }}>x</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={WALLPAPER_IMAGE}
                            renderItem={({ item, index }) =>
                                <CustomPickerImage key={index} item={item} click={setCover} />
                            }
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>
        </View >
    ) : <View />;
}

export default CreateScreen;