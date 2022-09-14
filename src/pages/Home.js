import {Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function Home() {
    const {currentPage,setCurrentPage} = useContext(AppContext);

    return (
    <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg relative">
            <Link onClick={() => setCurrentPage('skills')} to="skills">
                <img className='rounded-lg' src={"img/skills.png"} />
                <h2 className='bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4'>Skills</h2>
            </Link>
        </div>
        <div className="border rounded-lg relative">
            <Link onClick={() => setCurrentPage('base')} to="base">
                <img className='rounded-lg' src={"img/base.png"} />
                <h2 className='bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4'>Bases</h2>
            </Link>
        </div>
        <div className="border rounded-lg relative">
            <Link onClick={() => setCurrentPage('legendary')} to="legendary">
                <img className='rounded-lg' src={"img/legendary.png"} />
                <h2 className='bottom-0 absolute w-full rounded-b-lg text-2xl bg-gradient-to-r from-black p-4'>Legendary</h2>
            </Link>
        </div>
    </div>
    );
}
export default Home;