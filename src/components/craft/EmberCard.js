import { AppContext } from '../../context/AppContext';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';
import HyperLinkTooltip from '../HyperLinkTooltip';
import { random } from 'lodash';
function EmberCard({ ember, currentBase, currentILevel, showOnlyT1 }) {
	const { translate, modifiers, dataI18n, itemBase, replaceTag } = useContext(AppContext);
	const { t } = useTranslation();
	const [showMod, setShowMod] = useState(false);
	if (itemBase === null || dataI18n === null || modifiers === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	const returnTotal = (_group) => {
		let currentGroupMod = modifiers
			.filter((m) => m.group === _group && m.forge_weight !== '0' && m.type1 === '1')
			.filter((m) => currentBase === null || m.type2 === currentBase?.type2)
			.filter((m) => currentBase === null || m.type3 === currentBase?.type3)
			.filter((m) => parseInt(m.forge_level) <= parseInt(currentILevel) || currentILevel === null)
			.filter((m) => currentBase === null || m.type4 === currentBase?.type4);

		let totalWeight = 0;

		totalWeight = currentGroupMod
			.map((m) => parseInt(m.forge_weight))
			.reduce((previousValue, currentValue) => previousValue + currentValue, totalWeight);
		if (_group === '1096000') {
			console.log('totalWeight', totalWeight);
		}
		return totalWeight;
	};
	const returnPercent = (total, weight) => {
		return ((parseInt(weight) * 100) / parseInt(total)).toFixed(2);
	};
	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};
	const roll = (total, ember) => {
		//it is assumed that each modifier has as much chance as the others to be drawn
		let myDifferentModifiers = modifiers
			.filter((m) => m.Ashes === ember.id && parseInt(m.tier) === 1 && m.type1 === '1' && m.forge_weight !== '0')
			.filter((m) => currentBase === null || m.type2 === currentBase?.type2)
			.filter((m) => currentBase === null || m.type3 === currentBase?.type3)
			.filter((m) => currentBase === null || m.type4 === currentBase?.type4);
		// we pick one random mod from the array of possible mod
		const randomMod = myDifferentModifiers[Math.floor(Math.random() * myDifferentModifiers.length)];

		let myRoll = getRandomInt(total) + 1;

		let myModifiers = modifiers
			.filter((m) => m.Ashes === ember.id && parseInt(m.tier) > 0 && m.type1 === '1' && m.forge_weight !== '0')
			.filter((m) => showOnlyT1 === false || (showOnlyT1 === true && m.tier === '1'))
			.filter((m) => currentBase === null || m.type2 === currentBase?.type2)
			.filter((m) => currentBase === null || m.type3 === currentBase?.type3)
			.filter((m) => currentBase === null || m.type4 === currentBase?.type4)
			// we add the group of the mod we roll in randomMod
			.filter((m) => m.group === randomMod.group);
		let myIndex = 0;
		myModifiers.map((mod) => {
			let currentWeight = parseInt(mod.forge_weight);
			if (myRoll <= myIndex + currentWeight) {
				return mod;
			}
			myIndex += parseInt(mod.forge_weight);
		});
	};

	return (
		<div className="bg-[#222] shadow-lg shadow-black rounded px-2">
			<div className="flex flex-col items-center gap-2 w-full ">
				<div
					className="flex flex-row items-center gap-2 justify-between w-full hover:cursor-pointer"
					onClick={() => setShowMod(!showMod)}
				>
					<div className="flex flex-row gap-2 items-center">
						<img className="h-10 aspect-square" src={`img/icons/${ember.icon}.png`} loading="lazy" alt="Ember" />
						<div>
							{translate(ember.name)} {ember.id}
						</div>
					</div>
					<div>
						{
							modifiers
								.filter((m) => m.Ashes === ember.id && parseInt(m.tier) > 0 && m.type1 === '1')
								.filter((m) => currentBase === null || m.type2 === currentBase?.type2)
								.filter((m) => currentBase === null || m.type3 === currentBase?.type3)
								.filter((m) => currentBase === null || m.type4 === currentBase?.type4).length
						}
					</div>
					<div>
						{!showMod ? (
							<img src="img/icons/ui/UI_Reward_Xiala.png" alt="V" />
						) : (
							<img src="img/icons/ui/UI_Reward_Xiala02.png" alt="A" />
						)}
					</div>
				</div>
				<div className={`flex flex-col items-center gap-2 w-full ${!showMod ? 'hidden' : ''}`}>
					{modifiers
						.filter((m) => m.Ashes === ember.id && parseInt(m.tier) > 0 && m.type1 === '1' && m.forge_weight !== '0')
						.filter((m) => showOnlyT1 === false || (showOnlyT1 === true && m.tier === '1'))
						.filter((m) => currentBase === null || m.type2 === currentBase?.type2)
						.filter((m) => currentBase === null || m.type3 === currentBase?.type3)
						.filter((m) => currentBase === null || m.type4 === currentBase?.type4)
						.map((mod) => (
							<div
								key={mod.id}
								className={`${
									parseInt(mod.forge_level) > parseInt(currentILevel) ? 'opacity-30' : ''
								} flex flex-row justify-between border border-[#333] w-full gap-2 bg-[#222] shadow-lg shadow-black rounded`}
							>
								<div className="flex flex-row gap-2 items-center">
									{/* <div className="text-[#f67370] border rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
										<div title={mod.modifier_type === '3' ? 'prefix' : mod.modifier_type === '4' ? 'suffix' : null}>
											T{mod.tier}
										</div>
									</div> */}
									<div className={`lozange t${mod.tier} aspect-square ml-2`}></div>
									<div>T{mod.tier}</div>
									{mod.affix.map((a, ind) => (
										<HyperLinkTooltip key={ind} str={a} />
									))}
									{mod.id} {mod.group}
								</div>
								{/* Debug Daata */}
								<div className="flex flex-row gap-1">
									<div className="flex flex-col items-center border border-[#333] px-2 text-sm">
										<div>Lvl</div>
										<div>{mod.forge_level}</div>
									</div>
									<div className="flex flex-col items-center border border-[#333] px-2 text-sm">
										<div>W</div>
										<div>{mod.forge_weight}</div>
									</div>
									<div
										className={`${
											parseInt(mod.forge_level) > parseInt(currentILevel) ? 'hidden' : ''
										} flex flex-col items-center border border-[#333] px-2 text-sm`}
									>
										<div>%</div>
										<div>{returnPercent(returnTotal(mod.group), mod.forge_weight)}</div>
									</div>
									<div
										className={`${
											parseInt(mod.forge_level) > parseInt(currentILevel) ? 'hidden' : ''
										} flex flex-col items-center border border-[#333] px-2 text-sm`}
									>
										<div>T</div>
										<div>{returnTotal(mod.group)}</div>
									</div>
									{/* <div className="flex flex-col items-center border border-[#333]">
										<div>Typ1</div>
										<div>{mod.type1}</div>
									</div>
									<div className="flex flex-col items-center border border-[#333]">
										<div>Typ2</div>
										<div>{mod.type2}</div>
									</div>
									<div className="flex flex-col items-center border border-[#333]">
										<div>Typ3</div>
										<div>{mod.type3}</div>
									</div>
									<div className="flex flex-col items-center border border-[#333]">
										<div>Typ4</div>
										<div>{mod.type4}</div>
									</div> */}
								</div>
							</div>
						))}
				</div>
				<div>
					<button onClick={() => roll()}>Roll</button>
				</div>
			</div>
		</div>
	);
}
export default React.memo(EmberCard);
