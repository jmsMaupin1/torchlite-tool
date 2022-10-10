import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Home() {
	const { setCurrentPage } = useContext(AppContext);

	return (
		<>
			<div className="text-xl font-bold title text-center p-2 md:hidden border-b border-slate-500 mb-2">
				Databases
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('skills')} to="skills">
						<img className="rounded-lg" src={'img/skills.png'} alt="Skills" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							Skills
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('base')} to="base">
						<img className="rounded-lg" src={'img/base.png'} alt="Base" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							Bases
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('legendary')} to="legendary">
						<img className="rounded-lg" src={'img/legendary.png'} alt="Legendary" />
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							Legendary
						</h2>
					</Link>
				</div>
				<div className="border rounded-lg relative">
					<Link onClick={() => setCurrentPage('talent')} to="talent" className="flex">
						<div>
							<img className="rounded-lg" src={'img/talent_big.png'} alt="Talent" />
						</div>
						<h2 className="bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4">
							Talent
						</h2>
					</Link>
				</div>
			</div>
		</>
	);
}
export default Home;
