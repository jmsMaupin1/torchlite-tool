import { useContext } from 'react';
import SelectBase from '../components/craft/SelectBase';
import EmberCardNew from '../components/craft/EmberCardNew';
import { MODIFIER_TYPE } from '../constant';
import { BaseCardCrafting } from '../components/craft/BaseCardCrafting';
import { CraftContext } from '../context/CraftContext';

const Craft = () => {
	const { craftedItem, setCraftedItem, filteredEmbers } = useContext(CraftContext);

	return (
		<>
			{!filteredEmbers ? (
				<div className="flex flex-row justify-center gap-2">
					<div className="flex flex-col gap-2 p-2 flex-1">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<SelectBase onSelect={(base) => setCraftedItem({ ...craftedItem, base })} />
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Base to craft</div>
						<BaseCardCrafting />
					</div>
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="flex flex-col lg:flex-row justify-between gap-2">
							<div className="flex flex-col flex-1 mb-2">
								<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded mb-2">Pre-Fix</div>
								{filteredEmbers?.map(
									(ember, key) =>
										ember?.modifier_type === MODIFIER_TYPE.PRE_FIX && <EmberCardNew key={key} ember={ember} />
								)}
							</div>
							<div className="px-3" />
							<div className="flex flex-col flex-1">
								<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded mb-2">Post-Fix</div>
								{filteredEmbers?.map(
									(ember, key) =>
										ember?.modifier_type === MODIFIER_TYPE.POST_FIX && <EmberCardNew key={key} ember={ember} />
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
