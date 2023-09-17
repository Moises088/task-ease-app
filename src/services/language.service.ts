import { LANGUAGES_LIST } from "../constants/languages.constant";
import { SettingLanguage } from "../interfaces/screens/settings.interface";
import { Storage } from "./storage.service";
import { I18n } from 'i18n-js';
import en from '../translations/en';
import ptBR from '../translations/pt-br';
import * as Localization from 'expo-localization';

class LanguageCls {
    protected languageKey: string = 'LANGUAGE';
    protected i18n = new I18n({
        en,
        "pt-BR": ptBR,
    }, {
        defaultLocale: "pt-BR"
    });

    private getMobileLanguage() {
        const locale = Localization.locale;
        return locale
    }

    public async getActiveLanguage(): Promise<SettingLanguage> {
        const activeLanguage = await Storage.get<{ active: string }>(this.languageKey)
        let active = activeLanguage;

        if (!activeLanguage) {
            const locale = this.getMobileLanguage()
            await Storage.save<{ active: string }>(this.languageKey, { active: locale })
            active = { active: locale };
        }

        const find = LANGUAGES_LIST.find(l => l.id == active?.active);
        if (find) return find
        return LANGUAGES_LIST[0]
    }

    public async changeLanguage(item: SettingLanguage): Promise<SettingLanguage> {
        const activeLanguage = await Storage.get<{ active: string }>(this.languageKey)
        if (!activeLanguage) {
            await Storage.save<{ active: string }>(this.languageKey, { active: item.id })
            return item
        }

        await Storage.update<{ active: string }>(this.languageKey, { active: item.id })
        return item;
    }

    public translate(key: string, active: "pt-BR" | "en"): string {
        this.i18n.locale = active;
        return this.i18n.t(key)
    }
}

export const Language = new LanguageCls()