import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import Select, { createFilter } from 'react-select';
import { MdAdd } from 'react-icons/md';
import Legendary from '../legendary/Legendary';
import { FaTrash } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const MandatoryItemsBuild = ({ fieldRefItems, currentItem, setCurrentItem, currentItems, setCurrentItems }) => {
	const { t } = useTranslation();
	const { translate, itemGold } = useContext(AppContext);

	const changeItem = (e) => {
		setCurrentItem(e.value);
	};

	const addItem = () => {
		let myItems = itemGold.find((i) => i.id === currentItem);
		if (currentItems.includes(myItems)) {
			// block items if more than 2 ? like ring and weapon
			// todo maybe look at base for block only if item are ring or 1h weapon ?
			// item_base.type4 = "21" => ring
			// item_base.type4 ,1-8 1 handed, 9-14 2 handed,26-29 1 handed,80-82 shield

			if (currentItems.filter((x) => x === myItems).length > 1) {
				toast.error('Item already added');
				return;
			}
		}
		let temp = [...currentItems];
		temp.push(myItems);
		setCurrentItems(temp);
	};

	const removeItem = (id) => {
		let temp = [...currentItems];
		temp.splice(
			currentItems.findIndex((i) => i.id === id),
			1
		);
		setCurrentItems([...temp]);
	};

	const findBase = (e) => {
		if (e.icon === '') return false;

		return parseInt(e.id) > 100;
	};

	return (
		<>
			<div ref={fieldRefItems} className={`text-center text-xl font-bold`}>
				{t('commons:mandatory_items')}
			</div>
			<div className="bg-[#282828] border p-2 rounded-lg shadow-lg ">
				<div className="flex flex-row items-center mb-2">
					<Select
						id="selectItems"
						className="w-1/2"
						classNamePrefix="select"
						isClearable={true}
						isSearchable={true}
						captureMenuScroll={false}
						filterOption={createFilter({ ignoreAccents: false })}
						onChange={(e) => changeItem(e)}
						options={itemGold
							.filter(findBase)
							.sort((a, b) => a?.require_level - b?.require_level)
							.map((i) => {
								return { value: i.id, label: translate(i.name), img: i.icon };
							})}
						formatOptionLabel={(item) => (
							<div className="item-option flex flex-row gap-2">
								<div>
									<img loading="lazy" src={`img/icons/${item.img}.png`} className="w-[24px] aspect-square" alt="Icon" />
								</div>
								<div>
									<span>{item.label}</span>
								</div>
							</div>
						)}
					/>
					<div title="Add item" className="hover:cursor-pointer text-3xl" onClick={() => addItem()}>
						<MdAdd />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
					{currentItems
						.filter((b) => b !== undefined)
						.map((b, ind) => (
							<div key={b.id + '-' + ind} className="flex flex-col items-center gap-2  justify-between">
								<Legendary key={b.id} legendary={b} currentAffix={null} className="h-full w-full" />
								<div
									onClick={() => removeItem(b.id)}
									className="hover:cursor-pointer w-full bg-[#282828] border rounded border-slate-500 flex flex-row items-center gap-2 justify-center"
								>
									<div>
										<FaTrash />
									</div>
									<div>{t('commons:remove')}</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default MandatoryItemsBuild;
