import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

const dict = {
	fr,
	en,
};

export const initI18n = () => {
	const userLanguage = window.navigator.language.split('-')[0] || window.navigator.userLanguage;

	const lng = localStorage.getItem('language') || userLanguage || 'en';

	const i18nConfig = {
		debug: false,
		resources: dict,
		lng: 'en', // lng: 'en', force en lang, lng: 'fr'
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	};

	i18next
		.use(initReactI18next) // passes i18n down to react-i18next
		.init(i18nConfig)
		.then((r) => {})
		.catch((e) => console.error('initI18n: ', e));
};

export const switchLang = async (language) => {
	await i18next
		.changeLanguage(language)
		.then(() => {
			localStorage.setItem('language', language);
		})
		.catch((e) => console.error(e));
};
