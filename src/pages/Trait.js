
import React, {useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import HyperLinkTooltip from '../components/HyperLinkTooltip';
import hero from './../data/hero.json'
import perk from './../data/perk.json'

function Trait() {
    const {translate,en} = useContext(AppContext);
    
    if(en == null || hero == null) {
        return (<Loader className='w-full container mx-auto max-h-40 flex'/>)
    }
    return (
        <div className='flex flex-col container p-2'>
            <div className='md:hidden title text-xl px-2 mb-2 text-center border-b border-slate-500'>Hero Perk</div>
            {hero.filter((h) => ["310","600","610","910","920",/*"1100",*/"1300","1310","1400"].includes(h.id)).map((h) => (
                <div key={h.id} className={`flex flex-col md:flex-row mb-2 w-full`}>
                    <div className={`bg-[#282828] w-full relative flex flex-col md:flex-row justify-between border p-2 rounded-lg md:shadow-lg md:shadow-black bg-no-repeat bg-contain bg-right-top`}>
                        <div className='flex flex-col items-center w-full'>
                            <div className='flex flex-row gap-2'>
                                <img loading="lazy" src={`img/hero/${h.portrait2}.png`} className={`h-20`} alt="Icon"/>
                                <div>
                                    <div className='text-center font-bold text-xl title'>{translate(h.name).split('|')[1]} {h.id}</div>
                                    <div className='text-center font-bold text-xl title'>{translate(h.short_name)}</div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 w-full'>
                                {perk.filter((p) => p.hero_id === h.id && p.level === "1").map((p) => (
                                    <div key={p.character_id} className='p-1 flex w-full'>
                                        <div className='flex flex-col md:flex-row gap-2 p-2 w-full'>
                                            <div className='flex flex-col gap-2 items-center basis-1/5'>
                                                <div><img src={`img/icons/Perks/${p.Icon}.png`} className='h-20' alt="Perk"/></div>
                                                <div>
                                                    <HyperLinkTooltip className='text-center font-bold text-xl title' str={translate(p.name)}/>
                                                </div>
                                            </div>
                                            <HyperLinkTooltip str={translate(p.desc_max)}/>
                                            <hr></hr>
                                            <HyperLinkTooltip str={translate(p.desc)}/>
                                        </div>                                                           
                                        
                                    </div>
                                ))}
                            </div> 
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-2'>
                                {[15,32,50,62,80].map((index) => (
                                    <div key={"box"+index} className='flex flex-col gap-2'>
                                        {perk.filter((p) => p.hero_id === h.id && p.level === index.toString()).map((p) => (
                                            <div key={p.character_id} className='flex shadow-md shadow-black p-1 border-t border-black'>
                                                <div className='flex flex-col gap-2 p-2'>
                                                    <div className='flex flex-col gap-2 items-center'>
                                                    <div><img src={`img/icons/Perks/${p.Icon}.png`} className='h-20' alt="Perk"/></div>
                                                    <div>
                                                        <HyperLinkTooltip className='text-center font-bold text-xl title' str={translate(p.name)}/>
                                                        <div className='text-base text-center font-normal text-white'>Level {p.level}</div>
                                                    </div>
                                                    </div>
                                                    <HyperLinkTooltip str={translate(p.desc_max)}/>    
                                                </div>                                                           
                                                
                                            </div>
                                        ))}
                                    </div> 
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Trait;