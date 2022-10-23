import React, { useRef, useState, useContext, useEffect } from 'react';
import Legendary from '../components/Legendary';
import { AppContext } from '../context/AppContext';
import { DebounceInput } from 'react-debounce-input';
import Loader from '../components/Loader';
import { ViewportList } from 'react-viewport-list';
import { useMediaQuery } from 'react-responsive';
import { formatArray } from '../utils/utils';
import { useTranslation } from 'react-i18next';

function Legendaries() {
	const { translate, itemGold, itemBase, dataI18n, i18n } = useContext(AppContext);
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
	const isLarge = useMediaQuery({ query: '(min-width: 1024px)' });
	const { t } = useTranslation();
	const ref = useRef(null);

	// eslint-disable-next-line
	const [listType, setListType] = useState(null);
	const [listTypeSecondary, setListTypeSecondary] = useState(null);
	const [currentType, setCurrentType] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [currentAffix, setCurrentAffix] = useState(null);
	const [currentTypeSecondary, setCurrentTypeSecondary] = useState(null);
	const [currentMinimumLevel, setCurrentMinimumLevel] = useState(null);

	useEffect(() => {
		if (itemBase) {
			let test = [
				...new Set(
					itemBase
						.filter((i) => i.type1 === '1')
						.map((x) => {
							return translate(x.description1);
						})
				),
			].sort();
			let tempType = test.filter((e) => e !== undefined);
			setListType(tempType);
		}
		// eslint-disable-next-line
	}, [itemBase, dataI18n]);
	useEffect(() => {
		if (itemBase) {
			let test = [
				...new Set(
					itemBase
						.filter((i) => i.type1 === '1')
						.map((x) => {
							return translate(x.description2);
						})
				),
			].sort();
			let tempType = test.filter((e) => e !== undefined && e.indexOf('|') === -1);
			setListTypeSecondary(tempType);
		}
		// eslint-disable-next-line
	}, [itemBase, dataI18n]);
	useEffect(() => {
		// on change currentType we need to adapt listType
		if (itemBase) {
			let test = [
				...new Set(
					itemBase
						.filter((i) => i.type1 === '1')
						.filter((i) => !currentTypeSecondary || translate(i.description2) === currentTypeSecondary)
						.map((x) => {
							return translate(x.description1);
						})
				),
			].sort();
			let tempType = test.filter((e) => e !== undefined);
			setListType(tempType);
		}
		// eslint-disable-next-line
	}, [currentTypeSecondary, dataI18n]);

	const onChangeType = (e) => {
		setCurrentType(e.target.value === '' ? null : e.target.value);
	};
	const onChangeName = (value) => {
		setCurrentName(value === '' ? null : value);
	};
	const onChangeAffix = (value) => {
		setCurrentAffix(value === '' ? null : value);
	};
	const onChangeTypeSecondary = (e) => {
		setCurrentTypeSecondary(e.target.value === '' ? null : e.target.value);
	};
	const onChangeCurrentLevel = (value) => {
		setCurrentMinimumLevel(value === '' ? null : value);
	};

	const findBase = (e) => {
		let baseTemp = itemBase.find((b) => b.id === e.base_id);
		if (
			e.icon !== '' &&
			(!currentTypeSecondary || translate(baseTemp.description2) === currentTypeSecondary) &&
			(!currentType || translate(baseTemp.description1) === currentType)
		)
			return parseInt(e.id) >= 100;

		return false;
	};
	const filterByName = (e) => {
		if (currentName) {
			return translate(e.name).toLowerCase().includes(currentName.toLowerCase());
		}

		return true;
	};
	const filterByAffix = (e) => {
		const currentLang = i18n.language;
		if (!currentAffix) return true;

		let tabAffix = [];
		let isFind = false;
		if (e.prefix !== undefined && e.prefix !== []) {
			e.prefix
				.filter((e) => e !== null)
				.forEach((p) => {
					tabAffix.push(p['tier0_' + currentLang][0]);
					tabAffix.push(p['tier1_' + currentLang][0]);
				});
			if (tabAffix.find((a) => a.toLowerCase().indexOf(currentAffix.toLowerCase()) > -1) !== undefined) {
				isFind = true;
			}
		}
		let tabSuffix = [];
		if (e.suffix !== undefined && e.suffix !== []) {
			e.suffix
				.filter((e) => e !== null)
				.forEach((p) => {
					tabSuffix.push(p['tier0_' + currentLang][0]);
					tabSuffix.push(p['tier1_' + currentLang][0]);
				});
			if (tabSuffix.find((a) => a.toLowerCase().indexOf(currentAffix.toLowerCase()) > -1) !== undefined) {
				isFind = true;
			}
		}
		return isFind;
	};

	if (!listType || !dataI18n || !itemGold) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	let formatedArray = itemGold
		.filter(findBase)
		.filter(filterByName)
		// add this filter
		.filter(filterByAffix)
		.filter((e) => !currentMinimumLevel || parseInt(e.require_level) >= parseInt(currentMinimumLevel))
		.sort((a, b) => a.require_level - b.require_level);

	//format Array for matching 2/4 items per chunks
	if (isLarge) formatedArray = formatArray(formatedArray, 3);
	else if (isMedium) formatedArray = formatArray(formatedArray, 2);

	return (
		<>
			<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500 mb-2">{t('commons:legendaries')}</div>
			<div className="flex flex-col md:flex-row md:gap-2 md:items-center mb-2 p-2 w-full">
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:name')}</label>
					<DebounceInput
						className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
						placeholder={t('commons:search_item_by_name')}
						debounceTimeout={500}
						onChange={(event) => onChangeName(event.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:Type')}</label>
					<select onChange={onChangeTypeSecondary} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listTypeSecondary?.map((type, index) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:Secondary_type')}</label>
					<select onChange={onChangeType} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listType?.map((type, index) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col">
					<label className="font-bold md:w-auto w-full">{t('commons:minimum_level_require')}</label>
					<DebounceInput
						type="number"
						className="bg-[#282828] border rounded border-slate-500 w-full md:w-auto"
						placeholder={t('commons:minimum_level') + '...'}
						debounceTimeout={500}
						onChange={(event) => onChangeCurrentLevel(event.target.value)}
					/>
				</div>
				<div className="flex flex-col">
					<label className="font-bold">Affix</label>
					<DebounceInput
						className="md:w-auto w-full bg-[#282828] border rounded border-slate-500"
						placeholder={t('commons:search_item_by_affix')}
						debounceTimeout={500}
						onChange={(event) => onChangeAffix(event.target.value)}
					/>
				</div>
			</div>
			{isMedium || isLarge ? (
				<div className="grid grid-cols-1 gap-4 mx-auto" ref={ref}>
					<ViewportList items={formatedArray} viewportRef={ref}>
						{(items, index) => {
							return (
								<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-2" key={index}>
									{items.map((item, key) => {
										return <Legendary key={key} legendary={item} currentAffix={currentAffix} />;
									})}
								</div>
							);
						}}
					</ViewportList>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 mx-auto p-2">
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
