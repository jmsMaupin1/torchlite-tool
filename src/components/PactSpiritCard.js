/* eslint-disable no-eval */
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import HyperLinkTooltip from '../components/HyperLinkTooltip';
import Loader from '../components/Loader';

function PactSpiritCard({ p }) {
	const { translate } = useContext(AppContext);
	const { t } = useTranslation();
	const getRarity = (rarity) => {
		switch (rarity) {
			case '2':
				return t('commons:Magic');
			case '3':
				return t('commons:Rare');
			case '100':
				return t('commons:Legendary');
			default:
				return rarity;
		}
	};
	const getType = (type) => {
		switch (type) {
			case '1':
				return t('commons:Attack');
			case '2':
				return t('commons:Spell');
			case '3':
				return t('commons:Persistent');
			case '4':
				return t('commons:Summon');
			case '5':
				return t('commons:Survival');
			case '6':
				return t('commons:Drop');
			case '100':
				return t('commons:Legendary');
			default:
				return type;
		}
	};
	const convertTransformation = (e) => {
		//1|101010308{P1:12 * GetLevel[]}
		//{P1:6+4 * GetLevel[];P2:12+7* GetLevel[]}
		let affixId = e.split('{')[0].split('|')[1];
		let affixString = translate('affix_class|description|' + affixId);
		let myReg = /{(.*)}/gim; // get argument
		let myMatch = myReg.exec(e);
		if (myMatch) {
			// build argument
			let str = myMatch[0]
				.replaceAll('* GetLevel[]', '* 1')
				.replaceAll('*GetLevel[]', '* 1')
				.replaceAll(';', '",')
				.replaceAll(':', ':"')
				.replaceAll('}', '"}')
				.replace('P1', '"P1"')
				.replace('P2', '"P2"')
				.replace('P3', '"P3"')
				.replace('P4', '"P4"');
			let json = JSON.parse(str);

			let finalString = affixString
				.replace('$P1$', eval(json.P1))
				.replace('$+P1$%', eval(json.P1) + '%')
				.replace('$+P1$', eval(json.P1))
				.replace('$P2$', eval(json.P2))
				.replace('$+P2$%', eval(json.P2) + '%')
				.replace('$+P2$', eval(json.P2))
				.replace('$P3$', eval(json.P3))
				.replace('$+P3$%', eval(json.P3) + '%')
				.replace('$+P3$', eval(json.P3))
				.replace('$P4$', eval(json.P4))
				.replace('$+P4$%', eval(json.P4) + '%')
				.replace('$+P4$', eval(json.P4));

			return finalString;
		}
	};
	if (p === null || p === undefined) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}
	return (
		<div className=" flex flex-col border rounded bg-[#222] text-white p-2 gap-1 shadow-lg shadow-black">
			<div className="flex flex-row items-center gap-2">
				<div className="">
					<img
						loading="lazy"
						className="h-20 aspect-square"
						src={`img/icons/PetIcons/${p.icon_small}.png`}
						alt="Icons"
					/>
				</div>
				<div className="flex flex-col">
					<div className="title">{translate(p.name)}</div>
					<div className={`font-bold rarity-${getRarity(p.rarity).toLowerCase()}`}>{getRarity(p.rarity)}</div>
					<div>{getType(p.type)}</div>
				</div>
			</div>
			{p.point !== '0' && (
				<div className="text-[#ffc130] text-center">
					{translate('TextTable_GameFunc|value|Func_Pet_ExtraPointDescription').replace('%s', p.point)}
				</div>
			)}

			<div className="title text-white text-center border-b border-slate-500 mt-2 mx-auto">
				{t('commons:Effect')}
			</div>
			<div className="text-center">{translate(p.des_effect)}</div>
			<div className="title text-white text-center border-b border-slate-500 mt-2 mx-auto">
				{t('commons:Upgrade')}
			</div>
			<div
				className="text-center"
				dangerouslySetInnerHTML={{ __html: translate(p.des_promotion).split('|').join('<br>') }}
			></div>
			<div className="title text-white text-center border-b border-slate-500 mt-2 mx-auto">
				{t('commons:Affix')}
			</div>
			<div className="grid grid-cols-1 items-center gap-1 justify-between">
				{p.information_point_icon
					.split(';')
					.slice(0, -1)
					.map((point, index) => (
						<div key={index} className="flex flex-row items-start gap-2">
							<img
								className="w-6"
								src={`img/icons/PetIcons/contract/${point.split(':')[1]}.png`}
								alt="Contract"
							/>
							<div className="text-sm text-slate-400 w-[45px] min-w-[45px]">
								{point.split(':')[1].indexOf('Small') > -1 ? t('commons:Inner') : null}
								{point.split(':')[1].indexOf('Middle') > -1 ? t('commons:Middle') : null}
								{point.split(':')[1].indexOf('Large') > -1 ? t('commons:Outer') : null}
							</div>

							<HyperLinkTooltip
								className="text-sm"
								str={convertTransformation(p.transformation.split('||')[index])}
							/>
						</div>
					))}
			</div>
		</div>
	);
}
export default React.memo(PactSpiritCard);
