import {Tooltip} from 'flowbite-react'
import React, {useContext,useEffect,useState} from 'react'
import { AppContext } from '../context/AppContext';

function HeroTrait(props) {

    const perk = props.perk;
    const heroTraits = props.hero;
    const onTraitValueChange = props.onTraitValueChange
    const onSpecChange = props.onSpecChange
    const currentTrait = props.currentTrait

    const {translate} = useContext(AppContext);
    const [selectedTrait,setSelectedTrait] = useState(currentTrait.specId);

    const _setSelectedTrait = (id,name) => {
        setSelectedTrait(id);
        onSpecChange(id,translate(name))
    }
    useEffect(() => {
        if(heroTraits.length === 1 && currentTrait.specId === null) {
            let spec = perk.find((p) => p.hero_id === heroTraits[0].id && p.level === "1");
            onSpecChange(heroTraits[0].id,translate(spec.name));
        }
    // eslint-disable-next-line
    },[currentTrait])
    
    return (
        <>
        {/* // multiple specialization, we need to select one */}
        {heroTraits.length > 1 ?
        <div className='bg-[#282828] flex flex-col justify-center items-center w-full border p-2 rounded-lg shadow-lg gap-2 '>
        <div className='flex flex-row justify-evenly w-full'>
            {heroTraits.map((h,i) => (
                i % 2 === 0 ? 
                <div key={i}><img src={`img/hero/${h.portrait2}.png`} alt="Hero"/></div>:
                null
            ))}
        </div>
        <div className='flex flex-row gap-2'>
        {heroTraits.map((h,i) => (
            <div key={h.id+"-"+i} className='flex flex-row'>
            {[1].map((index) => (
                <React.Fragment key={index}>
                    {perk.filter((p) => p.hero_id === h.id && p.level === index.toString()).map((p) => (
                        <div key={p.character_id} className='flex shadow-md shadow-black p-1 border-t border-black items-center justify-center flex-col'>
                            <div className='mx-auto'><img src={`img/icons/Perks/${p.Icon}.png`} className='md:h-20 h-14' alt="Perk"/></div>
                            <div>
                                <div className='text-center font-bold md:text-xl title'>{translate(p.name)}</div>
                                <div className='text-base text-center font-normal text-white'>Level {p.level}</div>
                                <div className='text-center '><input type="radio" checked={currentTrait.specId === h.id} onChange={(e) => _setSelectedTrait(e.target.value,p.name)} value={h.id} name={`trait`}/></div>
                            </div>
                        </div>                            
                    ))}
                </React.Fragment>
            ))}
            </div>
        ))}
        </div>
        </div>
        :null}
        {heroTraits.filter((h) => h.id === selectedTrait || heroTraits.length === 1).map((h) => (
        <div key={h.id} className='bg-[#282828] flex flex-col gap-2 md:flex-row justify-between w-full border p-2 rounded-lg shadow-lg  flex-wrap'>
            {[15,32,50,62,80].map((index) => (
                <div key={"box"+index} className='flex flex-col gap-2'>
                    {perk.filter((p) => p.hero_id === h.id && p.level === index.toString()).map((p) => (
                        <div key={p.character_id} className='flex shadow-md shadow-black p-1 border-t border-black items-center justify-center'>
                            <div className='flex flex-col gap-2 p-2 items-center justify-center'>
                                <Tooltip className='' content={<div dangerouslySetInnerHTML={{__html:translate(p.desc_max).replaceAll("\\n","<br>")}}></div>}>
                                <div className='flex flex-col gap-2 items-center justify-center'>
                                    <div><img src={`img/icons/Perks/${p.Icon}.png`} className='h-20' alt="Perk"/></div>
                                    <div>
                                        <div className='text-center font-bold md:text-xl title'>{translate(p.name)}</div>
                                        <div className='text-base text-center font-normal text-white'>Level {p.level}</div>
                                        { index === 32 || index === 62 || index === 80 ? 
                                        <div className='text-center '><input type="radio" checked={currentTrait[index.toString()] === p.character_id} onChange={onTraitValueChange} value={p.character_id} name={`talentLevel_${index}`}/></div>
                                        :null
                                        }
                                    </div>
                                </div>
                                </Tooltip>
                            </div>                                                                           
                        </div>
                    ))}
                </div> 
            ))}
        </div>
        ))}
        </>
    )
}
export default HeroTrait;