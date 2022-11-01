import React, { useRef, useState } from 'react';
import HyperLinkTooltip from '../HyperLinkTooltip';
import SubTierAffiixCard from './SubTierAffiixCard';

const A = './img/icons/ui/UI_Reward_Xiala02.png';
const V = './img/icons/ui/UI_Reward_Xiala.png';

export default function EmberCardNew({ ember, selectedBase }) {
	const [expand, setExpand] = useState(false);

	return (
		<div className="hover:bg-[#3A353D] bg-[#000] rounded mb-3">
			<>
				<table className="w-full">
					<thead>
						<tr className={'w-full'} onClick={() => setExpand(!expand)}>
							<th className={'w-2/3'}>
								<div className={'flex flex-row items-center'}>
									<div className="mr-3 pl-2">{expand ? <img src={A} alt="A" /> : <img src={V} alt="V" />}</div>
									<img className="h-11 aspect-square" src={`img/icons/${ember.icon}.png`} alt={`${ember?.name}'s icon`} />
									<div className="text-xl">{ember?.name}</div>
								</div>
							</th>
							<th className={'px-2'}>Tiers</th>
							<th className={'px-2'}>iLvl</th>
							<th className={'px-2'}>Weight</th>
							<th className={'px-2'}>Hit%</th>
						</tr>
					</thead>
					{expand && (
						<tbody>
							{Object.values(ember?.mods).map((mod, key) => {
								return <EmberAffix key={key} ember={ember} mod={mod} index={key} />;
							})}
						</tbody>
					)}
				</table>
			</>
		</div>
	);
}

const EmberAffix = ({ mod, ember, index }) => {
	const ref = useRef(null);
	const [selectedAffix, setSelectedAffix] = useState(false);

	const onClick = () => {
		if (ref?.current?.openCollapse) ref.current.openCollapse();
	};

	return (
		<>
			<tr onClick={onClick} className={`text-right w-full p-1 hover:bg-[#AAA] ${index % 2 === 0 ? 'bg-[#555555]' : 'bg-[#444444]'}`}>
				<td className={`text-left gap-2 m-1 pl-2 ${selectedAffix && 'title'}`}>
					<HyperLinkTooltip str={mod?.affix} />
				</td>
				<td className={'px-2'}>{mod?.tiers?.length}</td>
				<td className={'px-2'}>{mod?.tiers[mod?.tiers.length - 1]?.required_level}</td>
				<td className={'px-2'}>{mod?.weight}</td>
				<td className={'px-2'}>{((mod.weight * 100) / ember.weight).toFixed(2)}</td>
			</tr>
			<SubTierAffiixCard ref={ref} mod={mod} ember={ember} setSelectedAffix={setSelectedAffix} />
		</>
	);
};
