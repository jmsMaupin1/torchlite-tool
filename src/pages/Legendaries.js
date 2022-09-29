import React, { useState,useContext,useEffect} from "react"
import Legendary from "../components/Legendary";
import { AppContext } from "../context/AppContext";
import { DebounceInput } from 'react-debounce-input'
import Loader from "../components/Loader";

function Legendaries () {
    const {translate,itemGold,itemBase,en} = useContext(AppContext);
    
    // eslint-disable-next-line
    const [listType,setListType] = useState(null);
    const [currentType,setCurrentType] = useState(null);
    const [currentName,setCurrentName] = useState(null);
    const [currentAffix,setCurrentAffix] = useState(null);
    
    useEffect(() => {
        if(itemBase !== null) {
            let test = [...new Set(itemBase.map((x) => {return x.description2_display}))].sort();
            let tempType = test.filter((e) => e !== undefined && e.indexOf("|") === -1)
            setListType(tempType);
        }
        
    },[itemBase])

    const onChangeType = (e) => {
        if(e.target.value === "") {
            setCurrentType(null);    
        } else {
            setCurrentType(e.target.value);
        }
    }
    // const onChangeName = (e) => {
    //     const debouncedFilter = useCallback(debounce(() => {
    //         setCurrentName(e.target.value);
    //       }, 500),[])
        
    //     debouncedFilter()
    // }
    const onChangeName = (value) => {
        if(value === "") {
            setCurrentName(null);    
        } else {
            setCurrentName(value);
        }
        
    }

    const onChangeAffix = (value) => {
        if(value === "") {
            setCurrentAffix(null)
        } else {
            setCurrentAffix(value)
        }
        
    }
    const findBase = (e) => {
        let baseTemp = itemBase.find((b) => b.id === e.base_id);
        if(e.icon !== "" && (baseTemp.description2_display === currentType || currentType == null)){
            // filter for test item
            if(
                ((e.prefix[0] != null && e.prefix[0].tier1[0] === "(40-60) strength") && (e.prefix[1] != null && e.prefix[1].tier1[0] === "(40-60) strength"))
            || ((e.suffix[0] != null && e.suffix[0].tier1[0] === "(40-60) strength") && (e.suffix[1] != null && e.suffix[1].tier1[0] === "(40-60) strength"))
            ) {
                return false
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    const filterByName = (e) => {
        if(currentName != null) {
            if(translate(e.name).toLowerCase().indexOf(currentName.toLowerCase()) > -1){
                return true;
            } else {
                return false;
            }
        }  else {
            return true;
        }
    }
    
    if(listType == null || en == null || itemGold == null) {
        return (<Loader className='w-full container mx-auto max-h-40 flex'/>)
    }
    return (
        <>
        <div className='md:hidden title text-xl p-2 text-center border-b border-slate-500 mb-2'>Legendaries</div>
        <div className='flex flex-row gap-2 items-center mb-2 p-2'>
            <label>Type</label>
            <select onChange={onChangeType} className='w-auto bg-[#282828] border rounded border-slate-500'>
                <option value=""> -- Select type --</option>
                {listType.map((type,index) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <label>Name</label>
            <DebounceInput className='w-auto bg-[#282828] border rounded border-slate-500' placeholder="Search item by name..." debounceTimeout={500} onChange={event => (onChangeName(event.target.value))}/>
            <label>Affix</label>
            <DebounceInput className='w-auto bg-[#282828] border rounded border-slate-500' placeholder="Search item by affix" debounceTimeout={500} onChange={event => (onChangeAffix(event.target.value))}/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mx-auto p-2'>
            {itemGold.filter(findBase).filter(filterByName).sort((a,b) => a.require_level - b.require_level).map((b) => (
                <Legendary key={b.id} legendary={b} currentAffix={currentAffix} />
            ))}
        </div>
        </>
    )
}
export default Legendaries;