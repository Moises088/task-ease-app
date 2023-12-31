import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, TEXT_PRIMARY } from "../../constants/colors.constant";
import { FontFamily } from "../../constants/fonts.constant";
import { STATUS_BAR_HEIGHT } from "../../constants/screen.constant";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        paddingTop: STATUS_BAR_HEIGHT,
        paddingHorizontal: 20
    },
    list: {
        paddingTop: 30
    },
})