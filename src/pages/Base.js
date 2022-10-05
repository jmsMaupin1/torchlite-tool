import React, { useState,useContext,useEffect } from "react"
import HyperLinkTooltip from "../components/HyperLinkTooltip";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { DebounceInput } from 'react-debounce-input'

function Base()
{
    const {translate,itemBase,en} = useContext(AppContext);

    // eslint-disable-next-line
    const [listType,setListType] = useState(null);
    const [currentType,setCurrentType] = useState(null);
    const [currentMinimumLevel,setCurrentMinimumLevel] = useState(null);
    const [currrentAttr,setCurrentAttr] = useState("");

    const typeForAttr = ["Chest","Feet","Hands","Head","Off hand"]
    const onChangeType = (e) => {
        if(e.target.value === "") {
            setCurrentType(null);    
        } else {
            setCurrentType(e.target.value);
        }
        setCurrentAttr("");
    }
    useEffect(() => {
        if(itemBase !== null) {
            let test = [...new Set(itemBase.map((x) => {return x.description2_display}))].sort();
            let tempType = test.filter((e) => e !== undefined && e.indexOf("|") === -1)
            setListType(tempType);
        }
    },[itemBase])

    const onChangeCurrentLevel = (value) => {
        if(value === "") {
            setCurrentMinimumLevel(null)
        } else {
            setCurrentMinimumLevel(value)
        }
    }
    const onChangeAttr = (e) => {
        if(e.target.value !== ""){
            setCurrentAttr(e.target.value)
        } else {
            setCurrentAttr("")
        }
    }

    if(itemBase === null || listType === null || en === null) {
        return (<Loader className='w-full container mx-auto max-h-40 flex'/>)
    }
    return (
        <>
        <div className='md:hidden title text-xl p-2 text-center border-b border-slate-500'>Base</div>
        <div className="flex flex-row">
            <div className='flex flex-row gap-2 items-center p-2'>
                <label>Type</label>
                <select onChange={onChangeType} className='w-auto bg-[#282828] border rounded border-slate-500'>
                    <option value=""> -- Select type --</option>
                    {listType.map((type,index) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className='flex flex-row gap-2 items-center p-2'>
                <label>Minimum Level require</label>
                <DebounceInput type="number" className='w-auto bg-[#282828] border rounded border-slate-500' placeholder="minimum Level..." debounceTimeout={500} onChange={event => (onChangeCurrentLevel(event.target.value))}/>
            </div>
            {currentType !== null && typeForAttr.includes(currentType) ?
            <div className='flex flex-row gap-2 items-center p-2'>
                <label>Attributes</label>
                <select value={currrentAttr} onChange={onChangeAttr} className='w-auto bg-[#282828] border rounded border-slate-500'>
                    <option value=""> -- Select attr --</option>
                    <option value={"INT"}>INT</option>
                    <option value={"DEX"}>DEX</option>
                    <option value={"STR"}>STR</option>                    
                </select>
            </div>
            :null}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mx-auto px-2'>
            {itemBase.filter((el) => el.type1 === "1" && el.icon !== "" && el.name !== translate(el.name) && (el.description2_display === currentType || currentType == null)).filter((e) => currentMinimumLevel === null || parseInt(e.require_level) >= parseInt(currentMinimumLevel)).filter((e) => currrentAttr === null || translate(e.description1).indexOf(currrentAttr) > -1).sort((a,b) => a.require_level - b.require_level).map((b) => (
                <div key={b.id} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div><img loading="lazy" src={`img/icons/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                        <div className='flex flex-col'>
                            <div className='title'>{translate(b.name)}</div>
                            <div className='border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>Require level {b.require_level}</div>
                            <div className='border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm'>{translate(b.description1)}</div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center'>
                    {b.suffix !== undefined && b.suffix !== [] ? 
                        b.suffix.map((s,i) => (
                            <HyperLinkTooltip key={"suffix-"+i} className='text-center' str={s}/>
                        ))
                     : null}
                    </div>
                    {/* position = "2/3" weapon, we don't display base_attr for  */}
                    {b.base_attr_display !== undefined && b.position.indexOf("2") === -1 && b.position.indexOf("2|3") === -1 ?
                    <div className=''>
                        <div className='base_list flex flex-col text-center'>
                            {b.base_attr_display.map((attr,i) => (
                                <div key={i}>{attr}</div>
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
export default Base;