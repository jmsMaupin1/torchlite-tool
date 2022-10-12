import rewardGroup from './../data/rewardGroup.json';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Loader from './Loader';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'flowbite-react';

function FateCardCard({ card }) {
	const { translate, itemBase } = useContext(AppContext);

	const { t } = useTranslation();
	if (itemBase === null || card === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	const currentItemBase = itemBase.find((i) => i.id === card.id);
	const rewardGroupId = card.reward_group_id.split(':')[0];
	//console.log('rewardGroupId', rewardGroupId);

	const currentReward = rewardGroup.find((r) => r.id === rewardGroupId)?.rewards.split(';');
	//console.log(currentReward);
	let possibleItems = [];
	currentReward?.forEach((r) => {
		// r = "item:3|300120481|1|1|1,100"
		const itemId = r.split('|')[1];
		//console.log(r);
		const myItem = itemBase.find((i) => i.id === itemId);
		if (myItem !== undefined)
			possibleItems.push({ item: myItem, weight: r.split(',')[0].split('|')[r.split('|').length - 1] });
	});

	//console.log('currentReward', currentReward);
	return (
		<div
			style={{ backgroundImage: `url("img/FateCard/${currentItemBase.icon_card}.png")` }}
			className="relative border rounded bg-[#222] text-white gap-1 shadow-lg shadow-black bg-contain bg-no-repeat"
		>
			<div className="bg-cover bg-black bg-opacity-70 top-0 left-0 w-full h-full z-0">
				<div className="content z-1 w-full h-full p-2">
					<div className="flex flex-row items-center justify-evenly">
						<img alt="Icon" className="h-20" loading="lazy" src={`img/icons/${currentItemBase.icon}.png`} />
						<div className="text-3xl">x{card.stack}</div>
					</div>

					<div>Rarity : {card.rarity}</div>
					<div>Random ? : {card.is_random}</div>
					{card.is_random === '1' && (
						<div>
							<img src={`img/icons/${card.random_icon}.png`} alt="random_icon" />
						</div>
					)}
					<div className="text-center title">{translate(card.tips_summary)}</div>
					<div>
						<div className="title text-white text-center border-b border-slate-500 mt-2 mx-auto">
							{t('commons:Possible_items')}
						</div>
						{possibleItems.map((i, index) => (
							<div key={index} className="flex flex-row items-center gap-2">
								<div>
									<img
										alt="Icon"
										className="h-10"
										loading="lazy"
										src={`img/icons/${i.item.icon}.png`}
									/>
								</div>
								<div className="flex flex-row justify-between w-full">
									<div>
										<Tooltip
											content={
												<div
													dangerouslySetInnerHTML={{ __html: translate(i.item.description2) }}
												></div>
											}
											trigger="hover"
										>
											{translate(i.item.name)}
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
	);
}
export default React.memo(FateCardCard);
