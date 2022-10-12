import './App.css';
import { AppContextProvider } from './context/AppContext';
import React from 'react';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';
import { initI18n } from './i18n/i18n';

//load i18n module
initI18n();

function App() {
	let currentBasename = '';
	// trick for github page based on node env , when build is production when npm start => development
	const currentEnv = process.env.NODE_ENV;
	if (currentEnv === 'production') {
		currentBasename = '/torchlight-helper';
	}
	return (
		<BrowserRouter basename={currentBasename}>
			<AppContextProvider>
				<Router />
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default App;
