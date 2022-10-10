import React from 'react';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import BuildSkillSlot from './BuildSkillSlot';
import { BuildContext } from '../context/BuildContext';
import { Tooltip } from 'flowbite-react';
import Skill from '../components/Skill';

function BuildSkill2(props) {
	const { translate, skills } = useContext(AppContext);
	const { changePrimarySecondary, setCurrentModalType, openModal, getSkillByPrimary, onChangeSkillForced } =
		useContext(BuildContext);
	let ind = props.ind;
	// let onChangeCurrentModalType = props.onChangeCurrentModalType;
	// let onChangeSupport=props.onChangeSupport;
	// const changePrimarySecondary = props.changePrimarySecondary
	// let onChangeSkill=props.onChangeSkill;
	// const openModal = props.openModal
	let tag = props.tag;
	if (tag === undefined) {
		tag = 'Active';
	}
	let tabEnergy = [];
	if (tag === 'Active') {
		tabEnergy = [0, 10, 25, 75, 175];
	}
	if (tag === 'Passive') {
		tabEnergy = [10, 20, 35, 85, 185];
	}

	if (skills == null) {
		return null;
	}

	const onClickSkill = (primary, secondary) => {
		if (tag === 'Active') {
			setCurrentModalType('Active');
		} else {
			setCurrentModalType('Passive');
		}

		changePrimarySecondary(primary, secondary);
		openModal();
	};
	let currentSkill = getSkillByPrimary(ind);
	const removeSkill = () => {
		onChangeSkillForced(null, ind, 0);
	};
	return (
		<>
			<div className="flex flex-col h-full">
				<div className="grid grid-cols-5 grid-rows-4 relative shadow-md shadow-slate-900 pt-2 pb-5 px-3 gap-x-4 h-full bg-[#282828]">
					{/* 1st line */}
					<div></div>
					<div></div>
					<BuildSkillSlot secondary={1} primary={ind} />
					<div></div>
					<div></div>

					{/* 2nd line */}
					<BuildSkillSlot secondary={2} primary={ind} />
					<div></div>
					{/* main skill */}
					<div className="flex flex-col items-center row-span-2 self-center">
						{Object.keys(currentSkill.skill).length > 0 ? (
							<div className="relative">
								<div className="z-10 text-lg absolute -right-10 top-4">
									<button
										title="remove skill"
										onClick={(e) => {
											removeSkill();
											e.preventDefault();
										}}
									>
										x
									</button>
								</div>
							</div>
						) : null}
						<div
							onClick={() => onClickSkill(ind, 0)}
							style={{ fontSize: '50px' }}
							className="w-[70px] h-[70px] mt-7 hover:cursor-pointer border rounded-full items-center justify-center flex flex-col"
						>
							{Object.keys(currentSkill.skill).length > 0 ? (
								<Tooltip
									content={
										<Skill
											showDetail={false}
											skill={skills.find((s) => s.id === currentSkill.skill.value)}
										/>
									}
									trigger="hover"
								>
									<div>
										<img
											loading="lazy"
											src={`img/icons/skills/${currentSkill.skill.img}.png`}
											className="w-[70px]"
											alt="Icon"
										/>
									</div>
								</Tooltip>
							) : (
								<div className="-mt-[14px]">+</div>
							)}
						</div>

						{Object.keys(currentSkill.skill).length > 0 ? (
							<div className="text-sm text-center">
								<span>{translate(currentSkill.skill.label)}</span>
							</div>
						) : null}
					</div>
					<div></div>
					<BuildSkillSlot secondary={3} primary={ind} />

					<div></div>
					<div></div>
					<div></div>
					<div></div>

					<div></div>
					<BuildSkillSlot secondary={4} primary={ind} />
					<div></div>
					<BuildSkillSlot secondary={5} primary={ind} />
					<div></div>
					<div className="text-center col-span-5 pt-10">
						Energy required :{' '}
						{tabEnergy[currentSkill.support.filter((e) => Object.keys(e).length > 0).length - 1] | 0}
					</div>
				</div>
			</div>
		</>
	);
}
export default React.memo(BuildSkill2);
