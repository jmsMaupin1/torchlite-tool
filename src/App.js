import './App.css';
import {Outlet,Link } from "react-router-dom";
import { useContext,useEffect,useState } from 'react';
import { AppContext } from './context/AppContext';
import { useLocation } from "react-router-dom"
import {MdArrowCircleUp} from "react-icons/md";

function App() {
    const {currentPage,setCurrentPage,topMenu} = useContext(AppContext);
    const location = useLocation()
    const [menuOpen,setMenuOpen] = useState(false);
        
    useEffect(() => {
        setCurrentPage(location.pathname.replace('/',''))
        // eslint-disable-next-line
    },[location])
    
  return (
    <>
    <header>
        <nav ref={topMenu} className="px-2 sm:px-4 py-2.5 bg-gray-900  mb-2 w-full z-20 border-b border-gray-600">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className="flex items-center">
                    <img src={"logo.png"} className="mr-3 h-[52px] " alt="TorchLight Helper Logo" />
                    <span className="title self-center text-xl font-semibold whitespace-nowrap text-white">Torchlight Helper</span>
                </div>
                <div className="flex md:order-2">
                    <button onClick={() => setMenuOpen(!menuOpen)} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className={`${menuOpen ? "":"hidden"} justify-between items-center w-full md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col p-4 pb-2 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded md:bg-transparent  md:p-0 `} to="/"><div className={`flex flex-row gap-2 items-center ${currentPage === "" || currentPage === null ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconTP.png" alt="Home" />Home</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-white  dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="skills"><div className={`flex flex-row gap-2 items-center ${currentPage === "skills" ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconSKL.png" alt="Skills"/>Skills</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="base"><div className={`flex flex-row gap-2 items-center ${currentPage === "base" ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconDZ.png" alt="Base"/>Base</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="legendary"><div className={`flex flex-row gap-2 items-center ${currentPage === "legendary" ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconST.png" alt="Legendary" />Legendary</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="talent"><div className={`flex flex-row gap-2 items-center  ${currentPage === "talent" ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconTAL.png" alt="Talent" />Talent</div></Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0  dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="trait"><div className={`flex flex-row gap-2 items-center  ${currentPage === "trait" ? "text-white":""}`}><img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconCHA.png" alt="trait" />Hero trait</div></Link>
                        </li>
                        <li>
                            {/* <Link onClick={() => setCurrentPage('mod')} className={`block py-2 pr-4 pl-3 ${currentPage === "mod" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="mod">Mod</Link> */}
                        </li>
                        
                        <li>
                            <Link onClick={() => setMenuOpen(false)} className={`title hover:text-white block py-2 pr-4 pl-3 ${currentPage === "build" ? "text-white":"text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700`} to="build">
                                <div className={`flex flex-row gap-2 items-center relative ${currentPage === "build" ? "text-white":""}`}>
                                    <img className='w-[30px]' src="img/icons/ui/UI_Fight_MenuIconCHA.png" alt="Build"/>
                                    Build
                                    <div className='absolute text-sm text-red-600 -top-2 -right-2 rotate-12'>BETA</div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div className="container mx-auto flex-auto">
        <Outlet />
    </div>
    
    <footer className='border-t mt-2 border-gray-500'>
        <div className='text-sm flex justify-between p-2 gap-2 container mx-auto'>
            <div>This site is fan-made and not affiliated with XD in any way.</div>
            <div>Made with 💗 by TheConcepteur</div>
        </div>
        
    </footer>
    <div className='bottom-0 right-2 fixed z-10'>
        <button title="Scroll to top" onClick={() => window.scrollTo({top: 0,behavior: "smooth"})}><MdArrowCircleUp className='w-10 h-10' /></button>
    </div>
    </>
  );
}

export default App;
