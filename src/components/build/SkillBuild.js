import { useTranslation } from 'react-i18next';
import BuildSkill2 from '../BuildSkill2';
import React, { useContext } from 'react';
import { Modal } from 'flowbite-react';
import Select, { createFilter } from 'react-select';
import { BuildContext } from '../../context/BuildContext';
import { AppContext } from '../../context/AppContext';

const SkillBuild = ({ fieldRefSkills }) => {
	const { t } = useTranslation();
	const { closeModal, modalVisible, currentModalType, onChangeSkill, modalValue } = useContext(BuildContext);
	const { translate, sortAlpha, skills } = useContext(AppContext);

	if (!skills) return;

	return (
		<>
			<Modal className="dark" show={modalVisible} size="md" popup={true} onClose={closeModal}>
				<Modal.Header>{t('commons:select_skills')}</Modal.Header>
				<Modal.Body>
					<div className="">
						<Select
							id="selectModal"
							className="w-full"
							classNamePrefix="select"
							menuIsOpen={true}
							isClearable={true}
							isSearchable={true}
							captureMenuScroll={false}
							filterOption={createFilter({ ignoreAccents: false })}
							onChange={(e) => onChangeSkill(e)}
							options={skills
								.filter(
									(x) => (currentModalType === '' || x.tag.includes(currentModalType)) && x.name !== translate(x.name)
								)
								.sort(sortAlpha)
								.map((s) => {
									return { value: s.id, label: translate(s.name), img: s.icon };
								})}
							formatOptionLabel={(skill) => (
								<div className="skill-option flex flex-row gap-2">
									<div>
										<img
											loading="lazy"
											src={`img/icons/CoreTalentIcon/${skill.img}.png`}
											className="w-[24px] aspect-square"
											alt="Icon"
										/>
									</div>
									<div>
										<span>{skill.label}</span>
									</div>
								</div>
							)}
							value={modalValue}
						/>
					</div>
				</Modal.Body>
			</Modal>
			<div className="flex flex-col">
				<div ref={fieldRefSkills} className={`mb-2 `}>
					<div className={`text-center text-xl font-bold rounded-t-md bg-gradient-to-b from-yellow-400 to-yellow-600 text-black`}>
						{t('commons:actives_skills')}
					</div>
					<div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2 rounded-b-md ">
						{/*5 actif skills*/}
						{[1, 2, 3, 4, 5].map((ind) => (
							<BuildSkill2 key={'actif' + ind} ind={ind} tag="Active" />
						))}
					</div>
					<div
						className={`mt-2 text-center text-xl font-bold rounded-t-md bg-gradient-to-b from-yellow-400 to-yellow-600 text-black`}
					>
						{t('commons:passives_skills')}
					</div>
					<div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2">
						{/*3 passives skills*/}
						{[6, 7, 8].map((ind) => (
							<BuildSkill2 key={'passives' + ind} ind={ind} tag="Passive" />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default SkillBuild;
