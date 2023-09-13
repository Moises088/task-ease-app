import React from "react";
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from "./styles";
import { CustomInputProps } from "../../../interfaces/screens/input.interface";

const CustomInput: React.FC<CustomInputProps> = ({
    placeholder,
    keyboardType,
    secureTextEntry,
    isValid,
    onChangeText,
    value,
    ...props
}) => {

    const [isFocused, setIsFocused] = React.useState(false);

    const handleBlur = () => {
        setIsFocused(false)
    };

    const handleFocus = () => {
        setIsFocused(true)
    };

    return (
        <View style={[
            styles.container,
            isFocused ?
                !isValid(value) ? styles.invalid : styles.valid
                : {}
        ]}>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                onBlur={handleBlur}
                onFocus={handleFocus}
                style={styles.input}
                {...props}
            />

            <View style={[styles.iconContainer, (isValid(value) && props?.showValidation) && styles.validIcon]}>
                {(isValid(value) && props?.showValidation) && (
                    <FontAwesome name="check" size={18} color="#1DB954" />
                )}
            </View>
        </View>
    );
};

export default CustomInput;