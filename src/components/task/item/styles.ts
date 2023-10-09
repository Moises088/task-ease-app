import { StyleSheet } from "react-native";
import { BUTTON_PRIMARY } from "../../../constants/colors.constant";

export default StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    containerList: {
        width: 20,
        height: 20,
        marginRight: 20,
        marginLeft: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    containerListOl: {
        marginRight: 20,
        marginLeft: 8,
        color: BUTTON_PRIMARY,
        width: 20,
        height: 20,
        textAlign: "center"
    }
})