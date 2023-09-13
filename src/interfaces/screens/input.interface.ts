import { KeyboardTypeOptions } from "react-native";

export interface CustomInputProps {
    placeholder: string;
    value: string | undefined;
    keyboardType: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    isValid: (text: string | undefined) => boolean;
    onChangeText: (text: string) => void;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    showValidation?: boolean;
}