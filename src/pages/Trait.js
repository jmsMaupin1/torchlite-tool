import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import HyperLinkTooltip from '../components/HyperLinkTooltip';
import hero from './../data/hero.json';
import perk from './../data/perk.json';
import { useTranslation } from 'react-i18next';

function Trait() {
	const { translate, dataI18n } = useContext(AppContext);
	const [currentHero, setCurrentHero] = useState(null);
	const [currentSubTrait, setCurrentSubTrait] = useState(null);
	const [selectedSubTrait, setSelectedSubTrait] = useState(null);
	const { t } = useTranslation();
	const onChangeHero = (e) => {
		if (e.target.value !== '') {
			setCurrentHero(e.target.value);
		} else {
			setCurrentHero(null);
		}
		setSelectedSubTrait(null);
	};
	const onChangeSubTrait = (e) => {
		if (e.target.value !== '') {
			setSelectedSubTrait(e.target.value);
		} else {
			setSelectedSubTrait(null);
		}
	};

	useEffect(() => {
		// on change currentType we need to adapt listType
		if (dataI18n !== null) {
			let test = [
				...new Set(
					perk
						.filter((p) => currentHero === null || p.hero_id === currentHero)
						.map((p) => {
							return translate(p.name);
						})
				),
			];
			setCurrentSubTrait(test.sort());
		}
		// eslint-disable-next-line
	}, [currentHero, dataI18n]);

	if (dataI18n == null || hero == null) {
		return <Loader className="w-full container mx-auto max-h-40 flex" />;
	}

	return (
		<div className="flex flex-col container p-2">
			<div className="md:hidden title text-xl px-2 mb-2 text-center border-b border-slate-500">{t('commons:Hero_trait')}</div>
			<div className="flex flex-col md:flex-row mb-1 gap-2">
				<div className="flex flex-col">
					<label className="font-bold">{t('commons:Trait')}</label>
					<select onChange={onChangeHero} className="w-auto bg-[#282828] border rounded border-slate-500">
						<option value=""> -- {t('commons:Select_trait')} --</option>
						{hero
							.filter((h) => ['310', '600', '610', '910', '920', '1100', '1300', '1310', '1400'].includes(h.id))
							.map((x) => {
								return { id: x.id, name: translate(x.name) };
							})
							.map((h, index) => (
								<option key={h.id} value={h.id}>
									{h.name.split('|')[1]}
								</option>
							))}
					</select>
				</div>
				{currentHero !== null && (
					<div className="flex flex-col">
						<label className="font-bold">{t('commons:Sub_trait')}</label>
						<select onChange={onChangeSubTrait} className="w-auto bg-[#282828] border rounded border-slate-500">
							<option value=""> -- {t('commons:Select_sub_trait')} --</option>
							{currentSubTrait?.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			{hero
				.filter((h) => ['310', '600', '610', '910', '920', '1100', '1300', '1310', '1400'].includes(h.id))
				.filter((h) => h.id === currentHero || currentHero === null)
				.map((h) => (
					<div key={h.id} className={`flex flex-col md:flex-row mb-2 w-full`}>
						<div
							className={`bg-[#282828] w-full relative flex flex-col md:flex-row justify-between border p-2 rounded-lg md:shadow-lg md:shadow-black bg-no-repeat bg-contain bg-right-top`}
						>
							<div className="flex flex-col md:flex-row items-center md:items-start w-full gap-4">
								<div className="flex flex-col gap-2 items-center basis-1/4">
									<div>
										<img loading="lazy" src={`img/hero/${h.portrait2}.png`} className={`h-20`} alt="Icon" />
									</div>
									<div>
										<div className="text-center font-bold text-xl title">{translate(h.name).split('|')[1]}</div>
										<div className="text-center font-bold text-xl title">{translate(h.short_name)}</div>
									</div>
								</div>
								<div className="flex flex-col gap-2 w-full">
									{perk
										.filter((p) => p.hero_id === h.id && p.level === '1')
										.filter((p) => translate(p.name) === selectedSubTrait || selectedSubTrait === null)
										.map((p) => (
											<div key={p.character_id} className="flex shadow-md shadow-black p-1 border-t border-black">
												<div className="flex flex-col md:flex-row gap-2 p-2 w-full">
													<div className="flex flex-col md:flex-row gap-4 p-2">
														<div className="flex flex-col md:flex-row gap-2 items-center">
															<div className="h-[80px]">
																<img
																	loading="lazy"
																	className="h-[80px] min-w-[70px]"
																	src={`img/icons/Perks/${p.Icon}.png`}
																	alt="Perk"
																/>
															</div>
															<div>
																<HyperLinkTooltip
																	className="text-center font-bold text-xl title"
																	str={translate(p.name)}
																/>
																<div className="text-base text-center font-normal text-white">
																	Level {p.level}
																</div>
															</div>
														</div>
														<HyperLinkTooltip str={translate(p.desc_max)} />
													</div>
												</div>
											</div>
										))}
									{[15, 32, 50, 62, 80].map((index) => (
										<div key={'box' + index} className="flex flex-col gap-2">
											{perk
												.filter((p) => p.hero_id === h.id && p.level === index.toString())
												.filter((p) => translate(p.name) === selectedSubTrait || selectedSubTrait === null)
												.map((p) => (
													<div
														key={p.character_id}
														className="flex shadow-md shadow-black p-1 border-t border-black"
													>
														<div className="flex flex-col md:flex-row gap-4 p-2 items-center">
															<div className="flex flex-col md:flex-row gap-2 items-center">
																<div>
																	<img
																		loading="lazy"
																		src={`img/icons/Perks/${p.Icon}.png`}
																		className="h-[80px] min-w-[70px]"
																		alt="Perk"
																	/>
																</div>
																<div>
																	<HyperLinkTooltip
																		className="text-center font-bold text-xl title"
																		str={translate(p.name)}
																	/>
																	<div className="text-base text-center font-normal text-white">
																		Level {p.level}
																	</div>
																</div>
															</div>
															<HyperLinkTooltip str={translate(p.desc_max)} />
														</div>
													</div>
												))}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
export default Trait;
