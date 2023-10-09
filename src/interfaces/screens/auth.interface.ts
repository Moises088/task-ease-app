/**
 * Interface for the authentication context data.
*/
export interface AuthContextData {
    /**
     * Function to initiate a login with email and password.
     * @param email - The email for authentication.
     * @param password - The password for authentication.
    */
    login: (email: string, password: string) => void;

    /**
     * Function to initiate a login without an account (guest login).
    */
    loginWithoutAccount: () => void;

    /**
     * Function to log out the currently logged-in user.
    */
    logout: () => void;

    /**
     * A boolean indicating if a user is logged in.
    */
    isLogged: boolean;

    /**
     * A boolean indicating if login is in progress.
     */
    load: boolean;
}