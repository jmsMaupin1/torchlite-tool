import { AppContext } from '../context/AppContext';
import { useCallback, useContext, useState } from 'react';
import SelectBase from '../components/craft/SelectBase';
import BaseCard from '../components/base/BaseCard';
import EmberCardNew from '../components/craft/EmberCardNew';
import { updateEmberWeightsAndAffix } from '../utils/utils';
import { MODIFIER_TYPE } from '../constant';

const Craft = () => {
	const { embers } = useContext(AppContext);
	const [currentBase, setCurrentBase] = useState(null);
	const [currentILevel, setCurrentILevel] = useState(null);

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
					// console.log(updatedEmber)
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

	return (
		<>
			{!currentBase ? (
				<div className="flex flex-row justify-center gap-2">
					<div className="flex flex-col gap-2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<SelectBase onSelect={setCurrentBase} />
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Base to craft</div>
						<BaseCard
							setCurrentILevel={setCurrentILevel}
							currentILevel={currentILevel}
							setCurrentBase={setCurrentBase}
							currentBase={currentBase}
							cardData={currentBase}
							showAffix
						/>
					</div>
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="flex flex-col lg:flex-row justify-between gap-2">
							<div className="flex flex-col flex-1 mb-2">
								<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded mb-2">Pre-Fix</div>
								{filterEmbers(currentBase).map(
									(ember, key) =>
										ember?.modifier_type === MODIFIER_TYPE.PRE_FIX && (
											<EmberCardNew key={key} ember={ember} selectedBase={currentBase} />
										)
								)}
							</div>
							<div className="px-3" />
							<div className="flex flex-col flex-1">
								<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded mb-2">Post-Fix</div>
								{filterEmbers(currentBase).map(
									(ember, key) =>
										ember?.modifier_type === MODIFIER_TYPE.POST_FIX && (
											<EmberCardNew key={key} ember={ember} selectedBase={currentBase} />
										)
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Craft;
