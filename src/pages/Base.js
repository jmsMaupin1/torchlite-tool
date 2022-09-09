import React, { useState } from "react"
import base from './../data/item_base.json';
import en from './../data/en.json';

function Base()
{
    const translate = (key) => {
        let data = en.find((e) => e.index === key);
        if(data !== undefined) {
            return data.value;
        } else {
            return key;
        }
    }

    const [baseList,setBaseList] = useState(base.map((x) => {x.enabled = true;return x}));
    const [listType,setListType] = useState([...new Set(base.map((x) => {return x.weapon_type}))]);
    const [currentType,setCurrentType] = useState(null);

    const onChangeType = (e) => {
        setCurrentType(e.target.value);
    }
    return (
        <>
        <div>
            <div className='flex flex-col'>
            <select onChange={onChangeType}>
            {listType.map((type) => (
                <option key={type} value={type}>{translate(type)}</option>
            ))}
            </select>
            </div>
        </div>
        <div className='grid grid-cols-4 gap-10 mx-auto'>
            {base.filter((el) => el.icon !== "" && el.base_attr_display !== undefined && (el.weapon_type === currentType || currentType == null)).map((b) => (
                <div key={b.id} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div><img src={`img/icons/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                        <div className='flex flex-col'>
                            <div className='title'>{b.id} {translate(b.name)}</div>
                            <div className='border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>Require level {b.require_level}</div>
                            <div className='border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm'>{translate(b.description1)}</div>
                        </div>
                    </div>
                    
                    {b.base_attr_display !== undefined ?
                    <><div>Base stats : </div>
                    <div className='base_list flex flex-col'>
                        {b.base_attr_display.map((attr,i) => (
                            <div key={i}>{attr}</div>
                        ))}
                    </div>
                    </>
                    :null}
                </div>
            ))}
        </div>
        </>
    )
}
export default Base;