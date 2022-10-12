import React from 'react';
import Home from '../pages/Home';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Legendaries from '../pages/Legendaries';
import { BuildContextProvider } from '../context/BuildContext';
import Build from '../pages/Build';
import Trait from '../pages/Trait';
import Talent from '../pages/Talent';
import Modifier from '../pages/Modifier';
import Skills from '../pages/Skills';
import Base from '../pages/Base';
import PactSpirit from '../pages/PactSpirit';
import FateCard from '../pages/FateCard';

const Router = () => {
	return (
		<Routes>
			<Route path="" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="legendary" element={<Legendaries />} />
				<Route path="base" element={<Base />} />
				<Route path="skills" element={<Skills />} />
				<Route path="mod" element={<Modifier />} />
				<Route path="talent" element={<Talent />} />
				<Route path="trait" element={<Trait />} />
				<Route path="pact-spirit" element={<PactSpirit />} />
				<Route path="fate-card" element={<FateCard />} />
				<Route
					path="build"
					element={
						<BuildContextProvider>
							<Build />
						</BuildContextProvider>
					}
				/>
			</Route>
		</Routes>
	);
};

export default Router;
