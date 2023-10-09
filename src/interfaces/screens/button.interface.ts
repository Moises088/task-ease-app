import { StyleProp, ViewStyle } from "react-native";

/**
 * Interface for custom button props.
*/
export interface CustomButtonProps {
    /**
     * Background color of the button.
    */
    backgroundColor: string;

    /**
     * Function to handle the button click event.
    */
    click: () => void;

    /**
     * Optional title or text for the button.
    */
    title?: string;

    /**
     * Optional color for the button text or icon.
    */
    color?: string;

    /**
     * Optional style for the button, accepts standard React Native styles.
    */
    style?: StyleProp<ViewStyle>;

    /**
     * Optional function to render an icon within the button.
     * Should return a JSX element.
    */
    icon?: () => JSX.Element;
}