import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, MODAL_PRIMARY, TEXT_PRIMARY, TEXT_SUCCESS } from "../../constants/colors.constant";
import { FontFamily } from "../../constants/fonts.constant";
import { STATUS_BAR_HEIGHT } from "../../constants/screen.constant";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        paddingTop: STATUS_BAR_HEIGHT + 10,
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
        fontSize: 19,
        marginLeft: 4
    },
    containerHeaderBtns: {
        flexDirection: "row",
        alignItems: "center"
    },
    containerHeaderBtn: {
        marginLeft: 10
    },
    containerHeaderSmall: {
        color: "#868686",
        fontFamily: FontFamily.Poppins_Light,
        fontSize: 11,
        marginTop: 3
    },
    containerTextSave: {
        color: TEXT_SUCCESS,
        opacity: 0.7
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 7,
    },
    coverImage: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    containerBody: {
        marginTop: 30
    },
    options: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center"
        // backgroundColor: "red"
    },
    option: {
        width: 35,
        height: 35,
        backgroundColor: MODAL_PRIMARY,
        marginRight: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3
    },
    containerTitle: {
        flexDirection: "row",
        alignItems: "center"
    }
})