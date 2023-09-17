import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { HomeCreate } from '../../../interfaces/screens/home.interface';
import styles from './styles';
import { ApiContext } from '../../../contexts/api.context';
import { Language } from '../../../services/language.service';

const HomeCreateIcon: React.FC<{ item: HomeCreate, click: () => void; }> = ({ item, click }) => {
    const { language } = React.useContext(ApiContext)

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={click}
        >
            <View style={[styles.container, { backgroundColor: item.backgroundColor }]}>
                {item.icon()}
            </View>
            {Language.translate(item.label, language).split("<br>").map((text, index) => (
                <Text style={styles.text} key={index}>{text}</Text>
            ))}
        </TouchableOpacity>
    );
}

export default HomeCreateIcon;