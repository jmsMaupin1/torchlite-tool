import { useTranslation } from 'react-i18next';
import React from 'react';
import HeroTrait from './HeroTrait';
import perk from '../../data/perk.json';
import hero from '../../data/hero.json';

const TraitBuild = ({ fieldRefTrait, currentTrait, setCurrentTrait }) => {
	const { t } = useTranslation();

	const onTraitValueChange = (e) => {
		let currentLevel = e.target.name.split('_')[1];
		//{"15": null,"32":null,"50":null,"62":null,"80":null}
		let temp = { ...currentTrait };
		temp[currentLevel] = e.target.value;
		setCurrentTrait(temp);
	};

	const getTalentIdByProfession = (h) => {
		return (
			h.id === '310' ||
			h.id === '600' ||
			h.id === '610' ||
			(h.id === '910') | (h.id === '920') ||
			h.id === '1100' ||
			h.id === '1300' ||
			h.id === '1310' ||
			h.id === '1400'
		);
	};

	const onSpecChange = (id, name) => {
		let temp = { ...currentTrait };
		temp['specId'] = id;
		temp['specName'] = name;
		setCurrentTrait(temp);
	};

	return (
		<>
			<div ref={fieldRefTrait} className={`text-center text-xl font-bold`}>
				{t('commons:select_trait')}
			</div>
			<div className={`trait flex flex-col gap-2 mb-2 w-full`}>
				<HeroTrait
					currentTrait={currentTrait}
					perk={perk}
					hero={hero.filter((h) => getTalentIdByProfession(h))}
					onSpecChange={onSpecChange}
					onTraitValueChange={onTraitValueChange}
				/>
			</div>
		</>
	);
};

export default TraitBuild;
