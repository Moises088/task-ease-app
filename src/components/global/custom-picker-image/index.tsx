import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { WallpaperImage } from '../../../constants/image.constant';
import styles from './styles';

const CustomPickerImage: React.FC<{
    item: WallpaperImage, click: (item: WallpaperImage) => void
}> = ({ item, click }) => {

    const select = () => {
        click(item)
    }

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={select}>
            <View style={styles.container}>
                <Image style={styles.image} resizeMode='cover' source={item.image} />
            </View>
        </TouchableOpacity>
    );
}

export default CustomPickerImage;