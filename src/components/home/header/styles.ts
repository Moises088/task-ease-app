import { StyleSheet } from "react-native";
import { TEXT_PRIMARY } from "../../../constants/colors.constant";
import { FontFamily } from "../../../constants/fonts.constant";

export default StyleSheet.create({
    header: {
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
    },
    containerCreate: {
        marginTop: 60,
        marginBottom: 45
    },
    listText: {
        fontFamily: FontFamily.Poppins_Regular,
        color: TEXT_PRIMARY,
        marginBottom: 15,
        fontSize: 17
    }
})