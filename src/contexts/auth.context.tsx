import React, { createContext } from "react";
import { AuthContextData } from "../interfaces/screens/auth.interface";

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {

    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const [load, setLoad] = React.useState<boolean>(false);

    React.useEffect(() => {
        checkIsLogged()
    }, [])

    const checkIsLogged = async () => {
        try {

        } catch (error) { } finally {
            setLoad(false)
        }
    }

    const login = (accessToken: string) => {

    }

    const loginWithoutAccount = () => {
        setIsLogged(true)
    }

    const logout = () => {
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{ login, loginWithoutAccount, isLogged, logout, load }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
