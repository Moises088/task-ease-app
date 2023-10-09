import { AxiosResponse } from "axios";

/**
 * Interface for the API context.
*/
export interface ApiContextData {
    /**
     * Flag indicating if global splash is active.
    */
    load: boolean;

    /**
     * Function to make an external API request.
     * @param requestFunction - A function that returns a promise with AxiosResponse.
     * @returns A promise containing data and status code.
    */
    makeApiRequest<T>(requestFunction: () => Promise<AxiosResponse<T, any>>): Promise<{ data: T, statusCode: number }>;

    /**
     * Function to make a local request (sqlite).
     * @param requestFunction - A function that returns a promise.
     * @returns A promise containing data and status code.
    */
    makeLocalRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T, statusCode: number }>;

    /**
     * Flag indicating if loading is active.
    */
    loading: boolean;

    /**
     * Status code for the request, seted with undefined after an timeout.
    */
    statusCode?: number;

    /**
     * Function to make a local storage request.
     * @param requestFunction - A function that returns a promise.
     * @param showLoading - A boolean indicating if that load show to user.
     * @returns A promise containing data.
    */
    makeLocalStorageRequest<T>(requestFunction: () => Promise<T>, showLoading?: boolean): Promise<{ data: T }>;

    /**
     * Function to set the language for the app.
     * @param language - The language code ("pt-BR" or "en").
    */
    setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "en">>;

    /**
     * The current language.
    */
    language: "pt-BR" | "en";
}