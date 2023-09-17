import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ApiContext } from '../../../contexts/api.context';
import { Language } from '../../../services/language.service';
import { TaskEntity } from '../../../database/entities/task.entity';
import { filterIconHomeCreateAction } from '../../../constants/home.constant';
import { MODAL_PRIMARY } from '../../../constants/colors.constant';
import styles from './styles';

const HomeTasks: React.FC<{ item: TaskEntity, click: () => void; }> = ({ item, click }) => {
    const getDate = () => {
        if (!item.createdAt) return "";

        const date = new Date(item.createdAt);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={click}
        >
            <View style={[styles.icon, { backgroundColor: MODAL_PRIMARY }]}>
                {filterIconHomeCreateAction(item.type)}
            </View>
            <View>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.small}>{getDate()}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default HomeTasks;