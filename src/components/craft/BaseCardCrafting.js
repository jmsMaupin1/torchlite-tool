import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HyperLinkTooltip from './../HyperLinkTooltip';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';
import { CraftContext } from '../../context/CraftContext';

export const BaseCardCrafting = () => {
	const { translate } = useContext(AppContext);
	const { craftedItem, setCraftedItem } = useContext(CraftContext);
	const { t } = useTranslation();

	if (!craftedItem?.base) return;

	return (
		<div
			key={craftedItem?.base?.id}
			className="flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-start w-2/3"
		>
			<div className="flex flex-row gap-2 items-center relative">
				<div className="absolute top-0 right-0 hover:cursor-pointer" onClick={() => setCraftedItem(null)}>
					<img src="img/icons/ui/UI_Common_Png9_536.png" alt="Return" loading="lazy" />
				</div>
				<div className="flex min-w-[40px]">
					<img loading="lazy" src={`img/icons/${craftedItem?.base?.icon}.png`} className="w-[64px]" alt="Icon" />
				</div>
				<div className="flex flex-col">
					<div className="title pl-1">{translate(craftedItem?.base?.name)}</div>
					<div className="border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm w-auto">
						{t('commons:require_level')} {craftedItem?.base?.require_level}
					</div>
					<div className="flex flex-row gap-1">
						<div className="border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm">
							{translate(craftedItem?.base?.description1)} ({translate(craftedItem?.base?.description2)})
						</div>
					</div>
				</div>
				<div className="flex flex-col ml-5">
					<label className="text-[#bfbfbf] text-sm w-auto">{'ILevel'}</label>
					<DebounceInput
						value={craftedItem?.ilvl}
						className="w-20 bg-[#282828] border rounded border-slate-500"
						placeholder="ILevel"
						debounceTimeout={500}
						onChange={(event) => setCraftedItem({ ...craftedItem, ilvl: event.target.value })}
					/>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Pre-fix</div>
				<AffixLine modifierType={'prefix'} affixNumber={'1'} />
				<AffixLine modifierType={'prefix'} affixNumber={'2'} />
				<AffixLine modifierType={'prefix'} affixNumber={'3'} />
				<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Post-fix</div>
				<AffixLine modifierType={'postfix'} affixNumber={'1'} />
				<AffixLine modifierType={'postfix'} affixNumber={'2'} />
				<AffixLine modifierType={'postfix'} affixNumber={'3'} />
			</div>
		</div>
	);
};

const AffixLine = ({ modifierType, affixNumber }) => {
	const { craftedItem } = useContext(CraftContext);
	const affixName = modifierType + affixNumber;

	return (
		<div className="flex flex-row items-center gap-2">
			<div className={`lozange t${craftedItem?.[affixName]?.tier}`} />
			<HyperLinkTooltip
				str={craftedItem?.[affixName]?.affix || affixNumber}
				className={`${
					craftedItem?.ilvl &&
					craftedItem?.ilvl < craftedItem?.[affixName]?.required_level &&
					'text-decoration-line: line-through'
				}`}
			/>
		</div>
	);
};

export default React.memo(BaseCardCrafting);
