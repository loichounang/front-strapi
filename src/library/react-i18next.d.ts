
//import 'react-i18next';

import {defaultNS, resources} from '../library/i18n';

//import en from './i18nLocales/en.json';
//import fr from './i18nLocales/fr.json';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: typeof resources.fr;
    }
}