import { StyleSheet } from "react-native";
import { TEXT_PRIMARY, TEXT_SECOND } from "../../../constants/colors.constant";
import { FontFamily } from "../../../constants/fonts.constant";

export default StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row"
    },
    icon: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
    },
    text: {
        color: TEXT_SECOND,
        fontFamily: FontFamily.Poppins_Regular,
        marginLeft: 8,
        fontSize: 16
    },
    small: {
        color: "#868686",
        fontFamily: FontFamily.Poppins_Light,
        marginLeft: 8,
        fontSize: 11,
        marginTop: 3
    }
})