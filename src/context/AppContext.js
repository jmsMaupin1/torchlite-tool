import { createContext, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AppContext = createContext(null);

const AppContextProvider = (props) => {
	const [currentPage, setCurrentPage] = useState('home');
	const { i18n } = useTranslation();
	const [skills, setSkills] = useState(null);
	const [en, setDataI18n] = useState(null); //todo: Rename en to dataI18n
	const [itemBase, setItemBase] = useState(null);
	const [itemGold, setItemGold] = useState(null);
	const [modifiers, setModifiers] = useState(null);
	const [profession, setProfession] = useState(null);
	const [skillTag, setSkillTag] = useState(null);
	const [talent, setTalent] = useState(null);
	const [perk, setPerk] = useState(null);
	// eslint-disable-next-line
	const [hero, setHero] = useState(null);
	const topMenu = useRef(null);

	useEffect(() => {
		/*import('../i18n/en/en.json').then((data) => {
			setDataI18n(data.default);
			console.log('translation loaded');
		});*/
		import('./../data/skills.json').then((data) => {
			console.log('skills loaded');
			setSkills(data.default);
		});
		import('./../data/item_base.json').then((data) => {
			setItemBase(data.default);
			console.log('bases loaded');
		});
		import('./../data/item_gold.json').then((data) => {
			setItemGold(data.default);
			console.log('legendary loaded');
		});
		import('./../data/modifiers.json').then((data) => {
			setModifiers(data.default);
			console.log('modifiers loaded');
		});
		import('./../data/profession.json').then((data) => {
			setProfession(data.default);
			console.log('profession loaded');
		});
		import('./../data/skill_tag.json').then((data) => {
			setSkillTag(data.default);
			console.log('skill tag loaded');
		});
		import('./../data/talent.json').then((data) => {
			setTalent(data.default);
			console.log('talent loaded');
		});
		import('./../data/perk.json').then((data) => {
			setPerk(data.default);
			console.log('perk loaded');
		});
		import('./../data/hero.json').then((data) => {
			setHero(data.default);
			console.log('hero loaded');
		});
	}, []);

	useEffect(() => {
		if (i18n?.language) {
			switch (i18n.language) {
				case 'fr':
					import('../i18n/fr/fr.json').then((data) => {
						setDataI18n(data.default);
					});
					break;
				default:
					import('../i18n/en/en.json').then((data) => {
						setDataI18n(data.default);
					});

					console.log(`translation ${i18n.language} loaded`);
			}
		}
	}, [i18n.language]);

	const translate = (key) => {
		let data = en.find((e) => e.index === key);
		if (data !== undefined) {
			//let myReg = /<e[^>]*>(.*?)<\/e>/img;
			//en.find((h) => h.index === "hyperlink|des|")
			//return data.value.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>").replace("\\n","<br>")
			return data.value;
		} else {
			return key;
		}
	};

	const replaceTag = (str) => {
		if (Array.isArray(str)) {
			str = str[0];
		}
		if (str === null) {
			return '';
		}
		//let myReg = /<e[^>]*>(.*?)<\/e>/img;
		let myReg = /<e([^>]*)[^>]*>(.*?)<\/e>/gim;
		return str
			.replace(
				myReg,
				"<a style='color:#00ffff;font-weight:bold' class='tooltip hover:cursor-pointer' $1 href=''>$2</a>"
			)
			.replace('\\n', '<br>');
	};

	const sortAlpha = (a, b) => {
		let transA = translate(a.name);
		let transB = translate(b.name);

		return transA.localeCompare(transB);
	};

	return (
		<AppContext.Provider
			value={{
				itemBase,
				itemGold,
				modifiers,
				profession,
				skillTag,
				en, //todo: Rename en to dataI18n
				replaceTag,
				perk,
				hero,
				talent,
				translate,
				setCurrentPage,
				currentPage,
				sortAlpha,
				skills,
				topMenu,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
export { AppContextProvider, AppContext };
