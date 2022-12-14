import { Tooltip } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import TalentSkillSlot from './TalentSkillSlot';
import { BuildContext } from '../../context/BuildContext';

function HeroTrait(props) {
	const perk = props.perk;
	const heroTraits = props.hero;
	const onTraitValueChange = props.onTraitValueChange;
	const onSpecChange = props.onSpecChange;
	const currentTrait = props.currentTrait;

	const { translate } = useContext(AppContext);
	const { talentSkill1, setTalentSkill1, talentSkill2, setTalentSkill2, talentSkill3, setTalentSkill3 } = useContext(BuildContext);
	const [selectedTrait, setSelectedTrait] = useState(currentTrait.specId);
	const { t } = useTranslation();

	const _setSelectedTrait = (id, name) => {
		setSelectedTrait(id);
		onSpecChange(id, translate(name));
	};
	useEffect(() => {
		if (heroTraits.length === 1 && currentTrait.specId === null) {
			let spec = perk.find((p) => p.hero_id === heroTraits[0].id && p.level === '1');
			onSpecChange(heroTraits[0].id, translate(spec.name));
		}
		if (currentTrait !== null && currentTrait.specId !== null) {
			setSelectedTrait(currentTrait.specId);
		}

		// eslint-disable-next-line
	}, [currentTrait]);
	return (
		<>
			{/* // multiple specialization, we need to select one */}
			{heroTraits.length > 1 ? (
				<div className="bg-[#282828] flex flex-col justify-center items-center w-full border p-2 rounded-lg shadow-lg gap-2 ">
					<div className="grid md:grid-cols-3 flex-row gap-2 w-full">
						{heroTraits.map((h, i) => (
							<div key={h.id + '-' + i} className="flex flex-row w-full">
								{[1].map((index) => (
									<div key={index} className="flex flex-col items-center w-full">
										<div className="flex flex-row items-center gap-2 w-full">
											<div>
												<img src={`img/hero/${h.portrait2}.png`} className="h-20 w-18 min-w-18" alt="Hero" />
											</div>
											<div className="title text-sm">{translate(h.name).split('|')[1]}</div>
										</div>
										{perk
											.filter((p) => p.hero_id === h.id && p.level === index.toString())
											.map((p) => (
												<div
													key={p.character_id}
													className="w-full flex shadow-md shadow-black p-1 border-t border-black items-center justify-center flex-col"
												>
													<div className="mx-auto">
														<img src={`img/icons/Perks/${p.Icon}.png`} className="md:h-20 h-14" alt="Perk" />
													</div>
													<div>
														<div className="text-center font-bold md:text-xl title">{translate(p.name)}</div>
														<div className="text-base text-center font-normal text-white">
															{t('commons:level')} {p.level}
														</div>
														<div className="text-center ">
															<input
																type="radio"
																checked={currentTrait.specId === h.id}
																onChange={(e) => _setSelectedTrait(e.target.value, p.name)}
																value={h.id}
																name={`trait`}
															/>
														</div>
													</div>
												</div>
											))}
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			) : null}
			{heroTraits
				.filter((h) => h.id === selectedTrait || heroTraits.length === 1)
				.map((h) => (
					<div
						key={h.id}
						className="bg-[#282828] flex flex-col gap-1 md:flex-row justify-between w-full border p-1 rounded-lg shadow-lg  flex-wrap"
					>
						{[15, 32, 50, 62, 80].map((index) => (
							<div key={'box' + index} className="flex flex-col gap-2">
								{perk
									.filter((p) => p.hero_id === h.id && p.level === index.toString())
									.map((p) => (
										<div
											key={p.character_id}
											className="flex shadow-md shadow-black p-1 border-t border-black items-center justify-center"
										>
											<div className="flex flex-col gap-2 p-2 items-center justify-center">
												<Tooltip
													className=""
													content={
														<div
															dangerouslySetInnerHTML={{
																__html: translate(p.desc_max).replaceAll('\\n', '<br>'),
															}}
														></div>
													}
												>
													<div className="flex flex-col gap-2 items-center justify-center">
														<div>
															<img src={`img/icons/Perks/${p.Icon}.png`} className="h-20" alt="Perk" />
														</div>
														<div>
															<div className="text-center font-bold title">{translate(p.name)}</div>
															<div className="text-base text-center font-normal text-white">
																{t('commons:level')} {p.level}
															</div>
															{index === 32 || index === 62 || index === 80 ? (
																<div className="text-center ">
																	<input
																		type="radio"
																		checked={currentTrait[index.toString()] === p.character_id}
																		onChange={onTraitValueChange}
																		value={p.character_id}
																		name={`talentLevel_${index}`}
																	/>
																</div>
															) : null}
														</div>
													</div>
												</Tooltip>
											</div>
										</div>
									))}
								{/* special case for rehan burst skill */}
								{currentTrait?.specId === '310' && index === 50 && (
									<div>
										<div className="title text-center">{t('commons:Burst_support_skill')}</div>
										<div className="flex flex-row shadow-md shadow-black border-t border-black items-center justify-center p-2">
											<TalentSkillSlot currentSupport={talentSkill1} primary={101} setSupport={setTalentSkill1} />
											<TalentSkillSlot currentSupport={talentSkill2} primary={102} setSupport={setTalentSkill2} />
										</div>
									</div>
								)}
								{/* special for carino potential 3 skills */}
								{currentTrait?.specId === '600' && index === 15 && (
									<div>
										<div className="title text-center">{t('commons:Support_skill')}</div>
										<div className="flex flex-row shadow-md shadow-black border-t border-black items-center justify-center p-2">
											<TalentSkillSlot currentSupport={talentSkill1} primary={101} setSupport={setTalentSkill1} />
										</div>
									</div>
								)}
								{currentTrait?.specId === '600' && index === 50 && (
									<div>
										<div className="title text-center">{t('commons:Support_skill')}</div>
										<div className="flex flex-row shadow-md shadow-black border-t border-black items-center justify-center p-2">
											<TalentSkillSlot currentSupport={talentSkill2} primary={102} setSupport={setTalentSkill2} />
										</div>
									</div>
								)}
								{currentTrait?.specId === '600' && index === 80 && (
									<div>
										<div className="title text-center">{t('commons:Support_skill')}</div>
										<div className="flex flex-row shadow-md shadow-black border-t border-black items-center justify-center p-2">
											<TalentSkillSlot currentSupport={talentSkill3} primary={103} setSupport={setTalentSkill3} />
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				))}
		</>
	);
}
export default HeroTrait;
