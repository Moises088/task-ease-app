import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { ApiContext } from '../../contexts/api.context';
import { Task } from '../../services/task.service';
import { TaskEntity } from '../../database/entities/task.entity';
import HomeTasks from '../../components/home/tasks';
import styles from './styles';
import HomeHeader from '../../components/home/header';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>()
    const { makeLocalStorageRequest } = React.useContext(ApiContext)

    const isFocused = useIsFocused()

    const [tasks, setTasks] = React.useState<TaskEntity[]>([])
    const [skip, setSkip] = React.useState<number>(0)

    React.useEffect(() => {
        if (isFocused) {
            getTasks(0)
            setSkip(0)
        }
    }, [isFocused])

    const getTasks = async (_skip: number, returnData: boolean = false) => {
        const { data: findTasks } = await makeLocalStorageRequest(
            () => Task.find({
                order: { id: "DESC" },
                take: 10,
                skip: (_skip * 10)
            }),
            !returnData
        );

        if (findTasks?.length) {
            if (returnData) return findTasks;

            setTasks(findTasks)
        }
    }

    const loadMore = async () => {
        const getTask = await getTasks(skip + 1, true)
        console.log("loadMore getTask", getTask)
        if (!getTask) return
        setSkip(skip + 1)
        setTasks(prev => [...prev, ...getTask])
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                ListHeaderComponent={<HomeHeader />}
                ListFooterComponent={<View style={{ height: 100 }} />}
                data={tasks}
                renderItem={({ item }) =>
                    <HomeTasks
                        item={item}
                        click={() => {
                            if (item.id) navigation.navigate("TaskScreen", { task: item })
                        }}
                    />
                }
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.4}
            />
        </View >
    );
}

export default HomeScreen;