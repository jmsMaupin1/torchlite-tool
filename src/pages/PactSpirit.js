import pactSpirit from './../data/servant.json';
import contract from './../data/gen_contract_servant.json';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
function PactSpirit() {
	const { translate, en } = useContext(AppContext);
	//state
	const [currentRarity, setCurrentRarity] = useState(null);
	const [currentType, setCurrentType] = useState(null);

	const getRarity = (rarity) => {
		switch (rarity) {
			case '2':
				return 'Magic';
			case '3':
				return 'Rare';
			case '100':
				return 'Legendary';
			default:
				return rarity;
		}
	};
	const getType = (type) => {
		switch (type) {
			case '1':
				return 'Attack';
			case '2':
				return 'Spell';
			case '3':
				return 'Persistent';
			case '4':
				return 'Summon';
			case '5':
				return 'Survival';
			case '6':
				return 'Drop';
			case '100':
				return 'Legendary';
			default:
				return type;
		}
	};

	if (en === null) {
		return;
	}

	return (
		<div className="grid grid-cols-5 gap-2">
			{pactSpirit
				.sort((a, b) => a.rarity - b.rarity)
				.map((p) => (
					<div className="bg-[#282828] flex flex-col gap-2 border rounded-md p-2">
						<div className="flex flex-row items-center">
							<div>
								<img
									loading="lazy"
									className="h-20"
									src={`img/icons/PetIcons/${p.icon_small}.png`}
									alt="Icons"
								/>
							</div>
							<div className="title">{translate(p.name)}</div>
						</div>
						<div>Rarity : {getRarity(p.rarity)}</div>
						<div>Type : {getType(p.type)}</div>
						<div>{translate(p.des_effect)}</div>
						<div
							className="text-center"
							dangerouslySetInnerHTML={{ __html: translate(p.des_promotion).split('|').join('<br>') }}
						></div>

						<div className="flex flex-row flex-wrap border-red border">
							{contract
								.filter((c) => c.ServantId === p.id && c.StarLevel === '0')
								.map((con) => (
									<div>
										<div>Contrat : {con.ContractPointAffix}</div>
										<div>Affix : {con.ServantAffix}</div>
										<div>StartLevel : {con.StarLevel}</div>
									</div>
								))}
						</div>
						<div className="flex flex-row flex-wrap">
							{p.information_point_icon.split(';').map((point, index) => (
								<div className="flex flex-col">
									<div>
										<img
											src={`img/icons/PetIcons/contract/${point.split(':')[1]}.png`}
											alt="Contract"
										/>
									</div>
									<div className="flex flex-col">{p.transformation.split('||')[index]}</div>
								</div>
							))}
						</div>
					</div>
				))}
		</div>
	);
}
export default PactSpirit;
