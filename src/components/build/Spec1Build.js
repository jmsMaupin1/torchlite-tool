import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HyperLinkTooltip from '../HyperLinkTooltip';

const Spec1Build = ({ fieldRefSelectSpec1, currentMainProf, spec1, setSpec1 }) => {
	const { t } = useTranslation();
	const { translate, profession } = useContext(AppContext);

	const onProf1ValueChange = (e) => {
		setSpec1(profession.find((p) => p.id === e.target.value));
	};

	return (
		<>
			<div
				ref={fieldRefSelectSpec1}
				className={`${currentMainProf === null || spec1 !== null ? 'hidden' : ''} text-center text-xl font-bold`}
			>
				{t('commons:select_sub_profession_1')}
			</div>
			<div
				className={`${currentMainProf !== null && spec1 === null ? '' : 'hidden'} subProf-${
					currentMainProf != null ? currentMainProf.id : ''
				} flex flex-col md:flex-row gap-2 mb-2`}
			>
				{profession
					.filter((p) => currentMainProf !== null && p.before_id === currentMainProf.id)
					.map((subp) => (
						<div
							key={subp.id + '-' + subp.id}
							style={{
								backgroundImage: `url("img/icons/TalentGodsIcon/${subp.background.split('|')[0]}.png`,
							}}
							className="bg-[#282828] bg-contain bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg "
						>
							<div className="text-center font-bold">{translate(subp.name)}</div>
							<div className="flex flex-row justify-between items-center gap-4">
								<div className="flex flex-col items-center">
									<img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className="h-20" alt="Icon" />
									<div className="text-center font-bold text-xl">{translate(subp.name)}</div>
								</div>
								<HyperLinkTooltip str={translate(subp.des).replaceAll('#4', '').replace('|', '<br>')} />
							</div>
							<div className="text-center">
								<input
									type="radio"
									value={subp?.id}
									checked={spec1?.id === subp?.id}
									name="profession1"
									onChange={onProf1ValueChange}
								/>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Spec1Build;
