import { AppContext } from '../context/AppContext';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import EmberCard from '../components/craft/EmberCard';

function Craft() {
	const { translate, modifiers, dataI18n, itemBase, i18n, replaceTag } = useContext(AppContext);
	const { t } = useTranslation();

	const [currentType, setCurrentType] = useState('');
	const [currentSubType, setCurrentSubType] = useState('');

	if (itemBase === null || dataI18n === null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	// mod "modifier_type": "3" => prefix
	// mod "modifier_type": "4" => suffix
	//type2 :
	// 1 => armes
	// 2 => armor
	// 3 => offhand
	// 4 => accessories
	// type4 if type2 = 1 => weapon|des|80

	return (
		<>
			<div className="flex flex-row justify-between gap-2">
				<div className="flex flex-row gap-2 select-base basis-1/2">
					<div>
						Select type
						<select
							value={currentType}
							className="w-auto bg-[#282828] border rounded border-slate-500"
							onChange={(e) => setCurrentType(e.target.value)}
						>
							<option value="">Select type</option>
							<option value="1">{t('commons:Weapon')}</option>
							<option value="2">{t('commons:Armor')}</option>
							<option value="3">{t('commons:Offhand')}</option>
							<option value="4">{t('commons:Accessories')}</option>
						</select>
					</div>
					<div>
						Select sub type
						<select
							value={currentSubType}
							className="w-auto bg-[#282828] border rounded border-slate-500"
							onChange={(e) => setCurrentSubType(e.target.value)}
						>
							<option value="">Select sub type</option>
							<option value="1">one handed hammer</option>
							<option value="2">one handed sword</option>
							<option value="3">pistol</option>
							<option value="4">crossbow</option>
							<option value="5">cane</option>
							<option value="8">dagger</option>
							<option value="9">claw</option>
							<option value="10">one handed axe</option>
							<option value="11">shield</option>
							<option value="12">gloves</option>
							<option value="13">Shoes</option>
							<option value="14">Chest armor</option>
							<option value="15">Head</option>
							<option value="16">Necklace</option>
							<option value="17">Belt</option>
							<option value="18">Rings</option>
						</select>
					</div>
				</div>
				<div className="flex flex-col gap-2 basis-1/2">
					{itemBase
						.filter((e) => e.type1 === '15' && e.name !== translate(e.name))
						.map((ember) => (
							<EmberCard key={ember.id} ember={ember} />
						))}
				</div>
			</div>
			{/* <div className="grid grid-cols-1 gap-2">
				{itemBase
					.filter((e) => e.type1 === '15' && e.name !== translate(e.name) && e.id === '200019')
					.map((ember) => (
						<div className="shadow-sm border rounded p-2">
							<div className="flex flex-row items-center gap-2">
								<img className="h-20 aspect-square" src={`img/icons/${ember.icon}.png`} loading="lazy" alt="Ember" />
								<div>
									{translate(ember.name)} {ember.id}
								</div>
							</div>
							<div>{translate(ember.description1)}</div>
							<div>{translate(ember.description2)}</div>
							<div className="flex flex-col items-center gap-2">
								{modifiers
									.filter((m) => m.Ashes === ember.id && m.tier === '1' && ember.id === '200019')
									.map((mod) => (
										<div className="flex items-center flex-row border w-full gap-2 bg-[#222] shadow-lg shadow-black rounded">
											<div className="text-[#f67370] border rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
												T1
											</div>
											{mod.affix.map((a) => (
												<div dangerouslySetInnerHTML={{ __html: replaceTag(a) }}></div>
											))}
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
									))}
							</div>
						</div>
					))}
			</div> */}
		</>
	);
}
export default Craft;
