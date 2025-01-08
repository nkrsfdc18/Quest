import { LightningElement, track } from 'lwc';
import LOGO from "@salesforce/contentAssetUrl/logoone";

export default class Quest_Default_Navbar extends LightningElement {

    @track availableLanguages = ['Português', 'Français', 'Deutsch', '日本語', 'Español', '中文'];
    @track selectedLanguage = 'English';

    // Language-to-locale mapping
    languageLocaleMap = {
        'English': 'en_US',
        'Português': 'pt_BR',
        'Français': 'fr_FR',
        'Deutsch': 'de_DE',
        '日本語': 'ja_JP',
        'Español': 'es_ES',
        '中文': 'zh_CN'
    };

    get logoUrl() {
        return LOGO;
    }
}