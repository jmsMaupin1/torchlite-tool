import React, { useState} from "react"
import gold from './../data/item_gold.json';
import base from './../data/item_base.json';
import Legendary from "../components/Legendary";

function Legendaries () {
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
    const findBase = (e) => {
        let baseTemp = base.find((b) => b.id === e.base_id);
        console.log(baseTemp.description2_display);
        if(e.icon !== "" && (baseTemp.description2_display === currentType || currentType == null)){
            return true;
        } else {
            return false;
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
        <div className='grid grid-cols-3 gap-10 mx-auto'>
            {gold.filter(findBase).sort((a,b) => a.require_level - b.require_level).map((b) => (
                <Legendary key={b.id} legendary={b}/>
            ))}
        </div>
        </>
    )
}
export default Legendaries;