import { StyleSheet } from "react-native";
import { MODAL_PRIMARY } from "../../../constants/colors.constant";

export default StyleSheet.create({
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
})