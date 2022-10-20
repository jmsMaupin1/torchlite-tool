import dropBase from './../data/drop_base.json';
import dropGroup from './../data/drop_group.json';
import dropParament from './../data/drop_parament.json';
import itemBase from './../data/item_base.json';
import itemGold from './../data/item_gold.json';

import { AppContext } from '../context/AppContext';
import { useContext, useState } from 'react';
import Legendary from '../components/Legendary';

function Drop() {
	const { translate, dataI18n } = useContext(AppContext);
	const [currentParament, setCurrentParament] = useState(null);
	//baseId = 1001-1023
	const getBase = (baseId) => {
		let start = parseInt(baseId.split('-')[0]);
		let end = baseId.split('-')[1];
		if (end === undefined) {
			end = start;
		} else {
			end = parseInt(end);
		}

		let tabItem = [];
		for (let i = start; i <= end; i++) {
			let myDropBase = dropBase.find((d) => d.id === i.toString());
			if (myDropBase !== undefined) {
				let myItem = itemBase.find((item) => item.id === myDropBase.item_id);
				if (myItem !== undefined) {
					tabItem.push(
						<div>
							<div>{translate(myItem.name)}</div>
							<div>{translate(myItem.description1)}</div>
							<div>{translate(myItem.description2)}</div>
						</div>
					);
				} else {
					let myItemGold = itemGold.find((item) => item.id === myDropBase.item_id);
					if (myItemGold !== undefined) {
						tabItem.push(<Legendary legendary={myItemGold} />);
					}
				}
			}
		}

		return tabItem;
	};
	const onChangeParament = (parament) => {
		if (parament !== '') {
			setCurrentParament(parament.target.value);
		} else {
			setCurrentParament(null);
		}
	};
	if (dataI18n === null) {
		return null;
	}
	return (
		<>
			<select onChange={onChangeParament} className="w-auto bg-[#282828] border rounded border-slate-500">
				<option value="">Select</option>
				{dropParament
					.filter((d) => dropGroup.find((dg) => dg.parament === d.id) !== undefined)
					.map((d) => (
						<option key={d.id} value={d.id}>
							{d.enum}
						</option>
					))}
			</select>
			<div className="grid grid-cols-3 gap-2">
				{dropGroup
					.filter((d) => currentParament === null || d.parament === currentParament)
					.map((drop) => (
						<div key={drop.group_id} className="bg-slate-800 rounded p-2">
							<div>Base : {drop.base_id}</div>
							<div>{drop.parament}</div>
							<div>{drop.des}</div>
							<div className="grid grid-cols-2">
								{getBase(drop.base_id).map((e, ind) => (
									<div key={ind} className="flex flex-row gap-2 border border-slate-900">
										{e}
									</div>
								))}
							</div>
						</div>
					))}
			</div>
		</>
	);
}
export default Drop;
