import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import SelectBase from '../components/craft/SelectBase';
import BaseCard from '../components/base/BaseCard';
import EmberCardNew from '../components/craft/EmberCardNew';
import { updateEmberWeightsAndAffix } from '../utils/utils';

function Craft() {
	const { embers } = useContext(AppContext);
	const [currentBase, setCurrentBase] = useState(null);
	const [currentILevel, setCurrentILevel] = useState(null);

	const filterEmbers = base => {
		if (!base)
			return embers

		const sortKey = key => {
			if (key.toLowerCase().indexOf('lesser') > -1)
				return 0
			else if (key.toLowerCase().indexOf('greater') > -1)
				return 1
			else if (key.toLowerCase().indexOf('special') > -1)
				return 2
			else
				return 3
		}

		let filteredEmbers = []
		
		for (const e in embers) {
			// get all mods that apply to the currently selected baseType
			let modKeys = Object.keys(embers[e].mods).filter(ek => embers[e].mods[ek].type4 === base.type4)

			if (modKeys.length > 0) {
				const mods = modKeys.reduce((mods, key) => {
					mods[key] = embers[e].mods[key]
					return mods
				}, {})

				let updatedEmber = updateEmberWeightsAndAffix({...embers[e], mods})
				// console.log(updatedEmber)
				// when implementing iLevel we will need to make a filter pass through the tiers
				// of each of these mods as well to remove any we cant hit.
				filteredEmbers.push(updatedEmber)
			}
		}

		console.log(filteredEmbers);
		return filteredEmbers.sort((a, b) => sortKey(a.description1) - sortKey(b.description1))
	}
	// mod "modifier_type": "3" => prefix
	// mod "modifier_type": "4" => suffix

	return (
		<>
			{!currentBase &&
				<div className="flex flex-row justify-center gap-2">
					<div className="flex flex-col gap-2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<SelectBase onSelect={setCurrentBase}/>
					</div>
				</div>
			}
			{currentBase &&
				<div className="flex flex-row justify-between gap-2">
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<BaseCard 
							setCurrentILevel={setCurrentILevel}
							currentILevel={currentILevel}
							setCurrentBase={setCurrentBase}
							currentBase={currentBase} 
							cardData={currentBase} 
							showAffix={true}
						/>
					</div>
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select an Ember</div>
						{embers ? filterEmbers(currentBase).map(ember => (
							<EmberCardNew key={ember.id} ember={ember} selectedBase={currentBase} />
						)) : null}
					</div>
				</div>
			}
				{/* <div className="flex flex-col gap-2 basis-1/2 p-2">
					<div className="flex flex-row justify-between title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">
						<div>Ember list</div>
						<div className="flex flex-row items-center gap-1">
							<label>Show only T1</label>
							<DebounceInput
								type="checkbox"
								className="bg-[#282828] border rounded border-slate-500"
								debounceTimeout={500}
								checked={showOnlyT1}
								onChange={(event) => setShowOnlyT1(!showOnlyT1)}
							/>
						</div>
					</div> */}
					{/* {itemBase
						.filter((e) => e.type1 === '15' && e.name !== translate(e.name))
						.map((ember) => (
							<EmberCard
								showOnlyT1={showOnlyT1}
								key={ember.id}
								ember={ember}
								currentILevel={currentILevel}
								currentBase={currentBase}
							/>
						))} */}
				{/* </div> */}
		</>
	);
}
export default Craft;
