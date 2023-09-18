import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../interfaces/screens/route.interface';
import { Language } from '../../services/language.service';
import { ApiContext } from '../../contexts/api.context';
import { Task } from '../../services/task.service';
import { TaskEntity } from '../../database/entities/task.entity';
import HomeTasks from '../../components/home/tasks';
import styles from './styles';
import HomeHeader from '../../components/home/header';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>()
    const { language, makeLocalStorageRequest } = React.useContext(ApiContext)

    const [tasks, setTasks] = React.useState<TaskEntity[]>([])

    React.useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const { data: findTasks } = await makeLocalStorageRequest(() => Task.find({ order: { id: "DESC" } }));
        if (findTasks?.length) setTasks(findTasks)
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
            />
        </View >
    );
}

export default HomeScreen;