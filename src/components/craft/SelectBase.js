import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import BaseCard from '../base/BaseCard';
import Loader from '../Loader';
import { formatArray } from '../../utils/utils';
import { DebounceInput } from 'react-debounce-input';
import { ViewportList } from 'react-viewport-list';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

function SelectBase({ currentBase, setCurrentBase, currentILevel, setCurrentILevel }) {
	const { translate, itemBase, dataI18n, i18n } = useContext(AppContext);
	const { t } = useTranslation();
	// eslint-disable-next-line
	const [listType, setListType] = useState(null);
	const [listTypeSecondary, setListTypeSecondary] = useState(null);
	const [currentType, setCurrentType] = useState(null);
	const [currentTypeSecondary, setCurrentTypeSecondary] = useState(null);
	const [currentMinimumLevel, setCurrentMinimumLevel] = useState(null);
	const [currentAttr, setCurrentAttr] = useState('');
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
	const perChunk = isMedium ? 3 : 1;

	useEffect(() => {
		if (itemBase !== null) {
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
		setCurrentType(null)
		if (itemBase !== null) {
			let test = [
				...new Set(
					itemBase
						.filter((i) => i.type1 === '1')
						.filter((i) => currentTypeSecondary === null || translate(i.description2) === currentTypeSecondary)
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

	const onDropDownChange = (e) => {
		const typeChange = {
				"primary": setCurrentType,
				"secondary": setCurrentTypeSecondary
		};
		const { dataset, value } = e.target;
		typeChange[dataset.type](value || null);
	};

	const onChangeCurrentLevel = (value) => {
		setCurrentMinimumLevel(value || null)
	};

	const onChangeAttr = (e) => {
		setCurrentAttr(e.target.value.toLowerCase())
	};

	const filterAttribut = (e) => {
		const currentLang = i18n.language;
		let baseAttr = 'base_attr_display_' + currentLang;
		let suffix = 'suffix_' + currentLang;

		if (currentAttr === '') {
			return true;
		}

		return e[baseAttr] && e[baseAttr].some(b => b[0].toLowerCase().indexOf(currentAttr) > -1) || 
		e[suffix] && e[suffix].some(b => b.toLowerCase().indexOf(currentAttr.toLowerCase()) > -1);
	};

	const filteredBase = itemBase
		.filter(
			(el) =>
				el.type1 === '1' &&
				el.icon &&
				el.name !== translate(el.name) &&
				(currentType == null || translate(el.description1) === currentType) &&
				(currentTypeSecondary == null || translate(el.description2) === currentTypeSecondary) &&
				(currentMinimumLevel === null || parseInt(el.require_level) >= parseInt(currentMinimumLevel)) &&
				filterAttribut(el) 
		)
		.sort((a, b) => a.require_level - b.require_level);

	if (itemBase === null || listType === null || dataI18n === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	return (
		<div className="flex flex-col">
			<div className={`flex flex-col md:flex-row gap-1 ${currentBase === null ? '' : 'hidden'}`}>
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:Type')}</label>
					<select data-type="secondary" onChange={onDropDownChange} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listTypeSecondary.map((type) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:Secondary_type')}</label>
					<select data-type="primary" onChange={onDropDownChange} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listType.map((type) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold md:w-auto w-full">{t('commons:minimum_level_require')}</label>
					<DebounceInput
						type="number"
						className="bg-[#282828] border rounded border-slate-500 w-full md:w-auto"
						placeholder={t('commons:minimum_level') + '...'}
						debounceTimeout={500}
						onChange={(event) => onChangeCurrentLevel(event.target.value)}
					/>
				</div>
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:attributes')}</label>
					<DebounceInput
						type="text"
						className="bg-[#282828] border rounded border-slate-500 w-full md:w-auto"
						placeholder={t('commons:attributes') + '...'}
						debounceTimeout={500}
						value={currentAttr}
						onChange={(event) => onChangeAttr(event)}
					/>
				</div>
			</div>
			{currentBase === null ? (
				<div className="grid grid-cols-1 gap-2 mx-auto">
					<ViewportList items={formatArray(filteredBase, perChunk)}>
						{(items, index) => {
							return (
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2" key={index}>
									{items.map((item, key) => {
										return (
											<BaseCard
												setCurrentILevel={setCurrentILevel}
												setCurrentBase={setCurrentBase}
												cardData={item}
												key={key}
												currentAttr={currentAttr}
											/>
										);
									})}
								</div>
							);
						}}
					</ViewportList>
				</div>
			) : (
				<BaseCard
					currentILevel={currentILevel}
					setCurrentILevel={setCurrentILevel}
					setCurrentBase={setCurrentBase}
					cardData={currentBase}
					showAffix={true}
				/>
			)}
		</div>
	);
}
export default SelectBase;
