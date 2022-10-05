import React, { useState,useContext, useEffect } from "react"
import Loader from "../components/Loader";
import { AppContext } from "../context/AppContext";
import { DebounceInput } from 'react-debounce-input'

function Modifier()
{
    const {modifiers} = useContext(AppContext);

    // eslint-disable-next-line
    const [mod,setMod] = useState(null);
    const [modTab,setModTab] = useState(null);
    const [name,setName] = useState("aaaaaaaaaa");
    let lastGroup = null;
    

    useEffect(() => {
        if(modifiers !== null) {
            let modTab = {};
            setMod(modifiers);
            modifiers.sort((a,b) => a.group - a.group).forEach((mod) => {
                if(lastGroup === null || lastGroup !== mod.group) {
                    if(modTab[mod.group] === undefined) {
                        modTab[mod.group] = [];    
                    }
                    modTab[mod.group].push(mod);
                }
            })
            setModTab(modTab);
        }
    // eslint-disable-next-line
    },[modifiers])
    const displayAffix = (modTab) => {
        if(modTab.affix[0] !== undefined) {
            if(modTab.affix[0].indexOf(") ") > -1) {
                return <div>{modTab.affix[0].split(') ')[1]}</div>
            }  else {
                return <div>{modTab.affix[0].split('%')[1]}</div>
            }
        }
        return null;       
    }
    if(modTab === null) {
        return (<Loader className='w-full container mx-auto max-h-40 flex'/>)
    }
    const onChangeName = (value) => {
        setName(value);
    }
    return (
        <>
            <DebounceInput value={name} className='w-auto bg-[#282828] border rounded border-slate-500' placeholder="Search modifiers by name..." debounceTimeout={500} onChange={event => (onChangeName(event.target.value))}/>
        
        <div>
            {Object.keys(modTab).map((e,i) => (
                <div className='flex flex-col' key={i}>
                    {modTab[e].length > 1 && modTab[e][0].affix.length > 0 && (modTab[e][0].affix[0].includes(name) || name === null) ? 
                    <div key={e} className='flex flex-row border border-red-900 p-2 justify-between'>
                        <div>
                            {displayAffix(modTab[e][0])}
                            <div>{modTab[e][0].group}</div>
                            <div>{modTab[e][0].id}</div>
                            
                        </div>
                        <div className='flex flex-col text-sm gap-2 w-1/2'>
                        {modTab[e].filter((m) => m.affix.length !== 0).map((mod) => (
                            <div key={mod.id} className='flex flex-col shadow-md shadow-black  p-2'>
                                {/* <div>ID: {mod.id} / Group : {mod.group}</div> */}
                                <div className='flex flex-col'>{mod.affix.map((a,index) => <div key={"affix"+index}>{a}</div>)}</div>
                                <div>TIER : {mod.tier}</div>
                                <div className='flex flex-row text-sm gap-2'>
                                    <div className='flex flex-col border-b border-t border-slate-700'>
                                        <div className='flex flex-row justify-between gap-2'>
                                            <div>drop Level</div>
                                            <div>{mod.drop_level}</div>
                                        </div>
                                        <div className='flex flex-row justify-between gap-2'>
                                            <div>drop weight</div>
                                            <div>{mod.drop_weight}</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col border-b border-t border-slate-700'>
                                        <div className='flex flex-row justify-between gap-2'>
                                            <div>forge level</div>
                                            <div>{mod.forge_level}</div>
                                        </div>
                                        <div className='flex flex-row justify-between gap-2'>
                                            <div>forge weight</div>
                                            <div>{mod.forge_weight}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    :null}
                </div>                
            ))}
        </div>
        </>
    )
}
export default Modifier;