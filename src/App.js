import './App.css';
import { AppContextProvider } from './context/AppContext';
import React from 'react';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';
import { initI18n } from './i18n/i18n';

//load i18n module
initI18n();

function App() {
	const currentBasename = process.env.REACT_APP_BASENAME;
	return (
		<BrowserRouter basename={currentBasename}>
			<AppContextProvider>
				<Router />
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default App;
