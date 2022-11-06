import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { updateEmberWeightsAndAffix } from '../utils/utils';
import { AppContext } from './AppContext';

const CraftContext = createContext(null);

const CraftContextProvider = (props) => {
	const { embers } = useContext(AppContext);
	const defaultCraftedItem = {
		base: null,
		ilvl: null,
		prefix: [],
		postfix:[]
	};
	const [craftedItem, setCraftedItem] = useState({
		base: null,
		ilvl: null,
		prefix: [],
		postfix:[],
	});
	const [filteredEmbers, setFilteredEmbers] = useState(null);

	

	const filterEmbers = useCallback(
		(base) => {
			if (!base) return embers;

			const sortKey = (key) => {
				if (key.toLowerCase().indexOf('lesser') > -1) return 0;
				else if (key.toLowerCase().indexOf('greater') > -1) return 1;
				else if (key.toLowerCase().indexOf('special') > -1) return 2;
				else return 3;
			};

			let filteredEmbers = [];

			for (const e in embers) {
				// get all mods that apply to the currently selected baseType
				let modKeys = Object.keys(embers[e].mods).filter((ek) => embers[e].mods[ek].type4 === base.type4);

				if (modKeys.length > 0) {
					const mods = modKeys.reduce((mods, key) => {
						mods[key] = embers[e].mods[key];
						return mods;
					}, {});

					let updatedEmber = updateEmberWeightsAndAffix({ ...embers[e], mods });
					// when implementing iLevel we will need to make a filter pass through the tiers
					// of each of these mods as well to remove any we cant hit.
					filteredEmbers.push(updatedEmber);
				}
			}

			return filteredEmbers.sort((a, b) => sortKey(a.description1) - sortKey(b.description1));
		},
		[embers]
	);
	// mod "modifier_type": "3" => prefix
	// mod "modifier_type": "4" => suffix

	// compute new filtered ember list when base change
	useEffect(() => {
		if (craftedItem?.base) setFilteredEmbers(filterEmbers(craftedItem.base));
		else setFilteredEmbers(null);
	}, [craftedItem?.base, filterEmbers]);

	console.log('craftedItem', craftedItem);

	return (
		<CraftContext.Provider
			value={{
				craftedItem,
				defaultCraftedItem,
				setCraftedItem,
				filteredEmbers,
			}}
		>
			{props.children}
		</CraftContext.Provider>
	);
};
export { CraftContextProvider, CraftContext };
