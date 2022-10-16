import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

function Home() {
	const { setCurrentPage } = useContext(AppContext);
	const { t } = useTranslation();
	// try some fix for img not load correctly after page change
	const currentEnv = process.env.NODE_ENV;
	let currentBasename = '';
	if (currentEnv === 'production') {
		currentBasename = '/torchlight-helper';
	}
	return (
		<>
			<div className="text-xl font-bold title text-center p-2 md:hidden border-b border-slate-500 mb-2">{t('commons:databases')}</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('skills')} to="skills">
						<img loading="lazy" className="rounded-lg" src={`${currentBasename}img/skills.png`} alt="Skills" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							{t('commons:skills')}
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('base')} to="base">
						<img loading="lazy" className="rounded-lg" src={`${currentBasename}img/base.png`} alt="Base" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							{t('commons:bases')}
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('legendary')} to="legendary">
						<img loading="lazy" className="rounded-lg" src={`${currentBasename}img/legendary.png`} alt="Legendary" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							{t('commons:legendary')}
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('talent')} to="talent" className="flex">
						<div>
							<img loading="lazy" className="rounded-lg" src={`${currentBasename}img/talent_big.png`} alt="Talent" />
						</div>
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							{t('commons:talent')}
						</h2>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Home;
