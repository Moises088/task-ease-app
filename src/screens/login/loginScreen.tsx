import React from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform, Modal, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import CustomInput from '../../components/global/custom-input';
import { isValidEmail, isValidPass } from '../../validations/email.validate';
import CustomButton from '../../components/global/custom-button';
import { AuthContext } from '../../contexts/auth.context';
import { BUTTON_PRIMARY } from '../../constants/colors.constant';
import { Language } from '../../services/language.service';
import { ApiContext } from '../../contexts/api.context';

const google = 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'

const LoginScreen: React.FC = () => {

    const { loginWithoutAccount } = React.useContext(AuthContext)
    const { language } = React.useContext(ApiContext)

    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();

    const defaultAlert = () => {
        alert(Language.translate("AlertLogin", language))
    }

    React.useEffect(() => {
        setTimeout(() => {
            loginWithoutAccount();
        }, 100);
    }, [])

    const handleGoogleLogin = () => { defaultAlert() };

    const handleFacebookLogin = () => { defaultAlert() };

    const handleAppleLogin = () => { defaultAlert() };

    const handleTwitterLogin = () => { defaultAlert() };

    const handleEmailLogin = () => { defaultAlert() }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.containerScrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.centerContainer}>
                        <View style={styles.containerForm}>
                            <Text style={styles.loginSubtitle}>
                                {Language.translate("LoginSocial", language)}
                            </Text>
                            <View style={styles.containerSocialMedia}>
                                <TouchableOpacity onPress={handleGoogleLogin}>
                                    <Image source={{ uri: google }} style={styles.loginIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.loginIcon} onPress={handleFacebookLogin}>
                                    <Ionicons name="logo-facebook" size={30} color="#4267B2" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.loginIcon} onPress={handleAppleLogin}>
                                    <Ionicons name="logo-apple" size={30} color="#000" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.loginIcon} onPress={handleTwitterLogin}>
                                    <Ionicons name="logo-twitter" size={30} color="#1DA1F2" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.divisor} />
                            <Text style={styles.loginSubtitle}>
                                {Language.translate("LoginEmail", language)}
                            </Text>

                            <View style={styles.label}>
                                <Text style={styles.loginSubtitle}>E-mail</Text>
                            </View>
                            <CustomInput
                                isValid={isValidEmail}
                                keyboardType='email-address'
                                placeholder='E-mail'
                                autoCapitalize='none'
                                value={email}
                                onChangeText={value => setEmail(value)}
                            />

                            <View style={styles.label}>
                                <Text style={styles.loginSubtitle}>
                                    {Language.translate("Password", language)}
                                </Text>
                            </View>
                            <CustomInput
                                isValid={isValidPass}
                                keyboardType='visible-password'
                                placeholder='*******'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                value={password}
                                onChangeText={value => setPassword(value)}
                            />

                            <View style={styles.containerBtn}>
                                <CustomButton
                                    click={handleEmailLogin}
                                    title='Login'
                                    backgroundColor={BUTTON_PRIMARY}
                                />
                            </View>

                            <View style={styles.divisor} />
                            <Text style={styles.loginSubtitle}>
                                {Language.translate("Or", language)}
                            </Text>

                            <TouchableOpacity style={styles.btnOutline} onPress={loginWithoutAccount}>
                                <Text style={styles.btnOutlineTxt}>
                                    {Language.translate("LoginWithoutAccount", language)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <Modal visible={true} transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.redirect}>
                            <Text style={styles.modalText}>
                                {Language.translate("Redirect", language)}...
                            </Text>
                            <ActivityIndicator size="small" color="#FFF" />
                        </View>
                    </View>
                </Modal>
            </View>
        </KeyboardAvoidingView>
    );
}

export default LoginScreen;
