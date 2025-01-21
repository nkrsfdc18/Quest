import { LightningElement, track } from 'lwc';
import LOGO from "@salesforce/contentAssetUrl/logoone";

export default class Quest_Default_Navbar extends LightningElement {

    @track availableLanguages = ['English','Português', 'Français', 'Deutsch', '日本語', 'Español', '中文'];
    @track selectedLanguage = 'English';

    // Language-to-locale mapping
    languageLocaleMap = {
        'English': 'en_US',
        'Português': 'pt_BR',
        'Français': 'fr',
        'Deutsch': 'de_DE',
        '日本語': 'ja_JP',
        'Español': 'es_ES',
        '中文': 'zh_CN'
    };

    get logoUrl() {
        return LOGO;
    }

    connectedCallback() {
        // Get the current URL and extract the 'language' parameter
        const url = new URL(window.location.href);
        const locale = url.searchParams.get('language'); // e.g., en_US

        if (locale) {
            // Find the matching language key for the locale
            const matchingLanguage = Object.entries(this.languageLocaleMap).find(
                ([key, value]) => value === locale
            );

            if (matchingLanguage) {
                this.selectedLanguage = matchingLanguage[0]; // Store only the key (e.g., 'Français')
                console.log(`Selected language set from URL: ${this.selectedLanguage}`);
            }
        }
    }
    get filteredLanguages() {
        // Exclude the selected language from the availableLanguages list
        return this.availableLanguages.filter(lang => lang !== this.selectedLanguage);
    }

    handleLanguageChange(event) {
        const selectedLanguage = event.target.dataset.language;
        if (selectedLanguage) {
            this.selectedLanguage = selectedLanguage;

            // Update the website's language or locale settings
            const selectedLocale = this.languageLocaleMap[selectedLanguage];
            console.log(`Language changed to: ${selectedLanguage} (${selectedLocale})`);

            this.updateWebsiteLanguage(selectedLocale);
        }
    }
    updateWebsiteLanguage(locale) {

        console.log(`Website updated to locale: ${locale}`);

        // Get the current URL
        const url = new URL(window.location.href);

        // Update the language parameter
        url.searchParams.set('language', locale);

        // Reload the page with the updated URL
        window.location.href = url.toString(); // Redirect to the updated URL

        console.log(`Language updated to: ${locale}`);
    }
}