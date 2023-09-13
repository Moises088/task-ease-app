import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { TEXT_PRIMARY } from '../../../constants/colors.constant';
import { FontFamily } from '../../../constants/fonts.constant';
import { Language } from '../../../services/language.service';
import { ApiContext } from '../../../contexts/api.context';

const image = require("../../../../assets/load.gif")

const Splash: React.FC = () => {
    const { language } = React.useContext(ApiContext)

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={{ color: TEXT_PRIMARY, fontFamily: FontFamily.Poppins_Bold }}>
                {Language.translate("LoadSettings", language)}...
            </Text>
        </View>
    );
}

export default Splash;