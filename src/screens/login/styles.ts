import { StyleSheet } from 'react-native';
import { BUTTON_PRIMARY, COLOR_PRIMARY, TEXT_PRIMARY } from '../../constants/colors.constant';
import { STATUS_BAR_HEIGHT, WINDOW_HEIGTH, WINDOW_WIDTH } from '../../constants/screen.constant';
import { FontFamily } from '../../constants/fonts.constant';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        alignItems: "center",
    },
    containerScrollContent: {
        flexGrow: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerForm: {
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: STATUS_BAR_HEIGHT,
    },
    containerSocialMedia: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        paddingBottom: 20,
        marginTop: 15
    },
    loginIcon: {
        backgroundColor: TEXT_PRIMARY,
        width: 40,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    loginSubtitle: {
        color: TEXT_PRIMARY,
        opacity: 0.8,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: FontFamily.Poppins_Regular
    },
    divisor: {
        backgroundColor: TEXT_PRIMARY,
        opacity: 0.05,
        width: "100%",
        height: 1,
    },
    label: {
        width: "100%"
    },
    containerBtn: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%"
    },
    btnOutline: {
        borderWidth: 2,
        borderColor: BUTTON_PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 45,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    btnOutlineTxt: {
        color: TEXT_PRIMARY,
        fontFamily: FontFamily.Poppins_Regular
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.8)",
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGTH
    },
    redirect: {
        backgroundColor: COLOR_PRIMARY,
        padding: 20,
        borderRadius: 10
    },
    modalText: {
        color: TEXT_PRIMARY,
        marginBottom: 20,
        fontFamily: FontFamily.Poppins_Regular
    }
});
