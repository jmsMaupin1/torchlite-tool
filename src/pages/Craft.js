import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import EmberCard from '../components/craft/EmberCard';
import SelectBase from '../components/craft/SelectBase';
import { DebounceInput } from 'react-debounce-input';

function Craft() {
	const { translate, modifiers, dataI18n, itemBase, i18n, replaceTag } = useContext(AppContext);
	const { t } = useTranslation();

	const [currentType, setCurrentType] = useState('');
	const [currentSubType, setCurrentSubType] = useState('');
	const [currentWeaponType, setCurrentWeaponType] = useState('');
	const [currentBase, setCurrentBase] = useState(null);
	const [currentILevel, setCurrentILevel] = useState(null);
	const [showOnlyT1, setShowOnlyT1] = useState(true);

	// useEffect(() => {
	// 	console.log('currentType', currentType);
	// 	console.log('currentSubType', currentSubType);
	// 	console.log('currentWeaponType', currentWeaponType);
	// }, [currentSubType, currentType, currentWeaponType]);

	// useEffect(() => {
	// 	console.log('currentBase', currentBase);
	// 	console.log('showOnlyT1', showOnlyT1);
	// }, [currentBase, showOnlyT1]);

	const _setCurrentBase = (id) => {
		if (id === null) {
			setCurrentBase(null);
		} else {
			setCurrentBase(itemBase.find((base) => base.id === id));
		}
	};
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
				<div className="flex flex-col gap-2 basis-1/2  p-2">
					<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
					<SelectBase
						currentILevel={currentILevel}
						setCurrentILevel={setCurrentILevel}
						currentBase={currentBase}
						setCurrentBase={_setCurrentBase}
					/>
				</div>
				<div className="flex flex-col gap-2 basis-1/2 p-2">
					<div className="flex flex-row justify-between title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">
						<div>Ember list</div>
						<div className="flex flex-row items-center gap-1">
							<label>Show only T1</label>
							<DebounceInput
								type="checkbox"
								className="bg-[#282828] border rounded border-slate-500"
								debounceTimeout={500}
								checked={showOnlyT1}
								onChange={(event) => setShowOnlyT1(!showOnlyT1)}
							/>
						</div>
					</div>
					{itemBase
						.filter((e) => e.type1 === '15' && e.name !== translate(e.name))
						.map((ember) => (
							<EmberCard
								showOnlyT1={showOnlyT1}
								key={ember.id}
								ember={ember}
								currentILevel={currentILevel}
								currentBase={currentBase}
							/>
						))}
				</div>
			</div>
		</>
	);
}
export default Craft;
