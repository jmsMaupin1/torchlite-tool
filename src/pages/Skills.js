import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Skill from '../components/Skill';
import { debounce } from 'lodash';
import Loader from '../components/Loader';
import { DebounceInput } from 'react-debounce-input';
import { ViewportList } from 'react-viewport-list';
import { useTranslation } from 'react-i18next';

function Skills() {
	const { t } = useTranslation();
	const { translate, skills, skillTag, dataI18n } = useContext(AppContext);
	const [skillList, setSkillList] = useState(null);
	const [listType, setListType] = useState(null);
	const [currentType, setCurrentType] = useState(null);
	const [currentName, setCurrentName] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onChangeType = (e) => {
		if (e.target.value === '') setCurrentType(null);
		else setCurrentType(e.target.value);
	};
	const onChangeName = debounce(async (e) => {
		if (e.target.value === '') {
			setCurrentName(null);
		} else {
			setCurrentName(e.target.value);
		}
	}, 1000);

	useEffect(() => {
		if (skillList !== null) {
			computedSkillList();
		}
		if (isLoading === true) {
			setIsLoading(false);
		}
		// eslint-disable-next-line
	}, [currentName, currentType]);

	useEffect(() => {
		if (skillTag !== null && dataI18n !== null) {
			let listTypeInit = [];
			skillTag.forEach((s) => {
				let myTranslate = translate(s.des);
				if (s.visible === '1' && myTranslate.indexOf('Abandoned') === -1) {
					listTypeInit.push(translate(s.des));
				}
			});
			listTypeInit.sort();
			setListType([...listTypeInit]);
		}
		// eslint-disable-next-line
	}, [skillTag, en]);

	useEffect(() => {
		if (skills !== null) {
			setSkillList(
				skills.map((x) => {
					x.enabled = true;
					return x;
				})
			);
		}
	}, [skills]);

	const computedSkillList = () => {
		let temp = [...skillList];
		temp = skillList.filter(
			(el) =>
				el.detail !== '' &&
				el.detail !== translate(el.detail) &&
				(el.tag.includes(currentType) || currentType == null)
		);

		if (currentName !== null) {
			temp = temp.filter((el) => translate(el.name).toLowerCase().includes(currentName.toLowerCase()));
		}
		return temp;
	};
	if (skills == null || skillTag == null || listType == null || dataI18n == null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	return (
		<>
			<div>
				<div className="md:hidden title text-xl p-2 text-center border-b border-slate-500">
					{t('commons:skills')}
				</div>
				<div className="flex flex-col md:flex-row mb-2 gap-2 md:items-center p-2">
					<div className="flex flex-col md:flex-row gap-2 md:items-center">
						<label className="text-white">{t('commons:skill_tag')}</label>
						<select
							onChange={onChangeType}
							className="bg-[#282828] border rounded border-slate-500 w-full md:w-auto"
						>
							<option value={''}>{t('commons:select_tag')}</option>
							{listType.map((type, i) => (
								<option key={type + i} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col md:flex-row gap-2 md:items-center">
						<label className="text-white">{t('commons:skill')} </label>
						<DebounceInput
							placeholder={t('commons:name_of_the_skill')}
							className="bg-[#282828] border rounded border-slate-500 pl-1"
							debounceTimeout={500}
							onChange={(event) => onChangeName(event)}
						/>
					</div>
					{isLoading && <Loader text="" />}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-10 mx-auto p-2">
				<ViewportList items={computedSkillList()}>
					{(item, index) => <Skill key={'skill' + index} skill={item} index={index} />}
				</ViewportList>
			</div>
		</>
	);
}
export default Skills;
