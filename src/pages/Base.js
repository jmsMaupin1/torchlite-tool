import React, { useState,useContext } from "react"
import base from './../data/item_base.json';
import en from './../data/en.json';
import { AppContext } from "../context/AppContext";

function Base()
{
    const {translate,replaceTag} = useContext(AppContext);

    let typeUniq = [...new Set(base.map((x) => {return x.weapon_type}))]
    let test = [...new Set(base.map((x) => {return x.description2_display}))].sort();
    let tempType = test.filter((e) => e !== undefined && e.indexOf("|") === -1)
    
    const [listType,setListType] = useState(tempType);
    const [currentType,setCurrentType] = useState(null);

    const onChangeType = (e) => {
        if(e.target.value === "") {
            setCurrentType(null);    
        } else {
            setCurrentType(e.target.value);
        }
    }
    return (
        <>
        <div className='flex flex-row gap-2 items-center mb-2'>
            <label>Type</label>
            <select onChange={onChangeType} className='w-auto bg-[#282828] border rounded border-slate-500'>
                <option value=""> -- Select type --</option>
                {listType.map((type,index) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
        <div className='grid grid-cols-4 gap-10 mx-auto'>
            {base.filter((el) => el.type1 == "1" && el.icon !== "" && el.name != translate(el.name) && (el.description2_display === currentType || currentType == null)).sort((a,b) => a.require_level - b.require_level).map((b) => (
                <div key={b.id} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div><img loading="lazy" src={`img/icons/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                        <div className='flex flex-col'>
                            <div className='title'>{translate(b.name)}</div>
                            <div className='border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>Require level {b.require_level}</div>
                            <div className='border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm'>{translate(b.description1)}</div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                    {b.suffix !== undefined && b.suffix !== [] ? 
                        b.suffix.map((s,i) => (
                            <div key={"suffix-"+i} className='text-center' dangerouslySetInnerHTML={{__html: replaceTag(s)}}></div>
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