import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import React from 'react';

const Layout = () => {
	return (
		<>
			<Header />
			<div className="container mx-auto flex-auto">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
