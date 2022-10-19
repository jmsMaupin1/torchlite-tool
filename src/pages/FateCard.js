import cardRecipe from './../data/cardRecipe.json';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import FateCardCard from '../components/FateCardCard';
import { useState, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useTranslation } from 'react-i18next';
import rewardGroup from './../data/rewardGroup.json';

function FateCard() {
	const { itemBase, translate, dataI18n, skills, itemGold } = useContext(AppContext);
	const [currentRarity, setCurrentRarity] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [currentItem, setCurrentItem] = useState(null);
	const [rarityList, setRarityList] = useState([]);
	const { t } = useTranslation();

	const onChangeName = (value) => {
		if (value === '') {
			setCurrentName(null);
		} else {
			setCurrentName(value);
		}
	};
	const onChangeRarity = (e) => {
		if (e.target.value === '') {
			setCurrentRarity(null);
		} else {
			setCurrentRarity(e.target.value);
		}
	};
	const onChangeItem = (e) => {
		if (e === '') {
			setCurrentItem(null);
		} else {
			setCurrentItem(e);
		}
	};
	useEffect(() => {
		if (cardRecipe !== null && dataI18n !== null) {
			let test = [
				...new Set(
					cardRecipe.map((x) => {
						return translate('TextTable_GameFunc|value|Func_Achievement_Rarity_' + x.rarity);
					})
				),
			].sort();
			let tempType = test.filter((e) => e !== undefined);
			setRarityList(tempType);
		}
		// eslint-disable-next-line
	}, [cardRecipe, dataI18n]);

	const filterByName = (e) => {
		const currentItemBase = itemBase.find((i) => i.id === e.id);
		if (currentName != null && currentItemBase !== undefined) {
			if (translate(currentItemBase.name).toLowerCase().includes(currentName.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	const filterByRarity = (e) => {
		if (currentRarity !== null) {
			return translate('TextTable_GameFunc|value|Func_Achievement_Rarity_' + e.rarity) === currentRarity;
		}
		return true;
	};
	const filterByItem = (item) => {
		const rewardGroupId = item.reward_group_id.split(';').map((g) => {
			return g.split(':')[0];
		});
		const rewardUniqueId = item.recipe_unique.split(';').map((u) => {
			return u.split(':')[0];
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
			if (itemGold !== null) {
				const myItem = itemGold.find((i) => i.id === u);
				if (myItem !== undefined) {
					possibleItems.push({ item: myItem, type: 'gold', weight: 0 });
				}
			}
		});
		let bIsFind = false;
		for (var cpt = 0; cpt < possibleItems.length; cpt++) {
			if (currentItem !== null) {
				if (translate(possibleItems[cpt].item.name).toLowerCase().includes(currentItem.toLowerCase())) {
					bIsFind = true;
					break;
				}
			} else {
				return true;
			}
		}
		return bIsFind;
	};

	if (itemBase === null || dataI18n === null || skills === null || itemGold === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className="flex flex-col">
			<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500 mb-2">{t('commons:Fate_card')}</div>
			<div className="flex flex-col md:flex-row md:gap-2 md:items-center mb-2 p-2 w-full">
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:name')}</label>
					<DebounceInput
						className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
						placeholder={t('commons:Name') + '...'}
						debounceTimeout={500}
						onChange={(event) => onChangeName(event.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:Rarity')}</label>
					<select onChange={onChangeRarity} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_rarity')} --</option>
						{rarityList.map((type, index) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:Item_name')}</label>
					<DebounceInput
						className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
						placeholder={t('commons:Item_name') + '...'}
						debounceTimeout={500}
						onChange={(event) => onChangeItem(event.target.value)}
					/>
				</div>
			</div>
			<div className="grid p-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{cardRecipe
					.filter(filterByName)
					.filter(filterByRarity)
					.filter(filterByItem)
					.sort((a, b) => a.rarity - b.rarity)
					.map((card, index) => (
						<FateCardCard card={card} key={'recipe' + index} />
					))}
			</div>
		</div>
	);
}
export default FateCard;
