import React from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { TEXT_SECOND } from '../../constants/colors.constant';
import { GetCoverImage } from '../../constants/image.constant';
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
import { Task } from '../../services/task.service';
import { TaskItemEntity } from '../../database/entities/task-item.entity';

type TaskScreenRouteProp = RouteProp<RootStackParamList, 'TaskScreen'>;
type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskScreen'>;

const TaskScreen: React.FC = () => {
    const route = useRoute<TaskScreenRouteProp>().params;

    const textInputRef = React.useRef<TextInput>(null);
    const flatListRef = React.useRef<FlatList>(null);
    const textInputRefs = React.useRef<TextInput[] | null[]>([]);

    const [activeOption, setActiveOption] = React.useState<"check" | "list" | "list-ol">("check");
    const [updateTimeout, setUpdateTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [load, setLoad] = React.useState<boolean>(false)
    const [itens, setItens] = React.useState<TaskItem[]>([]);

    const navigation = useNavigation<TaskScreenNavigationProp>();

    const { language, makeLocalRequest } = React.useContext(ApiContext)

    React.useEffect(() => {
        getTaskItens()
    }, [])

    const getTaskItens = async () => {
        try {
            if (!route.task.id) return

            const taskId = route.task.id;

            setLoad(true)
            const { data: result } = await makeLocalRequest(() => Task.findItens(taskId))

            if (!result?.length) {
                setItens([{ ...defaultList, type: activeOption }])
                return
            }

            setItens([...result, { ...defaultList, type: activeOption }])
        } catch (error) {

        } finally {
            setLoad(false)
        }
    }

    const dismissKeyboard = () => {
        const isInputFocused = textInputRefs.current.some((ref) => ref && ref.isFocused());
        if (textInputRef.current?.isFocused() || isInputFocused) {
            Keyboard.dismiss();
        }
    };

    const updateTaskItensDebounced = (changedItens: TaskItem[]) => {
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }

        const timeout = setTimeout(() => {
            updateTaskItens(changedItens);
        }, 1200);

        setUpdateTimeout(timeout);
    };

    const updateTaskItens = async (changedItens: TaskItem[]) => {
        const modifiedItems: TaskItemEntity[] = [];
        const createdItems: TaskItemEntity[] = [];

        if (!route.task.id) return

        const isEqual = (obj1: TaskItem, obj2: TaskItem) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        for (const changedItem of changedItens) {
            if (changedItem.id) {
                const correspondingItem1 = itens.find(item1 => item1.id == changedItem.id);
                if ((correspondingItem1 && !isEqual(correspondingItem1, changedItem) || correspondingItem1?.checked)) {
                    if (correspondingItem1.title.length) {
                        modifiedItems.push({ ...changedItem, taskId: route.task.id });
                    }
                }
            } else {
                if (changedItem.title.length) {
                    createdItems.push({ ...changedItem, taskId: route.task.id });
                }
            }
        }

        try {
            console.log(modifiedItems, createdItems)
            setLoad(true)
            const { data } = await makeLocalRequest(() => Task.syncItens(modifiedItems, createdItems))
            await getTaskItens()
        } catch (error) {

        } finally {
            setLoad(false)
        }
    }

    const changeItemType = (type: "check" | "list" | "list-ol") => {
        const selectAllEmpity = itens.map((item, index) => {
            if (!item.title.length) return { item, index }
            return null
        }).filter(i => i) as { item: TaskItem; index: number; }[];

        if (!selectAllEmpity.length) return

        const updatedItens = [...itens];
        for (const empity of selectAllEmpity) {
            updatedItens[empity.index] = { ...updatedItens[empity.index], type };
        }

        setItens(updatedItens);
    }

    const Header = () => (
        <>
            <TaskHeader route={route} load={load} />
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
                <TaskOptions
                    activeOption={activeOption}
                    setActiveOption={option => {
                        setActiveOption(option)
                        changeItemType(option)
                    }}
                />
            </View>
        </>
    )

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                                    setItens={changedItens => {
                                        setItens(changedItens)
                                        updateTaskItensDebounced(changedItens)
                                    }}
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