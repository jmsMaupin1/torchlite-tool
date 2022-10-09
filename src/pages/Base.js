import React, { useState,useContext,useEffect } from "react"
import { AppContext } from "../context/AppContext";
import BaseCard  from "../components/BaseCard";
import Loader from "../components/Loader";
import {formatArray} from "../utils/utils";
import { DebounceInput } from 'react-debounce-input'
import { ViewportList } from 'react-viewport-list';
import { useMediaQuery } from 'react-responsive';

function Base() {
    const {translate, itemBase,en} = useContext(AppContext);
    // eslint-disable-next-line
    const [listType,setListType] = useState(null);
    const [currentType,setCurrentType] = useState(null);
    const [currentMinimumLevel,setCurrentMinimumLevel] = useState(null);
    const [currrentAttr,setCurrentAttr] = useState("");
    const isMedium = useMediaQuery({ query: '(min-width: 768px)' });

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

    const filteredBase = itemBase.filter((el) => el.type1 === "1" && el.icon !== "" && el.name !== translate(el.name) && (el.description2_display === currentType || currentType == null)).filter((e) => currentMinimumLevel === null || parseInt(e.require_level) >= parseInt(currentMinimumLevel)).filter((e) => currrentAttr === null || translate(e.description1).indexOf(currrentAttr) > -1).sort((a,b) => a.require_level - b.require_level);

    //format Array for matching 2/4 items per chunks
    const formatedArray = formatArray(filteredBase, isMedium ? 4 : 2);

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
        <div className='grid grid-cols-1 gap-10 mx-auto'>
            <ViewportList
                items={formatedArray}
            >
                {(items, index) => {
                    return(
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-10 px-2' key={index}>
                            {
                                items.map((item, key) => {
                                    return <BaseCard cardData={item} key={key}/>
                                })
                            }
                        </div>
                    )
                }}
            </ViewportList>
        </div>
        </>
    )
}

export default Base;
