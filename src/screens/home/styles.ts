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
    containerHeaderText: {
        fontFamily: FontFamily.Poppins_Bold,
        color: TEXT_PRIMARY,
        fontSize: 19
    },
    containerHeaderBtns: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerHeaderBtn: {
        marginLeft: 10
    }
})