import { AxiosResponse } from "axios";

export interface ApiContextData {
    load: boolean;
    makeApiRequest<T>(requestFunction: () => Promise<AxiosResponse<T, any>>): Promise<{ data: T, statusCode: number }>;
    makeLocalRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T, statusCode: number }>;
    loading: boolean;
    statusCode?: number;
    makeLocalStorageRequest<T>(requestFunction: () => Promise<T>): Promise<{ data: T }>;
    setLanguage: React.Dispatch<React.SetStateAction<"pt-BR" | "en">>;
    language: "pt-BR" | "en";
}