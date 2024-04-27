import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";

import en from './i18nLocales/en.json';
import fr from './i18nLocales/fr.json';

// import common from './i18nLocales/en/common.json';
// import config from './i18nLocales/en/config.json';
// import prod from './i18nLocales/en/prod.json';

export const defaultNS = 'common';
export const resources = {
  en,
  fr
}

export const availableLanguages = Object.keys(resources)


i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS,
//i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'fr',
  //debug: false,

  //lng: 'en',
  //ns: ['common','config', 'prod'],
  

  // interpolation: {
  //   escapeValue: false, // not needed for react as it escapes by default
  // },
  //
});

// console.log(i18n);

// export default i18n;