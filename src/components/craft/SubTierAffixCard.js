import React, { useState, forwardRef, useImperativeHandle, useContext, useEffect } from 'react';
import HyperLinkTooltip from '../HyperLinkTooltip';
import { CraftContext } from '../../context/CraftContext';
import { MODIFIER_TYPE } from '../../constant';
import { toast } from 'react-toastify';

const SubTierAffiixCard = ({ mod, ember }, ref) => {
	const [expand, setExpand] = useState(false);
	const [highlight, setHighlight] = useState(null);
	const { craftedItem, setCraftedItem } = useContext(CraftContext);

	useImperativeHandle(ref, () => ({
		openCollapse: () => {
			setExpand(!expand);
		},
	}));

	const isExcluded = ({exclusive_group}) => {
		let exclusionGroups = [...craftedItem.prefix, ...craftedItem.postfix].map(affix => {
			return affix.exclusive_group;
		});

		return exclusionGroups.indexOf(exclusive_group) > -1;
	}

	const onClick = (tier) => {
		if (!isExcluded(tier)) {
			if (ember?.modifier_type === MODIFIER_TYPE.PRE_FIX) {
				if (craftedItem.prefix.length >= 3) {
					toast.error('ERROR: PREFIXES FULL');
					return;
				}

				setCraftedItem({...craftedItem, prefix: [...craftedItem.prefix, tier]})
			} else if (ember?.modifier_type === MODIFIER_TYPE.POST_FIX){
				if (craftedItem.postfix.length >= 3) {
					toast.error('ERROR: POSTFIXES FULL');
					return;
				}

				setCraftedItem({...craftedItem, postfix: [...craftedItem.postfix, tier]})
			} else {
				console.log("modifer_type error", tier)
			}
		} else {
			toast.error('ERROR: SORRY MOD IS BLOCKED')
		}
	}

	// for mod with only 1 tier
	useEffect(() => {
		if (expand && mod?.tiers?.length === 1) onClick(mod?.tiers[0]);
	}, [expand]);

	if (!expand || mod?.tiers?.length === 1) return null;

    return (
        <>
            {mod?.tiers?.map((tier, key) => {
                const TEXT_COLOR = highlight === key ? 'text-[#000]' : 'text-[#fff]',
                      BG_COLOR = highlight === key ? 'bg-[#FFF9E0]' : 'bg-[#333333] hover:bg-[#AAA]';

                return (
                    <tr
						key={key}
						onClick={() => onClick(tier, key)}
						className={`text-right w-full p-1 cursor-pointer ${BG_COLOR} ${isExcluded(tier) && 'line-through'}`}
					>
						<td className="text-left gap-2 m-1 pl-2">
							<HyperLinkTooltip str={tier?.affix} className={TEXT_COLOR} />
						</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.tier}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.required_level}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{tier?.weight}</td>
						<td className={`px-2 ${TEXT_COLOR}`}>{((tier.weight * 100) / ember.weight).toFixed(2)}</td>
					</tr>
                )
            })}
        </>
    )
}

export default forwardRef(SubTierAffiixCard);
