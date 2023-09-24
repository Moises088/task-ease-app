import { StyleSheet } from "react-native";
import { TEXT_PRIMARY, TEXT_SUCCESS } from "../../../constants/colors.constant";
import { FontFamily } from "../../../constants/fonts.constant";

export default StyleSheet.create({
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
    containerTitle: {
        flexDirection: "row",
        alignItems: "center"
    }
})