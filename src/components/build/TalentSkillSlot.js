import { Tooltip } from 'flowbite-react';
import Skill from '../Skill';
import { AppContext } from './../../context/AppContext';
import { BuildContext } from './../../context/BuildContext';
import { useContext } from 'react';

function TalentSkillSlot(props) {
	const { skills } = useContext(AppContext);
	let currentSupport = props.currentSupport;
	let primary = props.primary;
	let setSupport = props.setSupport;
	const { changePrimarySecondary, setCurrentModalType, openModal } = useContext(BuildContext);

	const onClickSkill = () => {
		//6000200 => active
		//6000201 => passive
		//6000100 => support
		setCurrentModalType('6000100');
		changePrimarySecondary(primary, -1);
		openModal();
	};
	const removeTalentSkill = () => {
		setSupport(null);
	};

	return (
		<div className="flex flex-col justify-center items-center h-full">
			{currentSupport !== null && (
				<div className="relative">
					<div className="z-10 text-lg absolute -right-8 -top-4">
						<button title="remove skill" onClick={(e) => removeTalentSkill()}>
							x
						</button>
					</div>
				</div>
			)}
			<div
				onClick={() => onClickSkill()}
				style={{ fontSize: '35px' }}
				className="w-[50px] h-[50px] hover:cursor-pointer border rounded-full items-center justify-center flex flex-col"
			>
				{currentSupport !== null ? (
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
			{currentSupport !== null && <div className="max-w-[120px] flex-wrap text-sm text-center">{currentSupport.label}</div>}
		</div>
	);
}
export default TalentSkillSlot;
