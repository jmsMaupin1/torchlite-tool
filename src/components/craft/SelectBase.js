import React, { useReducer, useContext, useEffect } from 'react';
import { ViewportList } from 'react-viewport-list';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { AppContext } from '../../context/AppContext';
import { formatArray } from '../../utils/utils';
import Loader from '../Loader';
import BaseCard from '../base/BaseCard';

const initialState = {
	listType: null,
	listTypeSecondary: [],
	filteredBases: null,
	currentType: null,
	currentTypeSecondary: false,
	currentMinLevel: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_LIST_TYPE':
			return { ...state, listType: action.payload.listType };
		case 'UPDATE_CURRENT_TYPE':
			return {
				...state,
				currentType: action.payload.currentType,
				listTypeSecondary: action.payload.listTypeSecondary,
				currentTypeSecondary: null,
			};
		case 'UPDATE_CURRENT_TYPE_SECONDARY':
			return { ...state, currentTypeSecondary: action.payload };
		case 'UPDATE_FILTERED_BASES':
			return { ...state, filteredBases: action.payload };
		default:
			return state;
	}
};

export default function SelectBaseNew({ onSelect }) {
	const { gear } = useContext(AppContext);
	const { t } = useTranslation();
	const [state, dispatch] = useReducer(reducer, initialState);
	const { listType, listTypeSecondary, currentType, currentTypeSecondary, filteredBases } = state;
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });

	const getAllBases = (type = null) => {
		let bases = [];

		if (type) {
			for (const subtype of Object.keys(gear[type])) bases = [...bases, ...gear[type][subtype]];
		} else {
			for (const type of Object.keys(gear)) bases = [...bases, ...getAllBases(type)];
		}

		return bases;
	};

	const onPrimaryTypeChange = (e) => {
		const { value } = e.target;
		dispatch({
			type: 'UPDATE_CURRENT_TYPE',
			payload: {
				currentType: value,
				listTypeSecondary: Object.keys(gear[value] || {}),
			},
		});
	};

	const onSecondaryTypeChange = (e) => {
		const { value } = e.target;
		dispatch({
			type: 'UPDATE_CURRENT_TYPE_SECONDARY',
			payload: value,
		});
	};

	useEffect(() => {
		if (gear) {
			dispatch({
				type: 'UPDATE_LIST_TYPE',
				payload: { listType: Object.keys(gear) },
			});
		}
	}, [gear]);

	useEffect(() => {
		let payload = [];

		if (gear) {
			if (currentType && currentTypeSecondary)
				payload = gear[currentType][currentTypeSecondary].sort((a, b) => a.require_level - b.require_level);
			else payload = getAllBases(currentType).sort((a, b) => a.require_level - b.require_level);

			dispatch({ type: 'UPDATE_FILTERED_BASES', payload });
		}
	}, [currentType, currentTypeSecondary]);

	if (!gear || !listType) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	return (
		<div className="flex flex-col flex-1">
			<div className={`flex flex-col md:flex-row gap-1'}`}>
				<div className="flex flex-col px-2 md:w-auto w-full">
					<label className="font-bold">{t('commons:Type')}</label>
					<select onChange={onPrimaryTypeChange} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:select_type')} --</option>
						{listType.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>
				{currentType && (
					<div className="flex flex-col px-2 md:w-auto w-full">
						<label className="font-bold">{t('commons:Secondary_type')}</label>
						<select onChange={onSecondaryTypeChange} className="w-auto bg-[#282828] border rounded border-slate-500">
							<option value=""> -- {t('commons:select_type')} --</option>
							{listTypeSecondary?.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-2">
				<ViewportList items={formatArray(filteredBases || getAllBases(), isMedium ? 3 : 1)}>
					{(items, index) => {
						return (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2" key={index}>
								{items.map((item, key) => {
									return <BaseCard onClick={onSelect} cardData={item} key={key} />;
								})}
							</div>
						);
					}}
				</ViewportList>
			</div>
		</div>
	);
}
