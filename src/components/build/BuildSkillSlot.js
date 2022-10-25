import { BuildContext } from './../../context/BuildContext';
import { useContext } from 'react';
import { AppContext } from './../../context/AppContext';
import { Tooltip } from 'flowbite-react';
import Skill from './../Skill';

function BuildSkillSlot(props) {
	const { skills } = useContext(AppContext);
	const {
		changePrimarySecondary,
		setCurrentModalType,
		openModal,
		skill1,
		skill2,
		skill3,
		skill4,
		skill5,
		skill6,
		skill7,
		skill8,
		onChangeSkillForced,
	} = useContext(BuildContext);
	const primary = props.primary;
	const secondary = props.secondary;
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
	if (currentSkill == null) {
		return null;
	}
	let currentSupport = currentSkill.support[secondary];
	const onClickSkill = () => {
		if (primary > 5) {
			setCurrentModalType('');
		} else {
			//6000200 => active
			//6000201 => passive
			//6000100 => support
			setCurrentModalType('6000100');
		}

		changePrimarySecondary(primary, secondary);
		openModal();
	};
	const removeSkill = () => {
		onChangeSkillForced(null, primary, secondary);
	};
	return (
		<div className="flex flex-col justify-center items-center">
			{currentSupport !== undefined && currentSupport !== null && Object.keys(currentSupport).length > 0 ? (
				<div className="relative">
					<div className="z-10 text-lg absolute -right-8 -top-4">
						<button title="remove skill" onClick={(e) => removeSkill()}>
							x
						</button>
					</div>
				</div>
			) : null}
			<div
				onClick={() => onClickSkill()}
				style={{ fontSize: '35px' }}
				className="w-[50px] h-[50px] hover:cursor-pointer border rounded-full items-center justify-center flex flex-col"
			>
				{currentSupport !== undefined && currentSupport !== null && Object.keys(currentSupport).length > 0 ? (
					<Tooltip
						content={<Skill showDetail={false} skill={skills.find((s) => s.id === currentSupport.value && s.type4 !== '0')} />}
						trigger="hover"
					>
						<div>
							<img
								loading="lazy"
								src={`img/icons/CoreTalentIcon/${currentSupport.img}.png`}
								className="w-[50px]"
								alt="Icon"
							/>
						</div>
					</Tooltip>
				) : (
					<div className="-mt-[5px]">+</div>
				)}
			</div>
			{currentSupport !== undefined && Object.keys(currentSupport).length > 0 ? (
				<div className="mt-[20%] max-w-[120px] absolute flex-wrap text-sm text-center">{currentSupport.label}</div>
			) : null}
		</div>
	);
}
export default BuildSkillSlot;
