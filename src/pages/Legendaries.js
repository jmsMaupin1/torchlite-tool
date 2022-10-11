import React, { useState, useContext, useEffect } from 'react';
import Legendary from '../components/Legendary';
import { AppContext } from '../context/AppContext';
import { DebounceInput } from 'react-debounce-input';
import Loader from '../components/Loader';
import { ViewportList } from 'react-viewport-list';
import { useMediaQuery } from 'react-responsive';
import { formatArray } from '../utils/utils';
import { useTranslation } from 'react-i18next';

function Legendaries() {
	const { translate, itemGold, itemBase, dataI18n } = useContext(AppContext);
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
	const isLarge = useMediaQuery({ query: '(min-width: 1024px)' });
	const { t } = useTranslation();

	// eslint-disable-next-line
	const [listType, setListType] = useState(null);
	const [currentType, setCurrentType] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [currentAffix, setCurrentAffix] = useState(null);

	useEffect(() => {
		if (itemBase !== null) {
			let test = [
				...new Set(
					itemBase.map((x) => {
						return x.description2_display;
					})
				),
			].sort();
			let tempType = test.filter((e) => e !== undefined && e.indexOf('|') === -1);
			setListType(tempType);
		}
	}, [itemBase]);

	const onChangeType = (e) => {
		if (e.target.value === '') {
			setCurrentType(null);
		} else {
			setCurrentType(e.target.value);
		}
	};

	const onChangeName = (value) => {
		if (value === '') {
			setCurrentName(null);
		} else {
			setCurrentName(value);
		}
	};

	const onChangeAffix = (value) => {
		if (value === '') {
			setCurrentAffix(null);
		} else {
			setCurrentAffix(value);
		}
	};
	const findBase = (e) => {
		let baseTemp = itemBase.find((b) => b.id === e.base_id);
		if (e.icon !== '' && (baseTemp.description2_display === currentType || currentType == null)) {
			// filter for test item
			if (
				(e.prefix[0] != null &&
					e.prefix[0].tier1[0] === '(40-60) strength' &&
					e.prefix[1] != null &&
					e.prefix[1].tier1[0] === '(40-60) strength') ||
				(e.suffix[0] != null &&
					e.suffix[0].tier1[0] === '(40-60) strength' &&
					e.suffix[1] != null &&
					e.suffix[1].tier1[0] === '(40-60) strength')
			) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
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

	if (listType == null || dataI18n == null || itemGold == null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	let formatedArray = itemGold
		.filter(findBase)
		.filter(filterByName)
		.sort((a, b) => a.require_level - b.require_level);

	//format Array for matching 2/4 items per chunks
	if (isLarge) formatedArray = formatArray(formatedArray, 3);
	else if (isMedium) formatedArray = formatArray(formatedArray, 2);

	return (
		<>
			<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500 mb-2">
				{t('commons:legendaries')}
			</div>
			<div className="flex flex-col md:flex-row md:gap-2 md:items-center mb-2 p-2 w-full">
				<label>{t('commons:type')}</label>
				<select
					onChange={onChangeType}
					className="md:w-auto bg-[#282828] border rounded border-slate-500 w-full"
				>
					<option value=""> -- {t('commons:select_type')} --</option>
					{listType.map((type, index) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
				<label>{t('commons:name')}</label>
				<DebounceInput
					className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
					placeholder={t('commons:search_item_by_name')}
					debounceTimeout={500}
					onChange={(event) => onChangeName(event.target.value)}
				/>
				<label>Affix</label>
				<DebounceInput
					className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
					placeholder={t('commons:search_item_by_affix')}
					debounceTimeout={500}
					onChange={(event) => onChangeAffix(event.target.value)}
				/>
			</div>
			{isMedium || isLarge ? (
				<div className="grid grid-cols-1 gap-10 mx-auto">
					<ViewportList items={formatedArray}>
						{(items, index) => {
							return (
								<div className="grid grid-cols-2 lg:grid-cols-3 gap-10 px-2" key={index}>
									{items.map((item, key) => {
										return <Legendary key={key} legendary={item} currentAffix={currentAffix} />;
									})}
								</div>
							);
						}}
					</ViewportList>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-10 mx-auto p-2">
					<ViewportList items={formatedArray}>
						{(item, key) => {
							return <Legendary key={key} legendary={item} currentAffix={currentAffix} />;
						}}
					</ViewportList>
				</div>
			)}
		</>
	);
}
export default Legendaries;
