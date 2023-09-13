import { StyleProp, ViewStyle } from "react-native";
export interface CustomButtonProps {
    backgroundColor: string;
    click: () => void;
    title?: string;
    color?: string;
    style?: StyleProp<ViewStyle>
    icon?: () => JSX.Element;
}