import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BuildContext } from '../context/BuildContext';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from '../components/Loader';
import SkillBuild from '../components/build/SkillBuild';
import TraitBuild from '../components/build/TraitBuild';
import MandatoryItemsBuild from '../components/build/MandatoryItemsBuild';
import InitialProfessionBuild from '../components/build/InitialProfessionBuild';
import Spec1Build from '../components/build/Spec1Build';
import Spec2Build from '../components/build/Spec2Build';
import AbilityTreeHelper from '../components/build/AbilityTreeHelper';
import SideMenuBuild from '../components/build/SideMenuBuild';
import TreeBuild from '../components/build/TreeBuild';
import { useTranslation } from 'react-i18next';

function Build() {
	const { t } = useTranslation();
	const { translate, topMenu, profession, skills, talent, dataI18n, itemGold } = useContext(AppContext);
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		skill1,
		setSkill,
		skill2,
		skill3,
		skill4,
		skill5,
		skill6,
		skill7,
		skill8,
		talentSkill1,
		talentSkill2,
		talentSkill3,
		setTalentSkill1,
		setTalentSkill2,
		setTalentSkill3,
	} = useContext(BuildContext);
	const [currentMainProf, setCurrentMainProf] = useState(null);
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
		if (!data) {
			setMainProfPoint({ nb: 0, core1: null, core2: null });
			setMainProfStat(null);
			setCurrentTree(null);
			setCurrentTrait({ specId: null, specName: null, 15: null, 32: null, 50: null, 62: null, 80: null });
		}
		setCurrentMainProf(data);
	};
	const _setSpec1 = (data) => {
		if (!data) {
			setSpec1Point({ nb: 0, core1: null, core2: null });
			setSpec1Stat(null);
			setCurrentTreeSpec1(null);
		}
		setSpec1(data);
	};
	const _setSpec2 = (data) => {
		if (!data) {
			setSpec2Point({ nb: 0, core1: null, core2: null });
			setSpec2Stat(null);
			setCurrentTreeSpec2(null);
		}
		setSpec2(data);
	};
	useEffect(() => {
		if (currentMainProf) {
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
		if (spec1) displayTalentSpec1();
		// eslint-disable-next-line
	}, [spec1]);

	useEffect(() => {
		if (spec2) displayTalentSpec2();
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
		let nextIdObject = null;
		// todo we can factorise that
		switch (current) {
			case 'main':
				let _mainProfPoint = { ...mainProfPoint };
				nextIdObject = returnTabObjectOfBeforeId(object.id, currentTreeOrder);
				for (let i = 0; i <= nextIdObject.length; i++) {
					let el = nextIdObject[i];
					if (_mainProfPoint[el?.position] !== undefined && _mainProfPoint[el?.position] > 0) {
						toast.error(t('commons:remove_point_error'));
						return;
					}
				}
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
				nextIdObject = returnTabObjectOfBeforeId(object.id, currentTreeOrderSpec1);
				for (let i = 0; i <= nextIdObject.length; i++) {
					let el = nextIdObject[i];
					if (_spec1Point[el?.position] !== undefined && _spec1Point[el?.position] > 0) {
						toast.error(t('commons:remove_point_error'));
						return;
					}
				}
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
				nextIdObject = returnTabObjectOfBeforeId(object.id, currentTreeOrderSpec2);
				for (let i = 0; i <= nextIdObject.length; i++) {
					let el = nextIdObject[i];
					if (_spec2Point[el?.position] !== undefined && _spec2Point[el?.position] > 0) {
						toast.error(t('commons:remove_point_error'));
						return;
					}
				}
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
	/**
	 * It returns the node object of the _id in the table
	 * @param _id - The id of the node you want to find.
	 * @param _tab - The table that contains the id
	 * @returns the node object in the tab.
	 */
	const returnPositionOfId = (_id, _tab) => {
		for (let x = 1; x <= 9; x++) {
			for (let y = 1; y <= 9; y++) {
				if (_tab[x][y]?.id === _id) {
					return _tab[x][y];
				}
			}
		}
		return null;
	};

	/**
	 * It returns an array of node objects that have a before_id = _beforeId
	 * @param _beforeId - the id of the parent node
	 * @param _tab - the current tab
	 * @returns An array of objects.
	 */
	const returnTabObjectOfBeforeId = (_beforeId, _tab) => {
		let tabReturn = [];
		for (let x = 1; x <= 9; x++) {
			for (let y = 1; y <= 9; y++) {
				//console.log(currentTreeOrder[x][y]?.id);
				if (_tab[x][y]?.before_id === _beforeId) {
					tabReturn.push(_tab[x][y]);
				}
			}
		}
		return tabReturn;
	};
	const addPoint = (object, current) => {
		let max = object.level_up_time;
		let pointNeed = parseInt(object.need_points);
		let position = object.position;
		let beforeIdObject = null;
		// todo we can factorise that
		switch (current) {
			case 'main':
				let _mainProfPoint = { ...mainProfPoint };
				beforeIdObject = returnPositionOfId(object.before_id, currentTreeOrder);
				if (_mainProfPoint[position] === undefined) {
					_mainProfPoint[position] = 0;
				}

				if (_mainProfPoint[position] === parseInt(max)) {
					toast.error(t('commons:error_already_at_max'));
				} else {
					// we toast.error if the before_id is not fullify
					if (
						object.before_id !== '' &&
						(_mainProfPoint[beforeIdObject?.position] === undefined ||
							_mainProfPoint[beforeIdObject?.position] < parseInt(beforeIdObject?.level_up_time))
					) {
						toast.error(t('commons:error_you_must_max_previous_talent'));
					} else {
						if (pointNeed <= _mainProfPoint.nb) {
							_mainProfPoint[position] += 1;
							_mainProfPoint.nb++;
							setMainProfPoint(_mainProfPoint);
						} else {
							toast.error(t('commons:error_not_enought_points'));
						}
					}
				}
				break;
			case 'spec1':
				let _spec1Point = { ...spec1Point };
				beforeIdObject = returnPositionOfId(object.before_id, currentTreeOrderSpec1);
				if (_spec1Point[position] === undefined) {
					_spec1Point[position] = 0;
				}
				if (_spec1Point[position] === parseInt(max)) {
					toast.error(t('commons:error_already_at_max'));
				} else {
					if (
						object.before_id !== '' &&
						(_spec1Point[beforeIdObject?.position] === undefined ||
							_spec1Point[beforeIdObject?.position] < parseInt(beforeIdObject?.level_up_time))
					) {
						toast.error(t('commons:error_you_must_max_previous_talent'));
					} else {
						if (pointNeed <= _spec1Point.nb) {
							_spec1Point.nb++;
							_spec1Point[position] += 1;
							setSpec1Point(_spec1Point);
						} else {
							toast.error(t('commons:error_not_enought_points'));
						}
					}
				}
				break;
			case 'spec2':
				let _spec2Point = { ...spec2Point };
				beforeIdObject = returnPositionOfId(object.before_id, currentTreeOrderSpec2);
				if (_spec2Point[position] === undefined) {
					_spec2Point[position] = 0;
				}
				if (_spec2Point[position] === parseInt(max)) {
					toast.error(t('commons:error_already_at_max'));
				} else {
					if (
						object.before_id !== '' &&
						(_spec2Point[beforeIdObject?.position] === undefined ||
							_spec2Point[beforeIdObject?.position] < parseInt(beforeIdObject?.level_up_time))
					) {
						toast.error(t('commons:error_you_must_max_previous_talent'));
					} else {
						if (pointNeed <= _spec2Point.nb) {
							_spec2Point.nb++;
							_spec2Point[position] += 1;
							setSpec2Point(_spec2Point);
						} else {
							toast.error(t('commons:error_not_enought_points'));
						}
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
		if (mainProfStat || spec1Stat || spec2Stat) computedTotalStat();

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
		if (topMenu.current) setSticky(window.scrollY > topMenu.current.getBoundingClientRect().bottom);
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
		if (searchParams.get('skills') && skills && dataI18n && profession && talent && itemGold) {
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
		talentSkill1,
		talentSkill2,
		talentSkill3,
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

		// add talent skill support => rehan skill attach to burst
		string += '&trait_skill=' + talentSkill1?.value + ',' + talentSkill2?.value + ',' + talentSkill3?.value;

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
		// add talent skill support => rehan skill attach to burst
		if (searchParams.get('trait_skill') !== null) {
			let trait_skill = searchParams.get('trait_skill').split(',');
			console.log(trait_skill);
			// check in case no data are provided
			if (trait_skill[0] !== 'undefined') {
				let mySkill = skills.find((x) => x.id === trait_skill[0]);
				let currentTraitSkill = { img: mySkill.icon, label: translate(mySkill.name), value: mySkill.id };
				setTalentSkill1(currentTraitSkill);
			}
			// check in case no data are provided
			if (trait_skill[1] !== 'undefined') {
				let mySkill2 = skills.find((x) => x.id === trait_skill[1]);
				let currentTraitSkill2 = { img: mySkill2.icon, label: translate(mySkill2.name), value: mySkill2.id };
				setTalentSkill2(currentTraitSkill2);
			}
			// check in case no data are provided
			if (trait_skill[2] !== 'undefined') {
				let mySkill3 = skills.find((x) => x.id === trait_skill[2]);
				let currentTraitSkill3 = { img: mySkill3.icon, label: translate(mySkill3.name), value: mySkill3.id };
				setTalentSkill3(currentTraitSkill3);
			}
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

	if (profession === null || dataI18n === null || itemGold === null || talent === null || itemGold === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className="flex md:flex-row flex-col gap-2 p-2">
			<ToastContainer theme={'dark'} autoClose={2000} />
			{/*Side Menu*/}
			<SideMenuBuild
				skillsImg={[skill1?.skill?.img, skill2?.skill?.img, skill3?.skill?.img, skill4?.skill?.img, skill5?.skill?.img]}
				fieldRefSkills={fieldRefSkills}
				buildUrl={buildUrl}
				currentMainProf={currentMainProf}
				fieldRefTrait={fieldRefTrait}
				currentTrait={currentTrait}
				setCurrentTrait={setCurrentTrait}
				fieldRefMainProf={fieldRefMainProf}
				fieldRefSelectMainProf={fieldRefSelectMainProf}
				fieldRefSpec1={fieldRefSpec1}
				spec1={spec1}
				fieldRefSelectSpec1={fieldRefSelectSpec1}
				spec2={spec2}
				fieldRefSpec2={fieldRefSpec2}
				fieldRefSelectSpec2={fieldRefSelectSpec2}
				totalStat={totalStat}
				_setSpec1={_setSpec1}
				_setSpec2={_setSpec2}
				_setCurrentMainProf={_setCurrentMainProf}
				sticky={sticky}
			/>
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
				<TreeBuild
					fieldRef={fieldRefMainProf}
					currentTree={currentTree}
					spec={currentMainProf}
					specPoint={mainProfPoint}
					setPoint={setMainProfPoint}
					specStat={mainProfStat}
					currentTreeOrder={currentTreeOrder}
					removePoint={removePoint}
					addPoint={addPoint}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					index={0}
					type={'main'}
				/>
				{/*Prof2 Tree*/}
				<TreeBuild
					fieldRef={fieldRefSpec1}
					currentTree={currentTreeSpec1}
					spec={currentMainProf}
					specPoint={spec1Point}
					setPoint={setSpec1Point}
					specStat={spec1Stat}
					currentTreeOrder={currentTreeOrderSpec1}
					removePoint={removePoint}
					addPoint={addPoint}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					index={1}
					type={'spec1'}
				/>
				{/*Prof3 Tree*/}
				<TreeBuild
					fieldRef={fieldRefSpec2}
					currentTree={currentTreeSpec2}
					spec={currentMainProf}
					specPoint={spec2Point}
					setPoint={setSpec2Point}
					specStat={spec2Stat}
					currentTreeOrder={currentTreeOrderSpec2}
					removePoint={removePoint}
					addPoint={addPoint}
					filterNode={filterNode}
					currentNodeFilter={currentNodeFilter}
					index={2}
					type={'spec2'}
				/>
			</div>
		</div>
	);
}

export default Build;
