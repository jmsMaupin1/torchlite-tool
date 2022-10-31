import React, { useState, useEffect } from 'react'
import HyperLinkTooltip from '../HyperLinkTooltip';

// this should maybe be its own file at some point, but this is for PoC
// ill probably allow you to pass a header for the card in via props then we 
// can make this its own component and pass this to the header prop
function SubTitle({mod, ember}) {
    return (
        <div className="w-full flex flex-row items-center justify-between shadow-sm shadow-black border-[#333] p-1 m-1">
            <div className='flex gap-2 m-1 items-center'>
                <HyperLinkTooltip str={mod.affix}/>
            </div>
            <div className='flex flex-row items-center gap-1'>
                <div className='flex flex-col items-center border border-[#333] px-2 text-sm'>
                    <div>Weight</div>
                    <div>{mod.weight}</div>
                </div>
                <div className='flex flex-col items-center border border-[#333] px-2 text-sm'>
                    <div>Hit %</div>
                    <div>{(mod.weight * 100 / ember.weight).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
}


export default function CollapsibleCard({onChange, ember, mod, img, title, children}) {
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        if (onChange)
            onChange(expand);
    }, [expand])

    const handleExpandChange = e => {
        setExpand(!expand);
        if (ember) {
            console.log(ember)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between hover:cursor-pointer w-full" onClick={handleExpandChange}>
                {img ? <img className="h-20 aspect-square" src={`${img}`} alt={`${title}'s icon`}/> : null}
                {title ? <div className='text-2xl'>{title}</div> : null}
                {ember && mod ? <SubTitle mod={mod} ember={ember}/> : null}
                <div>
                    {!expand ? (
                        <img src="img/icons/ui/UI_Reward_Xiala.png" alt="V" />
                    ) : (
                        <img src="img/icons/ui/UI_Reward_Xiala02.png" alt="A" />
                    )}
                </div>
            </div>
            <div className={!expand ? 'hidden' : ''}>
                {children}
            </div>
        </>
    )
}
