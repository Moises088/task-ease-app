import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, TEXT_PRIMARY } from "../../constants/colors.constant";
import { FontFamily } from "../../constants/fonts.constant";
import { STATUS_BAR_HEIGHT } from "../../constants/screen.constant";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        paddingTop: STATUS_BAR_HEIGHT + 30,
        paddingHorizontal: 20
    },
    containerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerHeaderBtn: {
        marginLeft: 10
    },
    containerBody: {
        marginTop: 30,
        padding: 12
    },
    containerSetting: {
        width: "100%"
    },
    btnSetting: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10
    },
    btnSettingTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerSettingText: {
        color: TEXT_PRIMARY,
        fontFamily: FontFamily.Poppins_Regular,
        opacity: 0.5
    },
    btnSettingText: {
        color: TEXT_PRIMARY,
        fontFamily: FontFamily.Poppins_Regular,
        marginLeft: 10
    },
    btnSettingImage: {
        width: 25,
        height: 25,
        borderRadius: 25,
        opacity: 0.8
    }
})