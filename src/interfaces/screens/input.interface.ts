import { KeyboardTypeOptions } from "react-native";

/**
 * Interface for custom input component props.
 */
export interface CustomInputProps {
    /**
     * Placeholder text for the input.
    */
    placeholder: string;

    /**
     * Value of the input (controlled component).
    */
    value: string | undefined;

    /**
     * Keyboard type for the input (e.g., numeric, email, etc.).
    */
    keyboardType: KeyboardTypeOptions;

    /**
     * Flag to indicate if the input should be masked for sensitive data (e.g., passwords).
    */
    secureTextEntry?: boolean;

    /**
     * Function to validate the input's value.
     * Returns true if the value is valid, false otherwise.
    */
    isValid: (text: string | undefined) => boolean;

    /**
     * Function to handle changes in the input value.
    */
    onChangeText: (text: string) => void;

    /**
     * Auto-capitalization behavior for the input.
    */
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;

    /**
     * Flag to show validation status for the input.
    */
    showValidation?: boolean;
}
