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
})