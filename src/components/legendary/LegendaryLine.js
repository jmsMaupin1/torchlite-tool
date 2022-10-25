import { AppContext } from './../../context/AppContext';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'flowbite-react';
import HyperLinkTooltip from '../HyperLinkTooltip';

function LegendaryLine({ tierNumber, s, i, hightlightSearch }) {
	const { i18n } = useContext(AppContext);
	const { t } = useTranslation();

	return (
		<div className="flex flex-col">
			{s['tier' + tierNumber + '_' + i18n.language].length > 1 ? (
				s['tier' + tierNumber + '_' + i18n.language][0] !== s['tier' + tierNumber + '_' + i18n.language][1] ? (
					<Tooltip
						content={s['tier' + tierNumber + '_' + i18n.language].map((affix, ind) => (
							<React.Fragment key={ind}>
								{ind > 0 && <div className="text-center text-[10px]">╼ {t('commons:OR')} ╾</div>}
								<HyperLinkTooltip
									style={{
										filter: tierNumber === '0' ? 'contrast(0.5) brightness(2.5)' : '',
										backgroundImage: tierNumber === '0' ? 'url(img/T_Fx_Tile_015_LXJ.png)' : '',
									}}
									className={`hover:cursor-pointer ${
										tierNumber === '0'
											? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900'
											: ''
									}`}
									key={'prefix-' + i}
									str={hightlightSearch(affix)}
								/>
							</React.Fragment>
						))}
						trigger="hover"
					>
						<div
							className={`${
								tierNumber === '0'
									? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900'
									: 'text-[#ffc130]'
							} font-bold hover:cursor-pointer`}
							style={{
								filter: tierNumber === '0' ? 'contrast(0.5) brightness(2.5)' : '',
								backgroundImage: tierNumber === '0' ? 'url(img/T_Fx_Tile_015_LXJ.png)' : '',
							}}
						>
							{t('commons:Random_affix')}
						</div>
					</Tooltip>
				) : (
					<React.Fragment>
						<HyperLinkTooltip
							style={{
								filter: tierNumber === '0' ? 'contrast(0.5) brightness(2.5)' : '',
								backgroundImage: tierNumber === '0' ? 'url(img/T_Fx_Tile_015_LXJ.png)' : '',
							}}
							className={`hover:cursor-pointer ${
								tierNumber === '0'
									? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900'
									: ''
							}`}
							key={'prefix-' + i}
							str={hightlightSearch(s['tier' + tierNumber + '_' + i18n.language][0])}
						/>
					</React.Fragment>
				)
			) : (
				s['tier' + tierNumber + '_' + i18n.language].map((affix, ind) => (
					<React.Fragment key={ind}>
						{ind > 0 && <div className="text-center text-[10px]">╼ {t('commons:OR')} ╾</div>}
						<HyperLinkTooltip
							style={{
								filter: tierNumber === '0' ? 'contrast(0.5) brightness(2.5)' : '',
								backgroundImage: tierNumber === '0' ? 'url(img/T_Fx_Tile_015_LXJ.png)' : '',
							}}
							className={`hover:cursor-pointer ${
								tierNumber === '0'
									? 'font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900'
									: ''
							}`}
							key={'prefix-' + i}
							str={hightlightSearch(affix)}
						/>
					</React.Fragment>
				))
			)}
		</div>
	);
}
export default LegendaryLine;
