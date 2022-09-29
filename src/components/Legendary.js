import {useContext,useState,useEffect} from 'react';
import { AppContext } from "../context/AppContext";
import HyperLinkTooltip from './HyperLinkTooltip';

function Legendary(props) {
    const b = props.legendary;
    const currentAffix = props.currentAffix
    const {translate,replaceTag,itemBase} = useContext(AppContext);
    const [currentDisplay,setCurrentDisplay] = useState(1);
    const [isVisible,setIsVisible] = useState(true);

    const changeDisplay = () => {
        if(currentDisplay === 1) {
            setCurrentDisplay(0);
        } else {
            setCurrentDisplay(1);
        }   
    }
    useEffect(() => {
        filterByAffix()
    },[currentAffix])

    const filterByAffix = () => {
        if(currentAffix === null) {
            setIsVisible(true);
            return;
        }
        let tabAffix = [];
        if(b.prefix !== undefined && b.prefix !== []) {
            b.prefix.filter((e) => e !== null).forEach((p) => {
                if(currentDisplay === 0) {
                    tabAffix.push(p.tier0[0])
                } else {
                    tabAffix.push(p.tier1[0]);
                }
            })
            if(tabAffix.find((a) => a.indexOf(currentAffix) > -1) !== undefined) {
                setIsVisible(true);
            } else {
                setIsVisible(false)
            }
        }
    }

    const currentBase = itemBase.find((e) => e.id === b.base_id);
    return (
        <div className={`${isVisible === false ? "hidden":""} flex flex-col border rounded bg-[#222] text-white p-2 gap-2 justify-between shadow-lg shadow-black`}>
            <div className='flex flex-row gap-2 items-center justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                    <div><img loading="lazy" src={`img/icons/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                    <div className='flex flex-col'>
                        <div className='title'>{translate(b.name)}</div>
                        <div className='border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>Require level {b.require_level}</div>
                        <div className='border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm'>{currentBase.description1_display}</div>
                    </div>
                </div>
                <div className=''>
                    <button className='p-1 text-[#f67370] border items-center flex rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]'>
                        <label className="inline-flex relative items-center cursor-pointer">
                            <input type="checkbox" onChange={changeDisplay} className="sr-only peer" />
                            <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Corroded</span>
                        </label>
                    </button>
                </div>
            </div>
            {currentBase !== undefined && currentBase.suffix !== undefined ?
                <HyperLinkTooltip className='mx-auto text-center w-[50%] border-b border-slate-500 ' str={currentBase.suffix}/>
            :null}
            <div className='flex flex-col'>
                
                {b.prefix !== undefined && b.prefix !== [] ? 
                    b.prefix.filter((e) => e !== null).map((s,i) => (
                        <div key={s.id+"-"+i} className='prefix'>
                            {s.tier0[0] !== null && currentDisplay === 0 ? 
                            <div className='flex flex-row gap-2 items-start'>
                                <div className='text-[#f67370] border rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]'>T0</div>
                                {/* <div key={"prefix-"+i} style={{filter: 'contrast(0.5) brightness(2.5)',backgroundImage: 'url(img/T_Fx_Tile_015_LXJ.png)'}} className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900' dangerouslySetInnerHTML={{__html: replaceTag(s.tier0)}}></div> */}
                                <HyperLinkTooltip key={"prefix-"+i} style={{filter: 'contrast(0.5) brightness(2.5)',backgroundImage: 'url(img/T_Fx_Tile_015_LXJ.png)'}} className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900' str={s.tier0}/>
                            </div>
                            :null}
                            {currentDisplay === 1 ?
                            <div className='flex flex-row gap-2 items-start'>
                                <div className='text-[#f67370] border rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]'>T1</div>
                                {/* <div key={"prefix-"+i} className='' dangerouslySetInnerHTML={{__html: replaceTag(s.tier1)}}></div> */}
                                <HyperLinkTooltip key={"prefix-"+i} str={s.tier1}/>
                            </div>
                            :null}
                            
                        </div>
                    ))
                : null}
                {b.suffix !== undefined && b.suffix !== [] ? 
                    b.suffix.filter((e) => e !== null).map((s,i) => (
                        <div key={s.id+"-"+i} className='suffix'>
                        {s.tier0[0] !== null && currentDisplay === 0 ? 
                            <div className='flex flex-row gap-2 items-start'>
                                <div className='text-[#f67370] border rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]'>T0</div>
                                {/* <div style={{filter: 'contrast(0.5) brightness(2.5)',backgroundImage: 'url(img/T_Fx_Tile_015_LXJ.png)'}} className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900' dangerouslySetInnerHTML={{__html: replaceTag(s.tier0)}}></div> */}
                                <HyperLinkTooltip style={{filter: 'contrast(0.5) brightness(2.5)',backgroundImage: 'url(img/T_Fx_Tile_015_LXJ.png)'}} className='font-bold bg-clip-text text-transparent bg-gradient-to-b from-purple-400 to-purple-900' key={"prefix-"+i} str={s.tier0}/>
                            </div>
                        :null}
                        {currentDisplay === 1 ?
                            <div className='flex flex-row gap-2  items-start'>
                                <div className='text-[#f67370] border rounded-tl-lg rounded-br-lg px-2 font-bold bg-gradient-to-b from-[#2a2626] to-[#734423] border-[#c86620]'>T1</div>
                                {/* <div key={"suffix-"+i} className='' dangerouslySetInnerHTML={{__html: replaceTag(s.tier1)}}></div> */}
                                <HyperLinkTooltip str={s.tier1}/>
                            </div>
                        :null}
                        </div>
                    ))
                : null}
            </div>
        </div>
    )
}
export default Legendary;