import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ApiContext } from '../../../contexts/api.context';
import { Language } from '../../../services/language.service';
import { TaskEntity } from '../../../database/entities/task.entity';
import { filterIconHomeCreateAction } from '../../../constants/home.constant';
import { MODAL_PRIMARY } from '../../../constants/colors.constant';
import styles from './styles';
import { TransformDate } from '../../../utils/date.util';

const HomeTasks: React.FC<{ item: TaskEntity, click: () => void; }> = ({ item, click }) => {
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
                <Text style={styles.small}>{TransformDate(item.createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default HomeTasks;