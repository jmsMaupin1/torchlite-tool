import React, { useContext } from 'react';
import Select, { createFilter } from 'react-select';
import { AppContext } from '../context/AppContext';

function SelectWithImage(props) {
	const { translate, sortAlpha, skills } = useContext(AppContext);
	let index = props.index;
	let ind = props.ind;
	let onChange = props.onChange;
	return (
		<Select
			className="w-full"
			classNamePrefix="select"
			isClearable={true}
			isSearchable={true}
			captureMenuScroll={false}
			filterOption={createFilter({ ignoreAccents: false })}
			name={'support' + index}
			placeholder={'Select support ' + index + '...'}
			onChange={(e) => onChange(e, ind, index)}
			options={skills
				.filter((x) => x.tag.includes('Support') && x.name !== translate(x.name))
				.sort(sortAlpha)
				.map((s) => {
					return { value: s.id, label: translate(s.name), img: s.icon };
				})}
			formatOptionLabel={(skill) => (
				<div className="skill-option flex flex-row gap-2">
					<div>
						<img
							loading="lazy"
							src={`img/icons/CoreTalentIcon/${skill.img}.png`}
							className="w-[24px] aspect-square"
							alt="Icon"
						/>
					</div>
					<div>
						<span>{skill.label}</span>
					</div>
				</div>
			)}
		/>
	);
}
export default React.memo(SelectWithImage);
