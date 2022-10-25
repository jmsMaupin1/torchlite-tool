import pactSpirit from './../data/servant.json';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';
import Loader from '../components/Loader';
import { ViewportList } from 'react-viewport-list';
import PactSpiritCard from '../components/pactSpirit/PactSpiritCard';
import { useMediaQuery } from 'react-responsive';
import { formatArray } from '../utils/utils';

function PactSpirit() {
	const { translate, dataI18n } = useContext(AppContext);
	const { t } = useTranslation();
	//state
	const [currentRarity, setCurrentRarity] = useState(null);
	const [currentType, setCurrentType] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });

	const listRarity = [
		{ id: '2', name: 'Magic' },
		{ id: '3', name: 'Rare' },
		{ id: '100', name: 'Legendary' },
	];
	const listType = [
		{ id: '1', name: 'Attack' },
		{ id: '2', name: 'Spell' },
		{ id: '3', name: 'Persistent' },
		{ id: '4', name: 'Summon' },
		{ id: '5', name: 'Survival' },
		{ id: '6', name: 'Drop' },
		{ id: '100', name: 'Legendary' },
	];
	const filterByRarity = (e) => {
		if (currentRarity != null) {
			if (e.rarity === currentRarity) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	const filterByType = (e) => {
		if (currentType != null) {
			if (e.type === currentType) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	const filterByName = (e) => {
		if (currentName != null) {
			if (translate(e.name).toLowerCase().indexOf(currentName.toLowerCase()) > -1) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	};
	const onChangeType = (e) => {
		if (e.target.value === '') {
			setCurrentType(null);
		} else {
			setCurrentType(e.target.value);
		}
	};
	const onChangeRarity = (e) => {
		if (e.target.value === '') {
			setCurrentRarity(null);
		} else {
			setCurrentRarity(e.target.value);
		}
	};
	const onChangeName = (value) => {
		if (value === '') {
			setCurrentName(null);
		} else {
			setCurrentName(value);
		}
	};
	let formatedArray = pactSpirit
		.filter(filterByType)
		.filter(filterByRarity)
		.filter(filterByName)
		.sort((a, b) => a.rarity - b.rarity);

	if (isMedium) formatedArray = formatArray(formatedArray, 3);

	if (dataI18n === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<>
			<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500 mb-2">{t('commons:legendaries')}</div>
			<div className="flex flex-col md:flex-row md:gap-2 md:items-center mb-2 w-full p-2 md:p-0">
				<label>{t('commons:name')}</label>
				<DebounceInput
					className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
					placeholder={t('commons:search_item_by_name')}
					debounceTimeout={500}
					onChange={(event) => onChangeName(event.target.value)}
				/>
				<label>{t('commons:type')}</label>
				<select onChange={onChangeType} className="md:w-auto bg-[#282828] border rounded border-slate-500 w-full">
					<option value=""> -- {t('commons:select_type')} --</option>
					{listType.map((type, index) => (
						<option key={type.id} value={type.id}>
							{t('commons:' + type.name)}
						</option>
					))}
				</select>
				<label>{t('commons:rarity')}</label>
				<select onChange={onChangeRarity} className="md:w-auto bg-[#282828] border rounded border-slate-500 w-full">
					<option value=""> -- {t('commons:select_rarity')} --</option>
					{listRarity.map((rarity, index) => (
						<option key={rarity.id} value={rarity.id}>
							{t('commons:' + rarity.name)}
						</option>
					))}
				</select>
			</div>
			{isMedium ? (
				<div className="grid grid-cols-1 gap-2 mx-auto">
					<ViewportList items={formatedArray}>
						{(items, index) => {
							return (
								<div className="grid grid-cols-3 gap-2" key={index}>
									{items.map((item, key) => {
										return <PactSpiritCard p={item} key={key} />;
									})}
								</div>
							);
						}}
					</ViewportList>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-2 mx-auto p-2">
					<ViewportList items={formatedArray}>
						{(item, index) => {
							return <PactSpiritCard p={item} key={index} />;
						}}
					</ViewportList>
				</div>
			)}
		</>
	);
}
export default PactSpirit;
