import React, { useContext } from 'react';
import { AppContext } from './../../context/AppContext';
import HyperLinkTooltip from './../HyperLinkTooltip';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';

function BaseCard({ cardData, currentAttr, setCurrentBase, showAffix, currentILevel, setCurrentILevel }) {
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
			<div className="flex flex-row gap-2 items-center relative">
				{setCurrentBase !== undefined && showAffix !== undefined && (
					<div className="absolute top-0 right-0 hover:cursor-pointer" onClick={() => setCurrentBase(null)}>
						<img src="img/icons/ui/UI_Common_Png9_536.png" alt="Return" loading="lazy" />
					</div>
				)}
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
				{currentILevel !== undefined && (
					<div>
						<DebounceInput
							value={currentILevel}
							className="w-auto bg-[#282828] border rounded border-slate-500"
							placeholder="ILevel"
							debounceTimeout={500}
							onChange={(event) => setCurrentILevel(event.target.value)}
						/>
					</div>
				)}
			</div>
			{showAffix === undefined && (
				<>
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
				</>
			)}
			{setCurrentBase !== undefined && showAffix === undefined && (
				<div className="text-center">
					<input
						onChange={() => {
							setCurrentBase(cardData?.id);
							setCurrentILevel(cardData?.require_level);
						}}
						type="radio"
						name="selectBase"
						value=""
					/>
				</div>
			)}
			{showAffix !== undefined && showAffix === true && (
				<div className="flex flex-col">
					<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Pre-fix</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t1"></div>
						<div>1</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t2"></div>
						<div>2</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t3"></div>
						<div>3</div>
					</div>

					<div className="bg-[#222] title bg-gradient-to-r from-black to-transparent -ml-2 p-2">Post-fix</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t4"></div>
						<div>1</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t1"></div>
						<div>2</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<div className="lozange t2"></div>
						<div>3</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default React.memo(BaseCard);
