import React, { useState } from 'react'
import CollapsibleCard from './CollapsibleCard';
import HyperLinkTooltip from '../HyperLinkTooltip';

export default function EmberCardNew({ember, selectedBase}) {
    const [showMod, setShowMod] = useState(false);
    const [showTiers, setShowTiers] = useState(false);

    return (
        <div className="bg-[#222] shadow-lg shadow-black rounded px-2">
            <CollapsibleCard
                img={`img/icons/${ember.icon}.png`}
                title={ember.name}
            >
                {Object.keys(ember.mods).map(key => (
                    <div className='flex flex-row justify-between border border-[#333] w-full gap-2 bg-[#222] shadow-lg shadow-black rounded'>
                        <div className='w-full'>
                        <CollapsibleCard ember={ember} mod={ember.mods[key]}>
                            {ember.mods[key].tiers.map((tier, idx) => (
                                <div key={module.id + idx} className="flex flex-row items-center justify-between shadow-sm shadow-black border-[#333] p-1 m-1">
                                    <div className='flex gap-2 m-1 items-center'>
                                        <div className={`lozange t${tier.tier} aspect-square ml-2`}></div>
                                        <div>T{tier.tier}</div>
                                        <HyperLinkTooltip str={tier.affix}/>
                                    </div>
                                    <div className='flex flex-row items-center gap-1'>
                                        <div className='flex flex-col items-center border border-[#333] px-2 text-sm'>
                                            <div>iLvl</div>
                                            <div>{tier.required_level}</div>
                                        </div>
                                        <div className='flex flex-col items-center border border-[#333] px-2 text-sm'>
                                            <div>Weight</div>
                                            <div>{tier.weight}</div>
                                        </div>
                                        <div className='flex flex-col items-center border border-[#333] px-2 text-sm'>
                                            <div>Hit %</div>
                                            <div>{(tier.weight * 100 / ember.mods[key].weight).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CollapsibleCard>
                        </div>
                    </div>
                ))}
            </CollapsibleCard>
        </div>
    )
}
