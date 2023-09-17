import { StyleSheet } from "react-native";
import { TEXT_PRIMARY } from "../../../constants/colors.constant";
import { FontFamily } from "../../../constants/fonts.constant";

export default StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: 22,
        marginLeft: 2
    },
    container: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        marginBottom: 8
    },
    text: {
        color: TEXT_PRIMARY,
        fontFamily: FontFamily.Poppins_Bold,
        textAlign: "center"
    }
})