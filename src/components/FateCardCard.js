import rewardGroup from './../data/rewardGroup.json';
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'flowbite-react';
import Legendary from './Legendary';
function FateCardCard({ card }) {
	const { translate, itemBase, itemGold, skills } = useContext(AppContext);
	const [isShow, setIsShow] = useState(false);

	const { t } = useTranslation();

	const currentItemBase = itemBase.find((i) => i.id === card.id);
	const rewardGroupId = card.reward_group_id.split(';').map((g) => {
		return g.split(':')[0];
	});
	const rewardUniqueId = card.recipe_unique.split(';').map((u) => {
		if (u !== undefined && u !== '') return { id: u.split(':')[0], weight: u.split(':')[1].split('|')[0] };
	});

	const currentReward = rewardGroup.find((r) => rewardGroupId.includes(r.id))?.rewards.split(';');

	let possibleItems = [];
	currentReward?.forEach((r) => {
		// r = "item:3|300120481|1|1|1,100"
		// r = "skill:7401|1|21|0|1,100"
		let itemId = r.split('|')[1];
		const type = r.split(':')[0];
		let myItem = null;
		let level = null;
		if (type === 'item') {
			myItem = itemBase.find((i) => i.id === itemId);
		}
		if (type === 'skill') {
			itemId = r.split('|')[0].split(':')[1];
			level = r.split('|')[2];
			myItem = skills.find((s) => s.name === 'item_base|name|' + itemId);
		}

		if (myItem !== null && myItem !== undefined)
			possibleItems.push({
				item: myItem,
				type: type,
				level: level,
				weight: r.split(',')[0].split('|')[r.split('|').length - 1],
			});
	});
	rewardUniqueId?.forEach((u) => {
		if (itemGold !== null && u !== undefined) {
			const myItem = itemGold.find((i) => i.id === u.id);
			if (myItem !== undefined) {
				possibleItems.push({ item: myItem, type: 'gold', weight: u.weight });
			}
		}
	});

	const returnColorByRarity = (rarity) => {
		switch (rarity) {
			case '1':
				return 'b5b5b5';
			case '2':
				return '1fa8df';
			case '3':
				return '7d1999';
			case '4':
				return 'ad1769';
			case '100':
				return 'dc6d23';
			case '6':
				return '88c859';
			default:
				return 'b1b1b1';
		}
	};

	if (itemBase === null || card === null || itemGold === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div
			style={{ backgroundImage: `url("img/FateCard/${currentItemBase.icon_card}.png")` }}
			className={`relative border rounded-lg bg-[#222] text-white gap-1 shadow-lg shadow-black bg-cover bg-no-repeat`}
		>
			<div className="hidden to-[#b5b5b5]"></div>
			<div className="hidden to-[#1fa8df]"></div>
			<div className="hidden to-[#7d1999]"></div>
			<div className="hidden to-[#ad1769]"></div>
			<div className="hidden to-[#dc6d23]"></div>
			<div className="hidden to-[#88c859]"></div>
			<div className="bg-cover bg-black bg-opacity-80 top-0 left-0 w-full h-full z-0 rounded-lg">
				<div className="content z-1 w-full h-full rounded-lg">
					<div
						className={`p-2 flex rounded-t-lg flex-col items-center bg-gradient-to-b from-[#080808] to-[#${returnColorByRarity(
							card.rarity
						)}] `}
					>
						<div className="title" style={{ color: 'white' }}>
							{translate(currentItemBase.name)}
						</div>
						<div className="flex flex-row items-center gap-2">
							<img alt="Icon" className="h-14" loading="lazy" src={`img/icons/${currentItemBase.icon}.png`} />
							<div className="text-4xl">x{card.stack}</div>
						</div>
					</div>
					<div className="p-2">
						<div className="text-center title">{translate(card.tips_summary)}</div>
						<div>
							{currentItemBase.description2 !== translate(currentItemBase.description2) &&
								translate(currentItemBase.description2)}
						</div>
						<div>
							{possibleItems.length > 0 && (
								<div className="title text-white text-center border-b border-slate-500 mt-2 mx-auto">
									<div
										onClick={() => setIsShow(!isShow)}
										className="hover:cursor-pointer flex flex-row justify-between items-center"
									>
										<div>
											{t('commons:Possible_items')} ({possibleItems.length})
										</div>
										<div>
											<img
												src="img/icons/UI/UI_Common_Png9_01.png"
												alt="Toggle"
												className={`${isShow ? 'rotate-90' : '-rotate-90'} h-4`}
											/>
										</div>
									</div>
								</div>
							)}
							{isShow &&
								possibleItems.map((i, index) => (
									<div key={index} className="flex flex-row items-center gap-2">
										<div>
											<img
												alt="Icon"
												className="h-10"
												loading="lazy"
												src={`img/icons/${i.type === 'skill' ? 'CoreTalentIcon/' : ''}${i.item.icon}.png`}
											/>
										</div>
										<div className="flex flex-row justify-between w-full">
											<div className="hover:cursor-pointer">
												<Tooltip
													content={
														(i.type === 'item' && (
															<div
																dangerouslySetInnerHTML={{
																	__html: translate(i.item.description2),
																}}
															></div>
														)) ||
														(i.type === 'gold' && <Legendary legendary={i.item} currentAffix={null} />)
													}
													trigger={`${i.type === 'base' ? 'hover' : 'click'}`}
												>
													<div>{translate(i.item.name)}</div>
													{i.type === 'skill' && (
														<div>
															{t('commons:level')} {i.level}
														</div>
													)}
												</Tooltip>
											</div>

											<div>
												<Tooltip content={'Weight'} trigger="hover">
													{i.weight}
												</Tooltip>
											</div>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default React.memo(FateCardCard);
