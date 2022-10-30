import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import EmberCard from '../components/craft/EmberCard';
import SelectBase from '../components/craft/SelectBase';
import BaseCard from '../components/base/BaseCard';
import { DebounceInput } from 'react-debounce-input';

function Craft() {
	const [currentBase, setCurrentBase] = useState(null);
	const [currentILevel, setCurrentILevel] = useState(null);

	// mod "modifier_type": "3" => prefix
	// mod "modifier_type": "4" => suffix

	return (
		<>
			{!currentBase &&
				<div className="flex flex-row justify-center gap-2">
					<div className="flex flex-col gap-2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<SelectBase onSelect={setCurrentBase}/>
					</div>
				</div>
			}
			{currentBase &&
				<div className="flex flex-row justify-between gap-2">
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select Base to craft</div>
						<BaseCard 
							setCurrentILevel={setCurrentILevel}
							currentILevel={currentILevel}
							setCurrentBase={setCurrentBase}
							currentBase={currentBase} 
							cardData={currentBase} 
							showAffix={true}
						/>
					</div>
					<div className="flex flex-col gap-2 basis-1/2 p-2">
						<div className="title p-2 bg-gradient-to-r from-[#111827] to-transparent rounded">Select an Ember</div>
					</div>
				</div>
					

			}
				{/* <div className="flex flex-col gap-2 basis-1/2 p-2">
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
					</div> */}
					{/* {itemBase
						.filter((e) => e.type1 === '15' && e.name !== translate(e.name))
						.map((ember) => (
							<EmberCard
								showOnlyT1={showOnlyT1}
								key={ember.id}
								ember={ember}
								currentILevel={currentILevel}
								currentBase={currentBase}
							/>
						))} */}
				{/* </div> */}
		</>
	);
}
export default Craft;
