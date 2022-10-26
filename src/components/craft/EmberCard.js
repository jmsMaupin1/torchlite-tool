import { AppContext } from '../../context/AppContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';

function EmberCard({ ember }) {
	const { translate, modifiers, dataI18n, itemBase, replaceTag } = useContext(AppContext);
	const { t } = useTranslation();

	const [showMod, setShowMod] = useState(false);
	const [currentType, setCurrentType] = useState('');
	const [currentSubType, setCurrentSubType] = useState('');

	if (itemBase === null || dataI18n === null || modifiers === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	return (
		<div className="bg-[#222] shadow-lg shadow-black border rounded px-2">
			<div className="flex flex-col items-center gap-2 w-full ">
				<div className="flex flex-row items-center gap-2 justify-between w-full">
					<div className="flex flex-row gap-2 items-center">
						<img className="h-10 aspect-square" src={`img/icons/${ember.icon}.png`} loading="lazy" alt="Ember" />
						<div>
							{translate(ember.name)} {ember.id}
						</div>
					</div>
					<div className="hover:cursor-pointer" onClick={() => setShowMod(!showMod)}>
						V
					</div>
				</div>
				<div className={`flex flex-col items-center gap-2 ${!showMod ? 'hidden' : ''}`}>
					{modifiers
						.filter((m) => m.Ashes === ember.id && m.tier === '1' && m.type1 === '1')
						.map((mod) => (
							<div
								key={mod.id}
								className="flex items-center justify-between flex-row border w-full gap-2 bg-[#222] shadow-lg shadow-black rounded"
							>
								<div className="flex flex-row">
									<div className="text-[#f67370] border rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
										T1
									</div>
									{mod.affix.map((a, ind) => (
										<div key={ind} dangerouslySetInnerHTML={{ __html: replaceTag(a) }}></div>
									))}
								</div>
								<div className="flex flex-row">
									<div>Lvl {mod.forge_level}</div>
									<div>W {mod.forge_weight}</div>
									<div className="flex flex-col items-center border">
										<div>Typ1</div>
										<div>{mod.type1}</div>
									</div>
									<div className="flex flex-col items-center border">
										<div>Typ2</div>
										<div>{mod.type2}</div>
									</div>
									<div className="flex flex-col items-center border">
										<div>Typ3</div>
										<div>{mod.type3}</div>
									</div>
									<div className="flex flex-col items-center border">
										<div>Typ4</div>
										<div>{mod.type4}</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
export default EmberCard;
