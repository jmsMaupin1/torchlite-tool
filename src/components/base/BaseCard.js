import React, { useContext } from 'react';
import { AppContext } from './../../context/AppContext';
import HyperLinkTooltip from './../HyperLinkTooltip';
import { useTranslation } from 'react-i18next';

function BaseCard({ cardData, currentAttr }) {
	const { translate, i18n } = useContext(AppContext);
	const { t } = useTranslation();
	if (!cardData) return;

	const hightlightSearch = (str) => {
		if (currentAttr === null || currentAttr === undefined || currentAttr === '') {
			return str;
		}
		let tempStr = str;
		let replace = null;
		if (Array.isArray(str)) {
			tempStr = str[0];
			replace = [tempStr.replace(currentAttr, `<mark>${currentAttr}</mark>`)];
		} else {
			replace = tempStr.replace(currentAttr, `<mark>${currentAttr}</mark>`);
		}
		return replace;
	};
	return (
		<div key={cardData?.id} className="flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-start">
			<div className="flex flex-row gap-2 items-center">
				<div className="flex min-w-[40px]">
					<img loading="lazy" src={`img/icons/${cardData?.icon}.png`} className="w-[64px]" alt="Icon" />
				</div>
				<div className="flex flex-col">
					<div className="title pl-1">{translate(cardData?.name)}</div>
					<div className="border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm w-auto">
						{t('commons:require_level')} {cardData?.require_level}
					</div>
					<div className="flex flex-row gap-1">
						<div className="border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm">
							{translate(cardData?.description1)} ({translate(cardData?.description2)})
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center">
				{cardData['suffix_' + i18n.language] !== undefined &&
					cardData['suffix_' + i18n.language] !== [] &&
					cardData['suffix_' + i18n.language].map((s, i) => (
						<div className=" border-b border-slate-600 pb-1" key={i}>
							<HyperLinkTooltip key={'suffix-' + i} className="text-center" str={hightlightSearch(s)} />
						</div>
					))}
			</div>
			{cardData['base_attr_display_' + i18n.language] !== undefined && (
				<div className="">
					<div className="base_list flex flex-col text-center">
						{cardData['base_attr_display_' + i18n.language]?.map((attr, i) => (
							<div key={i} dangerouslySetInnerHTML={{ __html: hightlightSearch(attr) }}></div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
export default React.memo(BaseCard);
