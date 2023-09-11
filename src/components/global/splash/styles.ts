import { StyleSheet } from "react-native";
import { WINDOW_HEIGTH, WINDOW_WIDTH } from "../../../constants/screen.constant";
import { COLOR_SPLASH } from "../../../constants/colors.constant";

export default StyleSheet.create({
    container: {
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGTH,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR_SPLASH
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 30
    }
})