import { FaShareAlt } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import HyperLinkTooltip from '../HyperLinkTooltip';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../context/AppContext';
import { MdArrowRight } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';

const SideMenuBuild = (props) => {
	const { t } = useTranslation();
	const {
		skillsImg,
		fieldRefSkills,
		buildUrl,
		currentMainProf,
		fieldRefTrait,
		currentTrait,
		setCurrentTrait,
		fieldRefMainProf,
		fieldRefSelectMainProf,
		fieldRefSpec1,
		spec1,
		fieldRefSelectSpec1,
		spec2,
		fieldRefSpec2,
		fieldRefSelectSpec2,
		totalStat,
		_setSpec1,
		_setSpec2,
		_setCurrentMainProf,
		sticky,
	} = props;
	const { translate } = useContext(AppContext);
	const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
	const [buildUrlMinified, setBuildUrlMinified] = useState(null);
	const [sideMenuVisible, setSideMenuVisible] = useState(false);

	const getMinifier = () => {
		let fd = new FormData();
		fd.append('link', buildUrl);

		const requestOptions = {
			method: 'POST',
			body: fd,
		};
		let url = '';
		const currentURL = window.location.href;
		if (currentURL.includes('th3conc3pt3ur.github.io')) {
			url = 'https://tli.fr.nf/minifier';
		} else {
			url = 'http://127.0.0.1:8000/minifier';
		}
		fetch(url, requestOptions)
			.then(async (response) => {
				const isJson = response.headers.get('content-type')?.includes('application/json');
				const data = isJson && (await response.json());
				if (!response.ok) {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
				//console.log(data.url);
				setBuildUrlMinified(data.url);
			})
			.catch((error) => {
				console.log(error);
			});
		//.then(data => {console.log(data.url);
	};

	const toggleSideMenu = () => {
		if (!sideMenuVisible) {
			document.getElementById('sideMenu').style.width = '100%';
			document.getElementById('buttonSideMenu').style.width = '0';
		} else {
			document.getElementById('sideMenu').style.width = '0';
			document.getElementById('buttonSideMenu').style.width = '0.75rem';
		}

		setSideMenuVisible(!sideMenuVisible);
	};

	return (
		<div
			id="sideMenu"
			className={
				isMedium
					? 'md:w-[20%] gap-2 flex flex-col relative'
					: 'sideMenu md:hidden flex flex-row fixed top-1/3 left-0 z-10 overflow-hidden'
			}
			style={isMedium ? {} : { transition: '0.3s', width: '0px' }}
		>
			<div
				id="buttonSideMenu"
				onClick={() => toggleSideMenu()}
				style={{ transition: '0.5s' }}
				className={`md:hidden bg-black w-3 flex fixed top-1/2 z-10 left-0 flex-row`}
			>
				<MdArrowRight />
			</div>
			<div className={isMedium ? `gap-1 flex flex-col ${sticky ? 'sticky top-2' : ''}` : 'flex flex-col w-full'}>
				{!buildUrlMinified && (
					<button
						onClick={() => getMinifier()}
						className="bg-[#282828] hover:bg-gray-900 border rounded-md h-10 flex flex-row gap-2 items-center px-2"
					>
						<FaShareAlt /> {t('commons:generate_build_url')}
					</button>
				)}
				{buildUrlMinified && (
					<CopyToClipboard
						onClick={() => getMinifier()}
						text={buildUrl}
						onCopy={() => {
							toast.success('Build url copied !');
							setBuildUrlMinified(null);
						}}
					>
						<button className="bg-[#282828] hover:bg-gray-900 border rounded-md h-10 flex flex-row gap-2 items-center px-2">
							<FaShareAlt /> {t('commons:copy_build_url')}
						</button>
					</CopyToClipboard>
				)}
				<div
					onClick={() => fieldRefSkills.current.scrollIntoView()}
					className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
				>
					<div className="flex flex-row gap-2 px-2">
						<div className="flex flex-row items-center gap-2">
							<div>{t('commons:skills')}</div>
							{skillsImg.map((skillImg, key) => {
								if (!skillImg) return null;
								return (
									<div key={key}>
										<img loading="lazy" className="h-6" src={`img/icons/CoreTalentIcon/${skillImg}.png`} alt="Icon" />
									</div>
								);
							})}
						</div>
					</div>
				</div>
				{currentMainProf ? (
					<div
						onClick={() => fieldRefTrait.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
						style={{
							backgroundSize: '50%',
							backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`,
						}}
					>
						<div className="flex flex-row gap-2">
							<div>
								<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${currentMainProf.icon}.png`} alt="Icon" />
							</div>
							<div>{currentTrait['specName']}</div>
						</div>
						<div className="mr-2">
							<button className="text-gray-300 hover:cursor-pointer hover:bg-gray-900" onClick={() => setCurrentTrait(null)}>
								x
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => fieldRefTrait.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
					>
						0. {t('commons:select_trait')}
					</div>
				)}
				{currentMainProf ? (
					<div
						onClick={() => fieldRefMainProf.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
						style={{
							backgroundSize: '50%',
							backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`,
						}}
					>
						<div className="flex flex-row gap-2">
							<div>
								<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${currentMainProf.icon}.png`} alt="Icon" />
							</div>
							<div>{translate(currentMainProf.name)}</div>
						</div>
						<div className="mr-2">
							<button
								className="text-gray-300 hover:cursor-pointer hover:bg-gray-900"
								onClick={() => _setCurrentMainProf(null)}
							>
								x
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => fieldRefSelectMainProf.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
					>
						1. {t('commons:select_initial_profession')}
					</div>
				)}

				{spec1 ? (
					<div
						onClick={() => fieldRefSpec1.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
						style={{
							backgroundSize: '50%',
							backgroundImage: `url("img/icons/TalentGodsIcon/${spec1.background.split('|')[0]}.png`,
						}}
					>
						<div className="flex flex-row gap-2">
							<div>
								<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${spec1.icon}.png`} alt="Icon" />
							</div>
							<div>{translate(spec1.name)}</div>
						</div>
						<div className="mr-2">
							<button className="text-gray-300 hover:cursor-pointer hover:bg-gray-900" onClick={() => _setSpec1(null)}>
								x
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => fieldRefSelectSpec1.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
					>
						2. {t('commons:select_sub_profession_1')}
					</div>
				)}

				{spec2 ? (
					<div
						onClick={() => fieldRefSpec2.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between"
						style={{
							backgroundSize: '50%',
							backgroundImage: `url("img/icons/TalentGodsIcon/${spec2.background.split('|')[0]}.png`,
						}}
					>
						<div className="flex flex-row gap-2">
							<div>
								<img loading="lazy" className="h-6" src={`img/icons/TalentIcon/${spec2.icon}.png`} alt="Icon" />
							</div>
							<div>{translate(spec2.name)}</div>
						</div>
						<div className="mr-2">
							<button className="text-gray-300 hover:bg-gray-900 hover:cursor-pointer" onClick={() => _setSpec2(null)}>
								x
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => fieldRefSelectSpec2.current.scrollIntoView()}
						className="bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2"
					>
						3. {t('commons:select_sub_profession_2')}
					</div>
				)}
				{totalStat && (
					<div className="flex flex-col bg-[#282828] hover:bg-gray-900 hover:cursor-pointer border rounded-md justify-between p-1">
						<div className="text-center border-b border-slate-700">{t('commons:total_stats')}</div>
						{Object.entries(totalStat).map(([affix, stat]) => (
							<HyperLinkTooltip
								className="text-left text-sm break-words"
								key={affix}
								str={translate('affix_class|description|' + affix)
									.replace('$P1$', stat)
									.replace('$+P1$', '+' + stat)}
							/>
						))}
					</div>
				)}
			</div>
			<div
				id="buttonSideMenu"
				onClick={() => toggleSideMenu()}
				style={{ transition: '0.5s' }}
				className={`md:hidden bg-black w-3 flex fixed top-1/2 z-10 left-0 flex-row`}
			>
				<MdArrowRight />
			</div>
		</div>
	);
};

export default SideMenuBuild;
