import React, { useContext } from 'react';
import HyperLinkTooltip from './../HyperLinkTooltip';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';
import { CraftContext } from '../../context/CraftContext';

export const BaseCardCrafting = () => {
	const { craftedItem, setCraftedItem, defaultCraftedItem } = useContext(CraftContext);
	const { t } = useTranslation();

	if (!craftedItem?.base) return;

	const removeAffix = (modType, index) => {
		if (modType === "prefix") {
			let tempPrefix = [...craftedItem.prefix];
			tempPrefix.splice(index, 1)
			setCraftedItem({
				...craftedItem,
				prefix: tempPrefix
			});
		} else if (modType === 'postfix') {
			let tempPostfix = [...craftedItem.postfix];
			tempPostfix.splice(index, 1);
			setCraftedItem({
				...craftedItem,
				postfix: tempPostfix
			});
		}
	}

	return (
		<div
			key={craftedItem?.base?.id}
			className="flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-start w-2/3"
		>
			<div className="flex flex-row gap-2 items-center relative">
				<div className="absolute top-0 right-0 hover:cursor-pointer" onClick={() => setCraftedItem(defaultCraftedItem)}>
					<img src="img/icons/ui/UI_Common_Png9_536.png" alt="Return" loading="lazy" />
				</div>
				<div className="flex min-w-[40px]">
					<img loading="lazy" src={`img/icons/${craftedItem?.base?.icon}.png`} className="w-[64px]" alt="Icon" />
				</div>
				<div className="flex flex-col">
					<div className="title pl-1">{craftedItem?.base?.name}</div>
					<div className="border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm w-auto">
						{t('commons:require_level')} {craftedItem?.base?.require_level}
					</div>
					<div className="flex flex-row gap-1">
						<div className="border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm">
							{craftedItem?.base?.description1} ({craftedItem?.base?.description2})
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
			<div>
				<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Pre-fix</div>
				{
					craftedItem?.prefix ? [1, 2, 3].map((affixIndex, index) => {
						const {prefix} = craftedItem;
						return <AffixLine 
							key={index}
							mod={prefix[index] || {index: affixIndex}}
							onClick={()=>removeAffix('prefix', index)}
						/>
					}) : null
					
				}
				<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Post-fix</div>
				{
					craftedItem?.postfix ? [1, 2, 3].map((affixIndex, index) => {
						const {postfix} = craftedItem;
						return <AffixLine
							key={index}
							mod={postfix[index] || {index: affixIndex}}
							onClick={()=>removeAffix('postfix', index)}
						/>
					}) : null
				}
			</div>
		</div>
	);
};

const AffixLine = ({mod, onClick}) => {
	return (
		<div 
			className="flex flex-row items-center gap-2 hover:line-through cursor-pointer"
			onClick={()=>onClick ? onClick(mod) : null}
		>
			<div className={`lozange t${mod?.tier || 10}`} />
			<HyperLinkTooltip str={mod?.affix || String(mod?.index)} />
		</div>
	)
}

export default React.memo(BaseCardCrafting);
