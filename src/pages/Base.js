import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import BaseCard from '../components/base/BaseCard';
import Loader from '../components/Loader';
import { formatArray } from '../utils/utils';
import { DebounceInput } from 'react-debounce-input';
import { ViewportList } from 'react-viewport-list';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

function Base() {
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

	const onChangeType = (e) => {
		if (e.target.value === '') {
			setCurrentType(null);
		} else {
			setCurrentType(e.target.value);
		}
		console.log('changeType', e.target.value);
	};
	const onChangeTypeSecondary = (e) => {
		if (e.target.value === '') {
			setCurrentTypeSecondary(null);
		} else {
			setCurrentTypeSecondary(e.target.value);
		}
		console.log('changeTypeSecondary', e.target.value);
	};
	useEffect(() => {
		if (itemBase !== null) {
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

	const onChangeCurrentLevel = (value) => {
		if (value === '') {
			setCurrentMinimumLevel(null);
		} else {
			setCurrentMinimumLevel(value);
		}
	};
	const onChangeAttr = (e) => {
		if (e.target.value !== '') {
			setCurrentAttr(e.target.value);
		} else {
			setCurrentAttr('');
		}
	};

	if (itemBase === null || listType === null || dataI18n === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	const filterAttribut = (e) => {
		const currentLang = i18n.language;
		let baseAttr = '';
		let suffix = '';
		//base_attr_display_en, suffix_en
		if (currentAttr === '') {
			return true;
		}
		baseAttr = 'base_attr_display_' + currentLang;
		suffix = 'suffix_' + currentLang;
		let isFind = false;
		if (e[baseAttr] !== undefined) {
			e[baseAttr].forEach((b) => {
				if (b[0].toLowerCase().indexOf(currentAttr.toLowerCase()) > -1) isFind = true;
			});
		}
		if (e[suffix] !== undefined) {
			e[suffix].forEach((b) => {
				if (b.toLowerCase().indexOf(currentAttr.toLowerCase()) > -1) isFind = true;
			});
		}
		return isFind;
	};
	const filteredBase = itemBase
		.filter(
			(el) =>
				el.type1 === '1' &&
				el.icon !== '' &&
				el.name !== translate(el.name) &&
				(currentType == null || translate(el.description1) === currentType)
		)
		.filter(
			(el) =>
				el.type1 === '1' &&
				el.icon !== '' &&
				el.name !== translate(el.name) &&
				(currentTypeSecondary == null || translate(el.description2) === currentTypeSecondary)
		)
		.filter((e) => currentMinimumLevel === null || parseInt(e.require_level) >= parseInt(currentMinimumLevel))
		.filter(filterAttribut)
		.filter((e) => e['suffix_' + i18n.language] !== undefined || e['base_attr_display_' + i18n.language] !== undefined)
		.sort((a, b) => a.require_level - b.require_level);
	//format Array for matching 2/4 items per chunks
	let formatedArray = null;
	if (isMedium) {
		formatedArray = formatArray(filteredBase, 4);
	} else {
		formatedArray = formatArray(filteredBase, 1);
	}

	return (
		<>
			<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500">Base</div>
			<div className="flex flex-col md:flex-row gap-1">
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:Type')}</label>
					<select onChange={onChangeTypeSecondary} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listTypeSecondary.map((type, index) => (
							<option key={type} value={type}>
								{translate(type)}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:Secondary_type')}</label>
					<select onChange={onChangeType} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listType.map((type, index) => (
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
			<div className="grid grid-cols-1 gap-2 mx-auto">
				<ViewportList items={formatedArray}>
					{(items, index) => {
						return (
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-2" key={index}>
								{items.map((item, key) => {
									return <BaseCard cardData={item} key={key} currentAttr={currentAttr} />;
								})}
							</div>
						);
					}}
				</ViewportList>
			</div>
		</>
	);
}

export default Base;
