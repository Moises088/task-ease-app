import { StyleSheet } from 'react-native';
import { BUTTON_PRIMARY, TEXT_PRIMARY } from '../../../constants/colors.constant';
import { FontFamily } from '../../../constants/fonts.constant';


export default StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 45,
        borderRadius: 8,
        position: "relative",
        overflow: "hidden"
    },
    buttonText: {
        color: TEXT_PRIMARY,
        fontSize: 16,
        fontFamily: FontFamily.Poppins_Regular
    },
});