/**
 * Interface representing a language setting.
*/
export interface SettingLanguage {
    /**
     * Label or display name for the language.
    */
    label: string;

    /**
     * Image path or identifier for the language (could be a flag or icon representing the language).
    */
    image: string;

    /**
     * Unique identifier for the language, typically in the format of language code (e.g., "pt-BR" for Brazilian Portuguese, "en" for English).
    */
    id: "pt-BR" | "en"; // Language code: "pt-BR" for Brazilian Portuguese, "en" for English
}
