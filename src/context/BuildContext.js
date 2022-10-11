import { createContext, useState, useEffect } from 'react';
const BuildContext = createContext();
const BuildContextProvider = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [modalValue, setModalValue] = useState(null);
	const [currentModalType, setCurrentModalType] = useState(null);
	const [currentPrimary, setCurrentPrimary] = useState(null);
	const [currentSecondary, setCurrentSecondary] = useState(null);

	// the 5 actives
	const [skill1, setSkill1] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill2, setSkill2] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill3, setSkill3] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill4, setSkill4] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill5, setSkill5] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });

	// the 3 passives
	const [skill6, setSkill6] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill7, setSkill7] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });
	const [skill8, setSkill8] = useState({ skill: {}, support: [{}, {}, {}, {}, {}] });

	//const fieldRefInput = useRef(null);

	const changePrimarySecondary = (primary, secondary) => {
		setCurrentPrimary(primary);
		setCurrentSecondary(secondary);
	};
	const openModal = () => {
		//console.log("openModal");
		setModalValue(null);
		setModalVisible(true);
	};
	useEffect(() => {
		if (modalVisible === true) {
			if (document.getElementById('selectModal') !== null) {
				document.querySelector('#selectModal .select__input').focus();
			}
		}
	}, [modalVisible]);

	const closeModal = () => {
		//console.log("close modal");
		setModalVisible(false);
	};
	const getSkillByPrimary = (primary) => {
		let currentSkill = null;
		switch (primary) {
			case 1:
				currentSkill = skill1;
				break;
			case 2:
				currentSkill = skill2;
				break;
			case 3:
				currentSkill = skill3;
				break;
			case 4:
				currentSkill = skill4;
				break;
			case 5:
				currentSkill = skill5;
				break;
			case 6:
				currentSkill = skill6;
				break;
			case 7:
				currentSkill = skill7;
				break;
			case 8:
				currentSkill = skill8;
				break;
			default:
				break;
		}
		return currentSkill;
	};
	const setSkill = (index, value) => {
		let currentFnc = null;
		switch (index) {
			case 0:
				currentFnc = () => {};
				break;
			case 1:
				currentFnc = setSkill1;
				break;
			case 2:
				currentFnc = setSkill2;
				break;
			case 3:
				currentFnc = setSkill3;
				break;
			case 4:
				currentFnc = setSkill4;
				break;
			case 5:
				currentFnc = setSkill5;
				break;
			case 6:
				currentFnc = setSkill6;
				break;
			case 7:
				currentFnc = setSkill7;
				break;
			case 8:
				currentFnc = setSkill8;
				break;
			default:
				break;
		}
		currentFnc(value);
	};
	const onChangeSkill = (e) => {
		//primary skill
		let currentSkill = null;
		let currentFnc = null;
		switch (currentPrimary) {
			case 1:
				currentSkill = { ...skill1 };
				currentFnc = setSkill1;
				break;
			case 2:
				currentSkill = { ...skill2 };
				currentFnc = setSkill2;
				break;
			case 3:
				currentSkill = { ...skill3 };
				currentFnc = setSkill3;
				break;
			case 4:
				currentSkill = { ...skill4 };
				currentFnc = setSkill4;
				break;
			case 5:
				currentSkill = { ...skill5 };
				currentFnc = setSkill5;
				break;
			case 6:
				currentSkill = { ...skill6 };
				currentFnc = setSkill6;
				break;
			case 7:
				currentSkill = { ...skill7 };
				currentFnc = setSkill7;
				break;
			case 8:
				currentSkill = { ...skill8 };
				currentFnc = setSkill8;
				break;
			default:
				break;
		}
		if (currentSecondary === 0) {
			if (e === null) {
				currentSkill.skill = { skill: {}, support: [{}, {}, {}, {}, {}] };
			} else {
				currentSkill.skill = e;
			}
		} else {
			if (e === null) {
				currentSkill.support[currentSecondary] = {};
			} else {
				currentSkill.support[currentSecondary] = e;
			}
		}

		currentFnc(currentSkill);
		closeModal();
	};
	const onChangeSkillForced = (e, primary, secondary) => {
		//primary skill
		let currentSkill = null;
		let currentFnc = null;
		switch (primary) {
			case 1:
				currentSkill = { ...skill1 };
				currentFnc = setSkill1;
				break;
			case 2:
				currentSkill = { ...skill2 };
				currentFnc = setSkill2;
				break;
			case 3:
				currentSkill = { ...skill3 };
				currentFnc = setSkill3;
				break;
			case 4:
				currentSkill = { ...skill4 };
				currentFnc = setSkill4;
				break;
			case 5:
				currentSkill = { ...skill5 };
				currentFnc = setSkill5;
				break;
			case 6:
				currentSkill = { ...skill6 };
				currentFnc = setSkill6;
				break;
			case 7:
				currentSkill = { ...skill7 };
				currentFnc = setSkill7;
				break;
			case 8:
				currentSkill = { ...skill8 };
				currentFnc = setSkill8;
				break;
			default:
				break;
		}
		if (secondary === 0) {
			if (e === null) {
				currentSkill.skill = {};
			} else {
				currentSkill.skill = e;
			}
		} else {
			if (e === null) {
				currentSkill.support[secondary] = {};
			} else {
				currentSkill.support[secondary] = e;
			}
		}
		currentFnc(currentSkill);
	};

	return (
		<BuildContext.Provider
			value={{
				onChangeSkill,
				skill1,
				skill2,
				skill3,
				skill4,
				skill5,
				skill6,
				skill7,
				skill8,
				setSkill1,
				setSkill2,
				setSkill3,
				setSkill4,
				setSkill5,
				setSkill6,
				setSkill7,
				setSkill8,
				setSkill,
				onChangeSkillForced,
				modalVisible,
				openModal,
				modalValue,
				closeModal,
				setModalVisible,
				changePrimarySecondary,
				getSkillByPrimary,
				setCurrentModalType,
				currentModalType,
				currentPrimary,
				currentSecondary,
			}}
		>
			{props.children}
		</BuildContext.Provider>
	);
};
export { BuildContextProvider, BuildContext };
