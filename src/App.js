import './App.css';
import { AppContextProvider } from './context/AppContext';
import React from 'react';
import Router from './router/Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<Router />
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default App;
