import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { BUTTON_PRIMARY, MODAL_PRIMARY, TEXT_SECOND } from '../../../constants/colors.constant';
import { TaskOptionsProps } from '../../../interfaces/screens/task.interface';
import styles from './styles';

const TaskOptions: React.FC<TaskOptionsProps> = ({ activeOption, setActiveOption }) => {

    const getActiveOption = (option: string) => {
        if (activeOption == option) return BUTTON_PRIMARY;
        return MODAL_PRIMARY
    }

    return (
        <View>
            <View style={styles.options}>
                <TouchableOpacity
                    style={[
                        styles.option,
                        { backgroundColor: getActiveOption("check") }
                    ]}
                    onPress={() => setActiveOption("check")}
                >
                    <MaterialCommunityIcons name="format-list-checks" size={21} color={TEXT_SECOND} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.option,
                        { backgroundColor: getActiveOption("list") }
                    ]}
                    onPress={() => setActiveOption("list")}
                >
                    <Feather name="list" size={24} color={TEXT_SECOND} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.option,
                        { backgroundColor: getActiveOption("list-ol") }
                    ]}
                    onPress={() => setActiveOption("list-ol")}
                >
                    <FontAwesome name="list-ol" size={18} color={TEXT_SECOND} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default TaskOptions;