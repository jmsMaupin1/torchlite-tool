import { createContext, useState, useEffect } from 'react';

const CraftContext = createContext(null);

const CraftContextProvider = (props) => {
	const [craftedItem, setCraftedItem] = useState({
		base: null,
		ilvl: null,
		prefix1: null,
		prefix2: null,
		prefix3: null,
		postfix1: null,
		postfix2: null,
		postfix3: null,
	});

	console.log('craftedItem', craftedItem);

	return (
		<CraftContext.Provider
			value={{
				craftedItem,
				setCraftedItem,
			}}
		>
			{props.children}
		</CraftContext.Provider>
	);
};
export { CraftContextProvider, CraftContext };
