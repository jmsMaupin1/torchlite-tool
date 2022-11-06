import React, { useState, forwardRef, useImperativeHandle, useContext, useEffect } from 'react';
import HyperLinkTooltip from '../HyperLinkTooltip';
import { CraftContext } from '../../context/CraftContext';
import { MODIFIER_TYPE } from '../../constant';
import { toast } from 'react-toastify';

const SubTierAffiixCard = ({ mod, ember, setSelectedAffix }, ref) => {
	const [expand, setExpand] = useState(false);
	const [highlight, setHighlight] = useState(null);
	const { craftedItem, setCraftedItem } = useContext(CraftContext);

	useImperativeHandle(ref, () => ({
		openCollapse: () => {
			setExpand(!expand);
		},
	}));

	const onClick = (tier, key) => {
		if (ember?.modifier_type === MODIFIER_TYPE.PRE_FIX) {
			//Check if prefix is not allready in list
			//if here remove it
			if (craftedItem.prefix1 === tier) {
				setCraftedItem({ ...craftedItem, prefix1: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			} else if (craftedItem.prefix2 === tier) {
				setCraftedItem({ ...craftedItem, prefix2: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			} else if (craftedItem.prefix3 === tier) {
				setCraftedItem({ ...craftedItem, prefix3: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			}
			//else check if not full affix
			if (craftedItem.prefix1 && craftedItem.prefix2 && craftedItem.prefix3) {
				console.log('ERROR FULL');
				toast.error('ERROR FULL AFFIX');
				return;
			}
			//else check if not a blocked mod
			if (
				craftedItem?.prefix1?.exclusive_group === tier?.exclusive_group ||
				craftedItem?.prefix2?.exclusive_group === tier?.exclusive_group ||
				craftedItem?.prefix3?.exclusive_group === tier?.exclusive_group
			) {
				toast.error('ERROR BLOCKED MOD');
				console.log('ERROR BLOCKED MOD');
				return;
			}

			//then if all good add it to the first open spot
			if (!craftedItem.prefix1) {
				setCraftedItem({ ...craftedItem, prefix1: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			if (!craftedItem.prefix2) {
				setCraftedItem({ ...craftedItem, prefix2: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			if (!craftedItem.prefix3) {
				setCraftedItem({ ...craftedItem, prefix3: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			console.log('SHOULD NEVER BE HERE PREFIX');
		} else if (ember?.modifier_type === MODIFIER_TYPE.POST_FIX) {
			//Check if prefix is not allready in list
			//if here remove it
			if (craftedItem.postfix1 === tier) {
				setCraftedItem({ ...craftedItem, postfix1: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			} else if (craftedItem.postfix2 === tier) {
				setCraftedItem({ ...craftedItem, postfix2: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			} else if (craftedItem.postfix3 === tier) {
				setCraftedItem({ ...craftedItem, postfix3: null });
				setHighlight(null);
				setSelectedAffix(false);
				return;
			}
			//else check if not full affix
			if (craftedItem.postfix1 && craftedItem.postfix2 && craftedItem.postfix3) {
				toast.error('ERROR FULL AFFIX');
				console.log('ERROR FULL AFFIX');
				return;
			}
			//else check if not a blocked mod
			if (
				craftedItem?.postfix1?.exclusive_group === tier?.exclusive_group ||
				craftedItem?.postfix2?.exclusive_group === tier?.exclusive_group ||
				craftedItem?.postfix3?.exclusive_group === tier?.exclusive_group
			) {
				toast.error('ERROR BLOCKED MOD');
				console.log('ERROR BLOCKED MOD');
				return;
			}

			//then if all good add it to the first open spot
			if (!craftedItem.postfix1) {
				setCraftedItem({ ...craftedItem, postfix1: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			if (!craftedItem.postfix2) {
				setCraftedItem({ ...craftedItem, postfix2: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			if (!craftedItem.postfix3) {
				setCraftedItem({ ...craftedItem, postfix3: tier });
				setHighlight(key);
				setSelectedAffix(true);
				return;
			}

			console.log('SHOULD NEVER BE HERE POSTFIX');
		} else console.error('modifier_type ERROR', ember?.modifier_type);
	};

	// for mod with only 1 tier
	useEffect(() => {
		if (expand && mod?.tiers?.length === 1) onClick(mod?.tiers[0], 1);
	}, [expand]);

	if (!expand || mod?.tiers?.length === 1) return null;

	return (
		<>
			{mod?.tiers?.map((tier, key) => {
				//if ilvl < required_level
				if (craftedItem?.ilvl && craftedItem?.ilvl < tier?.required_level)
					return (
						<tr
							key={key}
							onClick={() => toast.error('ITEM LEVEL TOO LOW')}
							className={`text-right w-full p-1 ${highlight === key ? 'bg-[#FFF9E0]' : 'bg-[#333333] hover:bg-[#AAA]'}`}
						>
							<td className="text-left gap-2 m-1 pl-2">
								<HyperLinkTooltip str={tier?.affix} className={'text-decoration-line: line-through'} />
							</td>
							<td className={`px-2 text-decoration-line: line-through`}>{tier?.tier}</td>
							<td className={`px-2 text-decoration-line: line-through`}>{tier?.required_level}</td>
							<td className={`px-2 text-decoration-line: line-through`}>{tier?.weight}</td>
							<td className={`px-2 text-decoration-line: line-through`}>{((tier.weight * 100) / ember.weight).toFixed(2)}</td>
						</tr>
					);

				const TEXT_COLOR = highlight === key ? 'text-[#000]' : 'text-[#fff]';
				return (
					<tr
						key={key}
						onClick={() => onClick(tier, key)}
						className={`text-right w-full p-1 ${highlight === key ? 'bg-[#FFF9E0]' : 'bg-[#333333] hover:bg-[#AAA]'}`}
					>
						<td className="text-left gap-2 m-1 pl-2">
							<HyperLinkTooltip str={tier?.affix} className={TEXT_COLOR} />
						</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.tier}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.required_level}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.weight}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{((tier.weight * 100) / ember.weight).toFixed(2)}</td>
					</tr>
				);
			})}
		</>
	);
};

export default forwardRef(SubTierAffiixCard);
