import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import HyperLinkTooltip from '../HyperLinkTooltip';

const Spec2Build = ({ fieldRefSelectSpec2, currentMainProf, spec1, spec2, setSpec2 }) => {
	const { t } = useTranslation();
	const { translate, profession } = useContext(AppContext);

	const onProf2ValueChange = (e) => {
		setSpec2(profession.find((p) => p.id === e.target.value));
	};

	return (
		<>
			<div ref={fieldRefSelectSpec2} className={`${spec1 === null || spec2 !== null ? 'hidden' : ''} text-center text-xl font-bold`}>
				{t('commons:select_sub_profession_2')}
			</div>
			{profession
				.filter((p) => p.before_id === '0')
				.map((p) => (
					<div
						key={p.id}
						className={`${currentMainProf !== null && spec2 === null && spec1 !== null ? '' : 'hidden'} subProf-${
							p.id
						} flex flex-col md:flex-row gap-2 mb-2`}
					>
						{profession
							.filter((p2) => p2.before_id === p.id)
							.map((subp) => (
								<div
									key={p.id + '-' + subp.id}
									style={{
										backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`,
									}}
									className={`${
										spec1 !== null && spec1.id === subp.id ? 'grayscale text-gray-500' : ''
									} bg-[#282828] bg-contain bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg `}
								>
									<div className="text-center font-bold">{translate(p.name)}</div>
									<div className="flex flex-row justify-between items-center gap-4">
										<div className="flex flex-col items-center">
											<img
												loading="lazy"
												src={`img/icons/TalentIcon/${subp.icon}.png`}
												className={`h-20 ${spec1 !== null && spec1.id === subp.id ? 'contrast-0' : ''}`}
												alt="Icon"
											/>
											<div className="text-center font-bold text-xl">{translate(subp.name)}</div>
										</div>
										<HyperLinkTooltip str={translate(subp.des).replaceAll('#4', '').replace('|', '<br>')} />
									</div>
									<div className="text-center">
										{spec1?.id === subp?.id ? (
											''
										) : (
											<input
												type="radio"
												value={subp.id}
												checked={spec2?.id === subp?.id}
												name="profession2"
												onChange={onProf2ValueChange}
											/>
										)}
									</div>
								</div>
							))}
					</div>
				))}
		</>
	);
};

export default Spec2Build;
