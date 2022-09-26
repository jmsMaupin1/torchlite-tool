import logo from './logo.svg';
import './App.css';
import {Outlet,Link } from "react-router-dom";
import Base from './pages/Base';
import { useState,useContext } from 'react';
import { AppContext } from './context/AppContext';

function App() {
    const {currentPage,setCurrentPage,topMenu} = useContext(AppContext);
    
  return (
    <>
    <header>
        <nav ref={topMenu} className="px-2 sm:px-4 py-2.5 bg-gray-900  mb-2 w-full z-20 border-b border-gray-200 border-gray-600">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="flex items-center">
                    <img src={"logo.png"} className="mr-3 h-[52px] " alt="TorchLight Helper Logo" />
                    <span className="title self-center text-xl font-semibold whitespace-nowrap text-white">Torchlight Helper</span>
                </div>
                <div className="flex md:order-2">
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        
                        <li>
                            <Link onClick={() => setCurrentPage('home')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "home" || currentPage === null ? "text-white":"text-gray-700"}  bg-blue-700 rounded md:bg-transparent  md:p-0 `} aria-current="page" to="/"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconTP.png" />Home</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setCurrentPage('skills')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "skills" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="skills"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconSKL.png"/>Skills</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setCurrentPage('base')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "base" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="base"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconDZ.png" />Base</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setCurrentPage('legendary')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "legendary" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="legendary"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconST.png" />Legendary</div></Link>
                        </li>
                        <li>
                            { <Link onClick={() => setCurrentPage('talent')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "talent" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="talent"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconTAL.png" />Talent</div></Link> }
                        </li>
                        <li>
                            {/* <Link onClick={() => setCurrentPage('mod')} className={`block py-2 pr-4 pl-3 ${currentPage === "mod" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="mod">Mod</Link> */}
                        </li>
                        
                        <li>
                        { <Link onClick={() => setCurrentPage('build')} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "build" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} to="build"><div className='flex flex-row gap-2'><img className='w-[20px]' src="img/icons/ui/UI_Fight_MenuIconCHA.png"/>Build</div></Link> }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div className="container mx-auto">
        <Outlet />
    </div>
    <footer className='border-t mt-2 border-gray-500'>
        <div className='flex justify-between p-2 container mx-auto'>
            <div>This site is fan-made and not affiliated with XD in any way.</div>
            <div>Made with 💗 by TheConcepteur</div>
        </div>
        
    </footer>
    </>
  );
}

export default App;
