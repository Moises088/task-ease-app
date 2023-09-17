import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, Modal } from 'react-native';
import { CustomButtonProps } from '../../../interfaces/screens/button.interface';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, AnimatedStyleProp, runOnJS } from 'react-native-reanimated';
import { BUTTON_PRIMARY } from '../../../constants/colors.constant';
import { ApiContext } from '../../../contexts/api.context';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const CustomButton: React.FC<CustomButtonProps> = ({ title, click, style, icon, color, backgroundColor }) => {

    const { loading, statusCode } = React.useContext(ApiContext)

    const textOffset = useSharedValue(0);
    const buttonRef = React.useRef<TouchableOpacity>(null);
    const [buttonColor, setButtonColor] = React.useState(backgroundColor ? backgroundColor : BUTTON_PRIMARY);

    const viewStyle: AnimatedStyleProp<ViewStyle> = {
        height: 40,
        top: 20,
        padding: 0,
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
    }

    React.useEffect(() => {
        if (loading) {
            if (buttonRef.current) {
                buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
                    textOffset.value = withSpring(pageX + width);
                });
            }
        } else {
            textOffset.value = withTiming(0, { duration: 50 });
        }
    }, [loading])

    React.useEffect(() => {
        setButtonColor(backgroundColor ? backgroundColor : BUTTON_PRIMARY);
        if (statusCode === 200) {
            setButtonColor('#5cb85c');
            const timer = setTimeout(() => {
                runOnJS(setButtonColor)(backgroundColor ? backgroundColor : BUTTON_PRIMARY);
            }, 550);
            return () => clearTimeout(timer);
        }
    }, [statusCode]);

    const buttonTextStyles = useAnimatedStyle(() => {
        return {
            ...viewStyle,
            transform: [{ translateX: textOffset.value }],
            opacity: loading ? withTiming(0, { duration: 200 }) : withTiming(1, { duration: 400 }),
        };
    });

    const loadingStyles = useAnimatedStyle(() => {
        return {
            ...viewStyle,
            top: -20,
            transform: [{ translateX: loading ? withSpring(0) : withTiming(-100, { duration: 200 }) }],
            opacity: loading ? withSpring(1) : withTiming(0, { duration: 200 }),
        };
    });

    const handlePress = () => {
        if (!loading) {
            click();
        }
    };

    return (
        <>
            <TouchableOpacity
                ref={buttonRef}
                onPress={handlePress}
                disabled={loading}
                style={[
                    styles.button,
                    style ? style : {},
                    { backgroundColor: buttonColor },
                ]}
            >
                {title && (
                    <Animated.View style={buttonTextStyles}>
                        {buttonColor != "#5cb85c" ? (
                            <Text style={styles.buttonText}>{title}</Text>
                        ) : (
                            <AntDesign name="check" size={24} color="#FFF" />
                        )}
                    </Animated.View>
                )}
                {icon && (
                    <Animated.View style={buttonTextStyles}>
                        {buttonColor != "#5cb85c" ? (
                            <Text style={styles.buttonText}>{icon()}</Text>
                        ) : (
                            <AntDesign name="check" size={24} color="#FFF" />
                        )}
                    </Animated.View>
                )}
                <Animated.View style={loadingStyles}>
                    <ActivityIndicator size="small" color={color ? color : "#ffffff"} />
                </Animated.View>
            </TouchableOpacity >

            <Modal visible={loading} transparent={true}></Modal>
        </>
    );
}

export default CustomButton;
