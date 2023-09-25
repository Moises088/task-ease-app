import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ApiContext } from '../../../contexts/api.context';
import { Language } from '../../../services/language.service';
import { TEXT_SECOND, TEXT_SUCCESS } from '../../../constants/colors.constant';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/screens/route.interface';
import { TransformDate } from '../../../utils/date.util';
import { TaskEntity } from '../../../database/entities/task.entity';
import styles from './styles';

type TaskScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskScreen'>;

const TaskHeader: React.FC<{ route: { task: TaskEntity; }; load: boolean }> = ({ route, load }) => {
    const { language } = React.useContext(ApiContext)
    const navigation = useNavigation<TaskScreenNavigationProp>();

    return (
        <View>
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
                    {!load && (
                        <Text style={styles.containerTextSave}>
                            {Language.translate("Saved", language)}
                        </Text>
                    )}
                    <View style={styles.containerHeaderBtn}>
                        {
                            load ? (
                                <ActivityIndicator size={'small'} />
                            ) : (
                                <AntDesign name="check" size={20} color={TEXT_SUCCESS} />
                            )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default TaskHeader;