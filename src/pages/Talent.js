import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { DebounceInput } from 'react-debounce-input';
import Loader from '../components/Loader';
import HyperLinkTooltip from '../components/HyperLinkTooltip';

function Talent() {
	const { translate, profession, talent, en, replaceTag } = useContext(AppContext);
	const [currentClass, setCurrentClass] = useState(null);
	const [currentSearch, setCurrentSearch] = useState(null);

	const displayCore = (_currentProf) => {
		let talentId = _currentProf.talent_id.split('|');
		let startId = talentId[0];
		let endId = talentId[1];
		let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId && t.position === '0|0');
		return currentTalent;
	};
	const onChangeClass = (e) => {
		if (e.target.value === '') {
			setCurrentClass(null);
		} else {
			setCurrentClass(e.target.value);
		}
	};
	const onChangeSearch = (value) => {
		if (value !== '') {
			setCurrentSearch(value);
		} else {
			setCurrentSearch(null);
		}
	};
	const filterAffix = (tree) => {
		if (currentSearch == null) {
			return true;
		} else {
			let isFind = false;
			// eslint-disable-next-line
			tree.affix.map((affix) => {
				if (replaceTag(affix).toLowerCase().includes(currentSearch.toLowerCase())) {
					isFind = true;
				}
			});
			return isFind;
		}
	};
	if (profession == null || en == null || talent == null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className="flex flex-col container p-2">
			<div className="md:hidden title text-xl px-2 mb-2 text-center border-b border-slate-500">Talent</div>
			<div className="flex flex-row items-center gap-2 mb-2">
				<label>Select class</label>
				<select onChange={onChangeClass} className="w-auto bg-[#282828] border rounded border-slate-500">
					<option value=""> -- Select Class --</option>
					{profession
						.filter((p) => p.before_id === '0')
						.map((p) => (
							<option key={p.id} value={p.id}>
								{translate(p.name)}
							</option>
						))}
				</select>
				<label>Effect</label>
				<DebounceInput
					className="w-auto bg-[#282828] border rounded border-slate-500"
					placeholder="Search talent by effect..."
					debounceTimeout={500}
					onChange={(event) => onChangeSearch(event.target.value)}
				/>
			</div>
			{profession
				.filter((e) => e.id === currentClass || e.before_id === currentClass || currentClass == null)
				.map((subp) =>
					displayCore(subp).filter(filterAffix).length !== 0 ? (
						<div key={subp.id} className={`subProf-${subp.id} flex flex-col md:flex-row mb-2 w-full`}>
							<div
								className={`bg-[#282828] w-full relative flex flex-col md:flex-row justify-between border p-2 rounded-lg md:shadow-lg md:shadow-black bg-no-repeat bg-contain bg-right-top`}
								style={{
									backgroundImage: `url("img/icons/TalentGodsIcon/${
										subp.background.split('|')[0]
									}.png")`,
								}}
							>
								<div className="flex flex-col items-center w-full md:w-1/5">
									<div className="text-center font-bold text-xl title">{translate(subp.name)}</div>
									<img
										loading="lazy"
										src={`img/icons/TalentIcon/${subp.icon}.png`}
										className={`h-20`}
										alt="Icon"
									/>
									<div className="w-full">
										<HyperLinkTooltip
											str={translate(subp.des).replaceAll('#4', '').replace('|', '<br>')}
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 md:w-4/5">
									{displayCore(subp)
										.filter(filterAffix)
										.map((tree) => (
											<div
												key={tree.id}
												className="shadow-md shadow-black border-[#212121] border p-2"
											>
												<div className="flex flex-row gap-4 items-center border-b border-[#212121] pb-1 mb-1">
													<img
														loading="lazy"
														className="w-[54px]"
														src={`img/icons/CoreTalentIcon/${tree.icon}.png`}
														alt="Icon"
													/>
													<div className="title">{translate(tree.name)}</div>
												</div>
												<div>
													{tree.affix?.map((affix) => (
														<div key={affix}>
															<HyperLinkTooltip str={affix} />
														</div>
													))}
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					) : null
				)}
		</div>
	);
}
export default Talent;
