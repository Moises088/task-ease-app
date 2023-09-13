import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { COLOR_PRIMARY, TEXT_PRIMARY } from '../../../constants/colors.constant';
import { FontFamily } from '../../../constants/fonts.constant';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: TEXT_PRIMARY,
        borderRadius: 6,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: COLOR_PRIMARY,
        marginBottom: 10,
        height: 50,
        position: "relative"
    },
    input: {
        flex: 1,
        color: COLOR_PRIMARY,
        paddingVertical: 8,
        paddingRight: 10,
        fontFamily: FontFamily.Poppins_Regular
    },
    invalid: {
        borderColor: '#dd4b39',
    },
    valid: {
        borderColor: '#1DB954',
    },
    validIcon: {
        borderColor: '#1DB954',
    },
    iconContainer: {
        padding: 5,
    },
});
