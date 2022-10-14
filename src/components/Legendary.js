import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import HyperLinkTooltip from './HyperLinkTooltip';
import { useTranslation } from 'react-i18next';
import LegendaryLine from './LegendaryLine';

function Legendary(props) {
	const b = props.legendary;
	const currentAffix = props.currentAffix;
	const { translate, itemBase, i18n } = useContext(AppContext);
	const [currentDisplay, setCurrentDisplay] = useState(1);
	const { t } = useTranslation();

	const changeDisplay = () => {
		if (currentDisplay === 1) {
			setCurrentDisplay(0);
		} else {
			setCurrentDisplay(1);
		}
	};
	const hightlightSearch = (str) => {
		if (currentAffix === null || currentAffix === undefined || currentAffix === '') {
			return str;
		}
		let tempStr = str;
		let replace = str;
		let regex = new RegExp(`${currentAffix}`, 'gi');
		if (Array.isArray(str)) {
			tempStr = str[0];
			let test = regex.exec(tempStr);
			if (test != null && test[0] !== undefined) {
				replace = [tempStr.replace(regex, `<mark>${test[0]}</mark>`)];
			}
		} else {
			let test = regex.exec(tempStr);
			if (test != null && test[0] !== undefined) {
				replace = tempStr.replace(regex, `<mark>${test[0]}</mark>`);
			}
		}
		return replace;
	};
	const currentBase = itemBase.find((e) => e.id === b.base_id);

	if (!b || !currentBase) return;
	return (
		<div
			className={`flex flex-col border rounded bg-[#222] text-white p-2 gap-2 justify-start shadow-lg shadow-black ${props.className}`}
		>
			<div className="flex flex-row gap-2 items-center flex-wrap justify-between">
				<div className="flex flex-row gap-2 items-center">
					<div>
						<img loading="lazy" src={`img/icons/${b.icon}.png`} className="w-[64px]" alt="Icon" />
					</div>
					<div className="flex flex-col">
						<div className="title">{translate(b.name)}</div>
						<div className="border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm">
							{t('commons:require_level')} {b.require_level}
						</div>
						<div className="border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm">
							{translate(currentBase.description1)} ({translate(currentBase.description2)})
						</div>
					</div>
				</div>
				<div className="">
					<button className="p-1 text-[#f67370] border items-center flex rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
						<label className="inline-flex relative items-center cursor-pointer">
							<input type="checkbox" onChange={changeDisplay} className="sr-only peer" />
							<div className="w-11 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:z-0 after:h-4 after:w-5 after:transition-all dark:border-gray-600"></div>
							<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{t('commons:corroded')}</span>
						</label>
					</button>
				</div>
			</div>
			{currentBase !== undefined && currentBase.suffix !== undefined ? (
				<HyperLinkTooltip
					style={{ width: '100%' }}
					className="w-full text-center border-b border-slate-500"
					str={hightlightSearch(currentBase.suffix)}
				/>
			) : null}
			<div className="flex flex-col">
				{b.prefix !== undefined &&
					b.prefix !== [] &&
					b.prefix
						.filter((e) => e !== null)
						.map((s, i) => (
							<div key={i} className="prefix">
								{s['tier0_' + i18n.language][0] !== null && currentDisplay === 0 && (
									<div className="flex flex-row gap-2 items-center ">
										<div className="text-[#f67370] border self-start rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
											T0
										</div>
										<LegendaryLine tierNumber={'0'} s={s} i={i} hightlightSearch={hightlightSearch} />
									</div>
								)}
								{currentDisplay === 1 && (
									<div className="flex flex-row gap-2 items-center">
										<div className="text-[#f67370] border self-start rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
											T1
										</div>
										<LegendaryLine tierNumber={'1'} s={s} i={i} hightlightSearch={hightlightSearch} />
									</div>
								)}
							</div>
						))}
				{b.suffix !== undefined &&
					b.suffix !== [] &&
					b.suffix
						.filter((e) => e !== null)
						.map((s, i) => (
							<div key={i} className="suffix">
								{s['tier0_' + i18n.language][0] !== null && currentDisplay === 0 && (
									<div className="flex flex-row gap-2 items-start">
										<div className="text-[#f67370] border rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
											T0
										</div>
										<LegendaryLine tierNumber={'0'} s={s} i={i} hightlightSearch={hightlightSearch} />
									</div>
								)}
								{currentDisplay === 1 && (
									<div className="flex flex-row gap-2 items-start">
										<div className="text-[#f67370] border rounded-tl-lg rounded-br-lg my-1 px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]">
											T1
										</div>
										<LegendaryLine tierNumber={'1'} s={s} i={i} hightlightSearch={hightlightSearch} />
									</div>
								)}
							</div>
						))}
			</div>
		</div>
	);
}
export default Legendary;
