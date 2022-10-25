import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HyperLinkTooltip from '../HyperLinkTooltip';

const InitialProfessionBuild = ({ fieldRefSelectMainProf, currentMainProf, setCurrentMainProf }) => {
	const { t } = useTranslation();
	const { translate, profession } = useContext(AppContext);

	const onProfValueChange = (e) => {
		setCurrentMainProf(profession.find((p) => p.id === e.target.value));
	};

	return (
		<>
			<div ref={fieldRefSelectMainProf} className={`${currentMainProf === null ? '' : 'hidden'} text-center text-xl font-bold`}>
				{t('commons:select_initial_profession')}
			</div>
			<div className={`${currentMainProf === null ? '' : 'hidden'} grid grid-cols-1 md:grid-cols-3 gap-2 mb-2`}>
				{profession
					.filter((p) => p.before_id === '0')
					.map((p) => (
						<div key={p.id} className="bg-[#282828] border p-2 rounded-lg shadow-lg ">
							<div
								className="bg-contain flex flex-col justify-between bg-no-repeat bg-right-top"
								style={{
									backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`,
								}}
							>
								<div>
									<div>
										<img loading="lazy" src={`img/icons/TalentIcon/${p.icon}.png`} alt="Icon" />
									</div>
									<div>{translate(p.name)}</div>
									<HyperLinkTooltip str={translate(p.des).replaceAll('#4', '').replace('|', '<br>')} />
								</div>
								<div className="text-center">
									<input
										type="radio"
										value={p?.id}
										checked={currentMainProf?.id === p?.id}
										name="profession"
										onChange={onProfValueChange}
									/>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default InitialProfessionBuild;
