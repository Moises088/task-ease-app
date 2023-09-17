import { StyleSheet } from "react-native";
import { COLOR_PRIMARY, MODAL_PRIMARY, TEXT_PRIMARY } from "../../constants/colors.constant";
import { FontFamily } from "../../constants/fonts.constant";
import { STATUS_BAR_HEIGHT } from "../../constants/screen.constant";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_PRIMARY,
        paddingTop: STATUS_BAR_HEIGHT + 30,
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
        fontSize: 19
    },
    input: {
        marginTop: 30,
        fontSize: 30,
        color: TEXT_PRIMARY,
        fontFamily: FontFamily.Poppins_Regular,
    },
    containerBtn: {
        width: "100%",
        height: 50,
        marginTop: 40,
        alignItems: "flex-end",
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    containerPosHeader: {
        marginTop: 20,
        flexDirection: "row"
    },
    posHeader: {
        margin: 3,
        marginLeft: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    posHeaderText: {
        color: "#868686",
        fontSize: 17,
        marginLeft: 3
    },
    modal: {
        backgroundColor: MODAL_PRIMARY,
        padding: 15,
        paddingTop: 40,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 7,
    },
    coverImage: {
    },
    removeCoverImage: {
        top: 0,
        left: 3,
        backgroundColor: TEXT_PRIMARY,
        marginTop: 20,
        marginBottom: 8,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        flexDirection: "row"
    },
    removeCoverImageText: {
        color: COLOR_PRIMARY,
        fontFamily: FontFamily.Poppins_Regular,
        fontSize: 13,
        marginLeft: 2
    }
})