import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BuildContext } from '../context/BuildContext';
import { useSearchParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaShareAlt } from 'react-icons/fa';
import { MdArrowRight } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import HyperLinkTooltip from '../components/HyperLinkTooltip';
import Loader from '../components/Loader';
import { useTranslation } from 'react-i18next';
import SkillBuild from '../components/build/SkillBuild';
import TraitBuild from '../components/build/TraitBuild';
import MandatoryItemsBuild from '../components/build/MandatoryItemsBuild';
import InitialProfessionBuild from '../components/build/InitialProfessionBuild';
import Spec1Build from '../components/build/Spec1Build';
import Spec2Build from '../components/build/Spec2Build';
import AbilityTreeHelper from '../components/build/AbilityTreeHelper';
import Prof1TreeBuild from '../components/build/Prof1TreeBuild';
import Spec1TreeBuild from '../components/build/Spec1TreeBuild';
import Spec2TreeBuild from '../components/build/Spec2TreeBuild';

function Build() {
	const { translate, topMenu, profession, skills, talent, dataI18n, itemGold, i18n } = useContext(AppContext);
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams();
	const { t } = useTranslation();
	const { skill1, setSkill, skill2, skill3, skill4, skill5, skill6, skill7, skill8 } = useContext(BuildContext);
	const [currentMainProf, setCurrentMainProf] = useState(null);
	const [sideMenuVisible, setSideMenuVisible] = useState(false);
	const [currentTrait, setCurrentTrait] = useState({
		specId: null,
		specName: null,
		15: null,
		32: null,
		50: null,
		62: null,
		80: null,
	});
	const [spec1, setSpec1] = useState(null);
	const [spec2, setSpec2] = useState(null);

	const [currentTree, setCurrentTree] = useState(null);
	const [currentTreeOrder, setCurrentTreeOrder] = useState(null);
	const [currentNodeFilter, setCurrentNodeFilter] = useState(null);

	const [buildUrl, setBuildUrl] = useState(null);
	const [buildUrlMinified, setBuildUrlMinified] = useState(null);

	// navigation
	const fieldRefSkills = React.useRef(null);
	const fieldRefMainProf = React.useRef(null);
	const fieldRefTrait = React.useRef(null);
	const fieldRefSelectMainProf = React.useRef(null);
	const fieldRefSpec1 = React.useRef(null);
	const fieldRefSelectSpec1 = React.useRef(null);
	const fieldRefSpec2 = React.useRef(null);
	const fieldRefSelectSpec2 = React.useRef(null);
	const fieldRefItems = React.useRef(null);

	// modal for selected gems
	const [sticky, setSticky] = useState(false);

	// items mandatory
	const [currentItems, setCurrentItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);

	// keep track of point

	const [mainProfPoint, setMainProfPoint] = useState({ nb: 0, core1: null, core2: null });
	const [spec1Point, setSpec1Point] = useState({ nb: 0, core1: null, core2: null });
	const [spec2Point, setSpec2Point] = useState({ nb: 0, core1: null, core2: null });

	// keep track of stat
	const [mainProfStat, setMainProfStat] = useState(null);
	const [spec1Stat, setSpec1Stat] = useState(null);
	const [spec2Stat, setSpec2Stat] = useState(null);
	const [totalStat, setTotalStat] = useState(null);

	// spec1 tree
	const [currentTreeSpec1, setCurrentTreeSpec1] = useState(null);
	const [currentTreeOrderSpec1, setCurrentTreeOrderSpec1] = useState(null);

	//spec2 tree
	const [currentTreeSpec2, setCurrentTreeSpec2] = useState(null);
	const [currentTreeOrderSpec2, setCurrentTreeOrderSpec2] = useState(null);

	// skills
	const _setCurrentMainProf = (data) => {
		if (data == null) {
			setMainProfPoint({ nb: 0, core1: null, core2: null });
			setMainProfStat(null);
			setCurrentTree(null);
			setCurrentTrait({ specId: null, specName: null, 15: null, 32: null, 50: null, 62: null, 80: null });
		}
		setCurrentMainProf(data);
	};
	const _setSpec1 = (data) => {
		if (data == null) {
			setSpec1Point({ nb: 0, core1: null, core2: null });
			setSpec1Stat(null);
			setCurrentTreeSpec1(null);
		}
		setSpec1(data);
	};
	const _setSpec2 = (data) => {
		if (data == null) {
			setSpec2Point({ nb: 0, core1: null, core2: null });
			setSpec2Stat(null);
			setCurrentTreeSpec2(null);
		}
		setSpec2(data);
	};
	useEffect(() => {
		if (currentMainProf !== null) {
			displayTalent();
		}
		// eslint-disable-next-line
	}, [currentMainProf]);

	useEffect(() => {
		computedStatFromTree();
		// eslint-disable-next-line
	}, [mainProfPoint]);

	useEffect(() => {
		computedStatFromSpec1Tree();
		// eslint-disable-next-line
	}, [spec1Point]);

	useEffect(() => {
		computedStatFromSpec2Tree();
		// eslint-disable-next-line
	}, [spec2Point]);

	useEffect(() => {
		if (spec1 !== null) displayTalentSpec1();
		// eslint-disable-next-line
	}, [spec1]);

	useEffect(() => {
		if (spec2 !== null) displayTalentSpec2();
		// eslint-disable-next-line
	}, [spec2]);

	const displayTalent = () => {
		let talentId = currentMainProf.talent_id.split('|');
		let startId = talentId[0];
		let endId = talentId[1];
		let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
		setCurrentTree(currentTalent);
		setCurrentTreeOrder(test([...currentTalent]));
	};

	const displayTalentSpec1 = () => {
		let talentId = spec1.talent_id.split('|');
		let startId = talentId[0];
		let endId = talentId[1];
		let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
		setCurrentTreeSpec1(currentTalent);
		setCurrentTreeOrderSpec1(test([...currentTalent]));
	};
	const displayTalentSpec2 = () => {
		let talentId = spec2.talent_id.split('|');
		let startId = talentId[0];
		let endId = talentId[1];
		let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
		setCurrentTreeSpec2(currentTalent);
		setCurrentTreeOrderSpec2(test([...currentTalent]));
	};
	const removePoint = (e, object, current) => {
		e.preventDefault();
		let position = object.position;
		//let max = object.level_up_time
		//let pointNeed = object.need_points;
		switch (current) {
			case 'main':
				let _mainProfPoint = { ...mainProfPoint };
				if (_mainProfPoint[position] === undefined) {
					_mainProfPoint[position] = 0;
				}
				if (_mainProfPoint[position] > 0) {
					_mainProfPoint[position] -= 1;
					_mainProfPoint.nb--;
					setMainProfPoint(_mainProfPoint);
				}

				break;
			case 'spec1':
				let _spec1Point = { ...spec1Point };
				if (_spec1Point[position] === undefined) {
					_spec1Point[position] = 0;
				}
				if (_spec1Point[position] > 0) {
					_spec1Point[position] -= 1;
					_spec1Point.nb -= 1;
					setSpec1Point(_spec1Point);
				}

				break;
			case 'spec2':
				let _spec2Point = { ...spec2Point };
				if (_spec2Point[position] === undefined) {
					_spec2Point[position] = 0;
				}
				if (_spec2Point[position] > 0) {
					_spec2Point[position] -= 1;
					_spec2Point.nb -= 1;
					setSpec2Point(_spec2Point);
				}

				break;
			default:
				break;
		}
	};
	const addPoint = (object, current) => {
		let max = object.level_up_time;
		let pointNeed = parseInt(object.need_points);

		let position = object.position;
		switch (current) {
			case 'main':
				let _mainProfPoint = { ...mainProfPoint };
				if (_mainProfPoint[position] === undefined) {
					_mainProfPoint[position] = 0;
				}

				if (_mainProfPoint[position] === parseInt(max)) {
					toast.error('Already at max !');
				} else {
					if (pointNeed <= _mainProfPoint.nb) {
						_mainProfPoint[position] += 1;
						_mainProfPoint.nb++;
						setMainProfPoint(_mainProfPoint);
					} else {
						toast.error('Not enought points !');
					}
				}
				break;
			case 'spec1':
				let _spec1Point = { ...spec1Point };
				if (_spec1Point[position] === undefined) {
					_spec1Point[position] = 0;
				}
				if (_spec1Point[position] === parseInt(max)) {
					toast.error('Already at max !');
				} else {
					if (pointNeed <= _spec1Point.nb) {
						_spec1Point.nb++;
						_spec1Point[position] += 1;
						setSpec1Point(_spec1Point);
					} else {
						toast.error('Not enought points !');
					}
				}
				break;
			case 'spec2':
				let _spec2Point = { ...spec2Point };
				if (_spec2Point[position] === undefined) {
					_spec2Point[position] = 0;
				}
				if (_spec2Point[position] === parseInt(max)) {
					toast.error('Already at max !');
				} else {
					if (pointNeed <= _spec2Point.nb) {
						_spec2Point.nb++;
						_spec2Point[position] += 1;
						setSpec2Point(_spec2Point);
					} else {
						toast.error('Not enought points !');
					}
				}
				break;
			default:
				break;
		}
	};
	const computedStatFromTree = () => {
		//mainProfPoint
		//currentTree
		//console.log(mainProfPoint);
		let _mainProfStat = {};
		for (const [position, value] of Object.entries(mainProfPoint)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				if (value > 0) {
					let currentNode = currentTree.find((e) => e.position === position);
					let attr = currentNode.attr.split(';');

					attr.forEach((a) => {
						if (_mainProfStat[a.split(':')[0]] === undefined) {
							_mainProfStat[a.split(':')[0]] = 0;
						}
						_mainProfStat[a.split(':')[0]] += parseInt(value) * parseInt(a.split(':')[1].replace('[', '').replace(']', ''));
					});
				}
			}
		}
		setMainProfStat(_mainProfStat);
	};
	const computedStatFromSpec1Tree = () => {
		let _spec1Stat = {};
		for (const [position, value] of Object.entries(spec1Point)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				if (value > 0) {
					let currentNode = currentTreeSpec1.find((e) => e.position === position);
					let attr = currentNode.attr.split(';');

					attr.forEach((a) => {
						if (_spec1Stat[a.split(':')[0]] === undefined) {
							_spec1Stat[a.split(':')[0]] = 0;
						}
						_spec1Stat[a.split(':')[0]] += parseInt(value) * parseInt(a.split(':')[1].replace('[', '').replace(']', ''));
					});
				}
			}
		}
		setSpec1Stat(_spec1Stat);
	};
	const computedStatFromSpec2Tree = () => {
		let _spec2Stat = {};
		for (const [position, value] of Object.entries(spec2Point)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				if (value > 0) {
					let currentNode = currentTreeSpec2.find((e) => e.position === position);
					let attr = currentNode.attr.split(';');

					attr.forEach((a) => {
						if (_spec2Stat[a.split(':')[0]] === undefined) {
							_spec2Stat[a.split(':')[0]] = 0;
						}
						_spec2Stat[a.split(':')[0]] += parseInt(value) * parseInt(a.split(':')[1].replace('[', '').replace(']', ''));
					});
				}
			}
		}
		setSpec2Stat(_spec2Stat);
	};
	const computedTotalStat = () => {
		// we need to merge the 3 object mainProfStat,spec1Stat,spec2Stat
		let merged = [];
		let merged2 = [];
		if (mainProfStat !== null && spec1Stat !== null) {
			merged = Object.entries(spec1Stat).reduce(
				(acc, [key, value]) =>
					// if key is already in map1, add the values, otherwise, create new pair
					({ ...acc, [key]: (acc[key] || 0) + value }),
				{ ...mainProfStat }
			);
		}

		if (spec2Stat !== null) {
			merged2 = Object.entries(spec2Stat).reduce(
				(acc, [key, value]) =>
					// if key is already in map1, add the values, otherwise, create new pair
					({ ...acc, [key]: (acc[key] || 0) + value }),
				{ ...merged }
			);
		}

		setTotalStat(merged2);
	};
	useEffect(() => {
		if (mainProfStat !== null || spec1Stat !== null || spec2Stat != null) computedTotalStat();

		// eslint-disable-next-line
	}, [mainProfStat, spec1Stat, spec2Stat]);

	const test = (currentTree) => {
		//"position": "3|1", line 3 , column 1
		let tabTalent = [];
		for (let x = 1; x <= 9; x++) {
			// line
			for (let y = 1; y <= 9; y++) {
				//column
				let e = currentTree.find((e) => e.position === `${x}|${y}`);
				if (tabTalent[x] === undefined) {
					tabTalent[x] = [];
				}
				if (tabTalent[x][y] === undefined) {
					tabTalent[x][y] = {};
				}
				tabTalent[x][y] = e;
			}
		}
		return tabTalent;
	};
	const filterNode = (e) => {
		setCurrentNodeFilter(e.target.value === '' ? null : e.target.value);
	};
	// eslint-disable-next-line
	const handleScroll = () => {
		if (topMenu.current !== null) window.scrollY > topMenu.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
	};

	// This function handles the scroll performance issue
	// eslint-disable-next-line
	const debounce = (func, wait = 20, immediate = true) => {
		let timeOut;
		return () => {
			let context = this,
				args = arguments;
			const later = () => {
				timeOut = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeOut;
			clearTimeout(timeOut);
			timeOut = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	useEffect(() => {
		window.addEventListener('scroll', debounce(handleScroll));
		return () => {
			window.removeEventListener('scroll', () => handleScroll);
		};
	}, [debounce, handleScroll]);

	useEffect(() => {
		if (
			searchParams.get('skills') !== null &&
			skills !== null &&
			dataI18n !== null &&
			profession !== null &&
			talent !== null &&
			itemGold !== null
		) {
			loadBuild();
		}
		// eslint-disable-next-line
	}, [searchParams.get('skills'), skills, dataI18n, profession, talent, itemGold]);

	useEffect(() => {
		saveBuild();
		// eslint-disable-next-line
	}, [
		skill1,
		skill2,
		skill3,
		skill4,
		skill5,
		skill6,
		skill7,
		skill8,
		currentMainProf,
		spec1,
		spec2,
		mainProfPoint,
		spec1Point,
		spec2Point,
		currentTrait,
		currentItems,
	]);

	const saveBuild = () => {
		// skills
		let string =
			'skills=' +
			skill1.skill.value +
			':' +
			skill1.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill2.skill.value !== undefined ? skill2.skill.value : 0) +
			':' +
			skill2.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill3.skill.value !== undefined ? skill3.skill.value : 0) +
			':' +
			skill3.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill4.skill.value !== undefined ? skill4.skill.value : 0) +
			':' +
			skill4.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill5.skill.value !== undefined ? skill5.skill.value : 0) +
			':' +
			skill5.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill6.skill.value !== undefined ? skill6.skill.value : 0) +
			':' +
			skill6.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill7.skill.value !== undefined ? skill7.skill.value : 0) +
			':' +
			skill7.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-') +
			',';
		string +=
			(skill8.skill.value !== undefined ? skill8.skill.value : 0) +
			':' +
			skill8.support
				.map((e) => {
					return e.value !== undefined ? e.value : 0;
				})
				.join('-');

		// specs
		string +=
			'&specs=' +
			(currentMainProf != null ? currentMainProf.id : 0) +
			',' +
			(spec1 !== null ? spec1.id : 0) +
			',' +
			(spec2 !== null ? spec2.id : 0);

		// tree point
		let tabMainTree = [];
		for (const [position, value] of Object.entries(mainProfPoint)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				tabMainTree.push(position + ':' + value);
			}
		}
		string += '&trees=core1:' + mainProfPoint.core1 + '-core2:' + mainProfPoint.core2 + '-' + tabMainTree.join('-') + ',';

		let tabSpec1Tree = [];
		for (const [position, value] of Object.entries(spec1Point)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				tabSpec1Tree.push(position + ':' + value);
			}
		}
		string += 'core1:' + spec1Point.core1 + '-core2:' + spec1Point.core2 + '-' + tabSpec1Tree.join('-') + ',';

		let tabSpec2Tree = [];
		for (const [position, value] of Object.entries(spec2Point)) {
			if (position !== 'nb' && position !== 'core1' && position !== 'core2') {
				tabSpec2Tree.push(position + ':' + value);
			}
		}
		string += 'core1:' + spec2Point.core1 + '-core2:' + spec2Point.core2 + '-' + tabSpec2Tree.join('-');

		//add spec data
		//{"specId":null,"specName": null,"15": null,"32":null,"50":null,"62":null,"80":null}

		string +=
			'&trait=' +
			currentTrait.specId +
			':' +
			currentTrait['15'] +
			',' +
			currentTrait['32'] +
			',' +
			currentTrait['50'] +
			',' +
			currentTrait['62'] +
			',' +
			currentTrait['80'];

		//add items data
		string +=
			'&items=' +
			currentItems
				.filter((i) => i !== undefined)
				.map((i) => {
					return i.id;
				})
				.join(',');

		const pathname = window.location.pathname;
		let _buildUrl = window.location.origin + pathname + '?' + string;
		setBuildUrl(_buildUrl);
	};

	const loadBuild = () => {
		// load Skills
		// skill / support = {"value":"","label": "","img": ""}
		//const [skill1,setSkill1] = useState({skill: {},support: [{},{},{},{},{}]})

		let mySkills = searchParams.get('skills');
		let tabSkills = mySkills.split(',');
		tabSkills.forEach((skill, index) => {
			let tempSkill = skill.split(':');
			let mainSkill = tempSkill[0];
			let supportSkill = tempSkill[1].split('-');
			let dataSkill = skills.find((e) => e.id === mainSkill);
			supportSkill = supportSkill.map((supp) => {
				let currentSupp = skills.find((e) => e.id === supp && e.type4 !== '0');
				if (currentSupp === undefined) {
					return {};
				} else {
					return { value: currentSupp.id, label: translate(currentSupp.name), img: currentSupp.icon };
				}
			});
			let currentSkill = null;
			if (dataSkill !== undefined) {
				currentSkill = {
					skill: { value: dataSkill.id, label: translate(dataSkill.name), img: dataSkill.icon },
					support: supportSkill,
				};
				setSkill(index + 1, currentSkill);
			} else {
				setSkill(index + 1, { skill: {}, support: [{}, {}, {}, {}, {}] });
			}
		});

		// load Specs
		let mySpecs = searchParams.get('specs').split(',');
		let myMainSpec = profession.find((p) => p.id === mySpecs[0]);
		let mySpec1 = profession.find((p) => p.id === mySpecs[1]);
		let mySpec2 = profession.find((p) => p.id === mySpecs[2]);
		if (myMainSpec !== undefined) {
			setCurrentMainProf(myMainSpec);
			let talentId = myMainSpec.talent_id.split('|');
			let startId = talentId[0];
			let endId = talentId[1];
			let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
			setCurrentTree(currentTalent);
			setCurrentTreeOrder(test([...currentTalent]));
		}
		if (mySpec1 !== undefined) {
			setSpec1(mySpec1);
			let talentId = mySpec1.talent_id.split('|');
			let startId = talentId[0];
			let endId = talentId[1];
			let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
			setCurrentTreeSpec1(currentTalent);
			setCurrentTreeOrderSpec1(test([...currentTalent]));
		}
		if (mySpec2 !== undefined) {
			setSpec2(mySpec2);
			let talentId = mySpec2.talent_id.split('|');
			let startId = talentId[0];
			let endId = talentId[1];
			let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
			setCurrentTreeSpec2(currentTalent);
			setCurrentTreeOrderSpec2(test([...currentTalent]));
		}

		let myTrees = searchParams.get('trees').split(',');
		let _mainProfPoint = { nb: 0, core1: null, core2: null };
		let _spec1Point = { nb: 0, core1: null, core2: null };
		let _spec2Point = { nb: 0, core1: null, core2: null };
		myTrees.forEach((tree, index) => {
			let data = tree.split('-');
			let cptPointMain = 0;
			let cptPointSpec1 = 0;
			let cptPointSpec2 = 0;
			data.forEach((node) => {
				if (node !== '') {
					let temp = node.split(':');
					let position = temp[0];
					let value = temp[1];
					if (value !== '0') {
						if (index === 0) {
							_mainProfPoint[position] = parseInt(value);
							if (position === 'core1') {
								_mainProfPoint['core1'] = value;
							}
							if (position === 'core2') {
								_mainProfPoint['core2'] = value;
							}
							if (position !== 'core1' && position !== 'core2') cptPointMain += parseInt(value);
						}
						if (index === 1) {
							_spec1Point[position] = parseInt(value);
							if (position === 'core1') {
								_spec1Point['core1'] = value;
							}
							if (position === 'core2') {
								_spec1Point['core2'] = value;
							}
							if (position !== 'core1' && position !== 'core2') cptPointSpec1 += parseInt(value);
						}
						if (index === 2) {
							_spec2Point[position] = parseInt(value);
							if (position === 'core1') {
								_spec2Point['core1'] = value;
							}
							if (position === 'core2') {
								_spec2Point['core2'] = value;
							}
							if (position !== 'core1' && position !== 'core2') cptPointSpec2 += parseInt(value);
						}
					}
				}
			});
			if (index === 0) _mainProfPoint.nb = cptPointMain;
			if (index === 1) _spec1Point.nb = cptPointSpec1;
			if (index === 2) _spec2Point.nb = cptPointSpec2;
		});
		setMainProfPoint(_mainProfPoint);
		setSpec1Point(_spec1Point);
		setSpec2Point(_spec2Point);

		// add trait data
		//&trait=600:null,600031,null,600051,600061
		if (searchParams.get('trait') !== null) {
			let trait = searchParams.get('trait').split(':');
			let traitId = trait[0];
			let traitData = trait[1].split(',');
			setCurrentTrait({
				specId: traitId,
				specName: null,
				15: traitData[0],
				32: traitData[1],
				50: traitData[2],
				62: traitData[3],
				80: traitData[4],
			});
		}

		// add item data
		//&items=112307,112201
		if (searchParams.get('items') !== null) {
			let items = searchParams.get('items').split(',');
			let tabItems = [];
			items.forEach((i) => {
				if (i !== null && i !== undefined) {
					if (itemGold !== null) {
						let tempItem = itemGold.find((g) => g.id === i);
						if (tempItem !== undefined) tabItems.push(tempItem);
					}
				}
			});
			setCurrentItems(tabItems);
		}
	};
	const toggleSideMneu = () => {
		if (!sideMenuVisible) {
			document.getElementById('sideMenu').style.width = '100%';
			document.getElementById('buttonSideMenu').style.width = '0';
		} else {
			document.getElementById('sideMenu').style.width = '0';
			document.getElementById('buttonSideMenu').style.width = '0.75rem';
		}

		setSideMenuVisible(!sideMenuVisible);
	};
	const getMinifier = () => {
		let fd = new FormData();
		fd.append('link', buildUrl);

		const requestOptions = {
			method: 'POST',
			body: fd,
		};
		let url = '';
		const currentURL = window.location.href;
		if (currentURL.includes('th3conc3pt3ur.github.io')) {
			url = 'https://tli.fr.nf/minifier';
		} else {
			url = 'http://127.0.0.1:8000/minifier';
		}
		fetch(url, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
				const data = isJson && (await response.json());
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
				//console.log(data.url);
				setBuildUrlMinified(data.url);
			})
			.catch((error) => {
				console.log(error);
			});
		//.then(data => {console.log(data.url);
	};
	if (!profession || !dataI18n || !itemGold || !talent) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className="flex md:flex-row flex-col gap-2 p-2">
			<div
				id="buttonSideMenu"
				onClick={() => toggleSideMneu()}
				style={{ transition: '0.5s' }}
				className={`md:hidden bg-black w-3 flex fixed top-1/2 z-10 left-0 flex-row`}
			>
				<MdArrowRight />
			</div>

			<ToastContainer theme={'dark'} autoClose={2000} />
			{/*<SideMenuBuild
				skillsImg={[skill1?.skill?.img, skill2?.skill?.img, skill3?.skill?.img, skill4?.skill?.img, skill5?.skill?.img]}
				fieldRefSkills={fieldRefSkills}
			/>*/}
			{/*Start Side Menu*/}
			<div className={`md:w-[20%] gap-2 flex flex-col relative `}>
				<div className={`gap-1 flex flex-col ${sticky ? 'sticky top-2' : ''}`}>
					{buildUrlMinified === null ? (
						<button
							onClick={() => getMinifier()}
							className="bg-[#282828] hover:bg-gray-900 border rounded-md h-10 flex flex-row gap-2 items-center px-2"
						>
							<FaShareAlt /> {t('commons:generate_build_url')}
						</button>
					) : null}
					{buildUrlMinified !== null ? (
						<CopyToClipboard
							text={buildUrlMinified}
							onCopy={() => {
								toast.success('Build url copied !');
								setBuildUrlMinified(null);
							}}
						>
							<button className="bg-[#282828] hover:bg-gray-900 border rounded-md h-10 flex flex-row gap-2 items-center px-2">
								<FaShareAlt /> {t('commons:copy_build_url')}
							</button>
						</CopyToClipboard>
					) : null}

					<div
						onClick={() => fieldRefSkills.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
					>
						<div className="flex flex-row gap-2 px-2">
							<div className="flex flex-row items-center gap-2">
								<div>{t('commons:skills')}</div>
								{skill1.skill !== null && skill1.skill.img !== undefined ? (
									<div>
										<img
											loading="lazy"
											className="h-6"
											src={`img/icons/CoreTalentIcon/${skill1.skill.img}.png`}
											alt="Icon"
										/>
									</div>
								) : null}
								{skill2.skill !== null && skill2.skill.img !== undefined ? (
									<div>
										<img
											loading="lazy"
											className="h-6"
											src={`img/icons/CoreTalentIcon/${skill2.skill.img}.png`}
											alt="Icon"
										/>
									</div>
								) : null}
								{skill3.skill !== null && skill3.skill.img !== undefined ? (
									<div>
										<img
											loading="lazy"
											className="h-6"
											src={`img/icons/CoreTalentIcon/${skill3.skill.img}.png`}
											alt="Icon"
										/>
									</div>
								) : null}
								{skill4.skill !== null && skill4.skill.img !== undefined ? (
									<div>
										<img
											loading="lazy"
											className="h-6"
											src={`img/icons/CoreTalentIcon/${skill4.skill.img}.png`}
											alt="Icon"
										/>
									</div>
								) : null}
								{skill5.skill !== null && skill5.skill.img !== undefined ? (
									<div>
										<img
											loading="lazy"
											className="h-6"
											src={`img/icons/CoreTalentIcon/${skill5.skill.img}.png`}
											alt="Icon"
										/>
									</div>
								) : null}
							</div>
						</div>
					</div>
					{currentMainProf !== null ? (
						<div
							onClick={() => fieldRefTrait.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
							style={{
								backgroundSize: '50%',
								backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`,
							}}
						>
							<div className="flex flex-row gap-2">
								<div>
									<img
										loading="lazy"
										className="h-6"
										src={`img/icons/TalentIcon/${currentMainProf.icon}.png`}
										alt="Icon"
									/>
								</div>
								<div>{currentTrait['specName']}</div>
							</div>
							<div className="mr-2">
								<button
									className="text-gray-300 hover:cursor-pointer hover:bg-gray-900"
									onClick={() => setCurrentTrait(null)}
								>
									x
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={() => fieldRefTrait.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
						>
							0. {t('commons:select_trait')}
						</div>
					)}

					{currentMainProf !== null ? (
						<div
							onClick={() => fieldRefMainProf.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
							style={{
								backgroundSize: '50%',
								backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`,
							}}
						>
							<div className="flex flex-row gap-2">
								<div>
									<img
										loading="lazy"
										className="h-6"
										src={`img/icons/TalentIcon/${currentMainProf.icon}.png`}
										alt="Icon"
									/>
								</div>
								<div>{translate(currentMainProf.name)}</div>
							</div>
							<div className="mr-2">
								<button
									className="text-gray-300 hover:cursor-pointer hover:bg-gray-900"
									onClick={() => _setCurrentMainProf(null)}
								>
									x
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={() => fieldRefSelectMainProf.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
						>
							1. {t('commons:select_initial_profession')}
						</div>
					)}

					{spec1 !== null ? (
						<div
							onClick={() => fieldRefSpec1.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
							style={{
								backgroundSize: '50%',
								backgroundImage: `url("img/icons/TalentGodsIcon/${spec1.background.split('|')[0]}.png`,
							}}
						>
							<div className="flex flex-row gap-2">
								<div>
									<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${spec1.icon}.png`} alt="Icon" />
								</div>
								<div>{translate(spec1.name)}</div>
							</div>
							<div className="mr-2">
								<button className="text-gray-300 hover:cursor-pointer hover:bg-gray-900" onClick={() => _setSpec1(null)}>
									x
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={() => fieldRefSelectSpec1.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
						>
							2. {t('commons:select_sub_profession_1')}
						</div>
					)}

					{spec2 !== null ? (
						<div
							onClick={() => fieldRefSpec2.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
							style={{
								backgroundSize: '50%',
								backgroundImage: `url("img/icons/TalentGodsIcon/${spec2.background.split('|')[0]}.png`,
							}}
						>
							<div className="flex flex-row gap-2">
								<div>
									<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${spec2.icon}.png`} alt="Icon" />
								</div>
								<div>{translate(spec2.name)}</div>
							</div>
							<div className="mr-2">
								<button className="text-gray-300 hover:bg-gray-900 hover:cursor-pointer" onClick={() => _setSpec2(null)}>
									x
								</button>
							</div>
						</div>
					) : (
						<div
							onClick={() => fieldRefSelectSpec2.current.scrollIntoView()}
							className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
						>
							3. {t('commons:select_sub_profession_2')}
						</div>
					)}
					{totalStat != null ? (
						<div className="flex flex-col bg-[#282828] hover:bg-gray-900 hover:cursor-pointer border rounded-md justify-between p-1">
							<div className="text-center border-b border-slate-700">{t('commons:total_stats')}</div>

							{Object.entries(totalStat).map(([affix, stat]) => (
								<HyperLinkTooltip
									className="text-left text-sm break-words"
									key={affix}
									str={translate('affix_class|description|' + affix)
										.replace('$P1$', stat)
										.replace('$+P1$', '+' + stat)}
								/>
							))}
						</div>
					) : null}
				</div>
			</div>
			{/*End Side Menu*/}
			<div className="w-full">
				{/*Start Skill Build*/}
				<SkillBuild fieldRefSkills={fieldRefSkills} />
				{/* TRAIT */}
				<TraitBuild fieldRefTrait={fieldRefTrait} currentTrait={currentTrait} setCurrentTrait={setCurrentTrait} />
				{/* Mandatory Unique */}
				<MandatoryItemsBuild
					fieldRefItems={fieldRefItems}
					currentItem={currentItem}
					setCurrentItem={setCurrentItem}
					currentItems={currentItems}
					setCurrentItems={setCurrentItems}
				/>
				{/*Initial Profession*/}
				<InitialProfessionBuild
					fieldRefSelectMainProf={fieldRefSelectMainProf}
					currentMainProf={currentMainProf}
					setCurrentMainProf={setCurrentMainProf}
				/>

				{/* SPEC 1 */}
				<Spec1Build
					fieldRefSelectSpec1={fieldRefSelectSpec1}
					currentMainProf={currentMainProf}
					setCurrentMainProf={setCurrentMainProf}
					setSpec1={setSpec1}
					spec1={spec1}
				/>

				{/* SPEC 2 */}
				<Spec2Build
					fieldRefSelectSpec2={fieldRefSelectSpec2}
					currentMainProf={currentMainProf}
					setCurrentMainProf={setCurrentMainProf}
					spec1={spec1}
					spec2={spec2}
					setSpec2={setSpec2}
				/>

				{/* Ability Tree Helper */}
				<AbilityTreeHelper />

				{/*Prof1 Tree*/}
				<Prof1TreeBuild
					fieldRefMainProf={fieldRefMainProf}
					currentTree={currentTree}
					currentMainProf={currentMainProf}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					mainProfPoint={mainProfPoint}
					setMainProfPoint={setMainProfPoint}
					mainProfStat={mainProfStat}
					currentTreeOrder={currentTreeOrder}
					removePoint={removePoint}
					addPoint={addPoint}
				/>

				{/*Prof2 Tree*/}
				<Spec1TreeBuild
					fieldRefSpec1={fieldRefSpec1}
					currentTreeSpec1={currentTreeSpec1}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					spec1Point={spec1Point}
					setSpec1Point={setSpec1Point}
					spec1Stat={spec1Stat}
					currentTreeOrderSpec1={currentTreeOrderSpec1}
					removePoint={removePoint}
					addPoint={addPoint}
					spec1={spec1}
				/>

				{/*Prof3 Tree*/}
				<Spec2TreeBuild
					fieldRefSpec2={fieldRefSpec2}
					currentTreeSpec2={currentTreeSpec2}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					spec2Point={spec2Point}
					setSpec2Point={setSpec2Point}
					spec2Stat={spec2Stat}
					currentTreeOrderSpec2={currentTreeOrderSpec2}
					removePoint={removePoint}
					addPoint={addPoint}
					spec2={spec2}
				/>
			</div>
		</div>
	);
}
export default Build;
