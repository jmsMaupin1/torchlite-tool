
import React from 'react';
import Select, {createFilter} from 'react-select'
import { AppContext } from "../context/AppContext";
import { useContext,useState,useEffect } from "react";

import SelectWithImage from './SelectWithImage';

function BuildSkill(props) {
    const {translate,sortAlpha,skills} = useContext(AppContext)
    let ind = props.ind;
    let onChangeSupport=props.onChangeSupport;
    let onChangeSkill=props.onChangeSkill;
    let tag = props.tag
    if(tag === undefined) {
        tag = "Active";
    }

    /* // energy 0 , 10 , 15 , 50 , 100 */
    const tabEnergy = [0,10,25,75,175];

    const [currentEnergyCost,setCurrentEnergyCost] = useState(0);
    const [skill,setSkill] = useState(null);

    const [tabSupport,setTabSupport] = useState([null,null,null,null,null,null]);

    const _onChangeSupport = (e,ind,index)  => {
        let temp = [...tabSupport];
        if(e == null) {
            temp[index] = null;
        } else {
            temp[index] = e.value;
        }
        
        onChangeSupport(e,ind,index)
        setTabSupport(temp);
    }
    const _onChangeSkill = (e,ind) => {
        setSkill(e.value);
        onChangeSkill(e,ind);
    }

    return (
        <>
        <div className='flex flex-row gap-2'>
            <div className='basis-1/3'>
            <Select className="w-full" classNamePrefix="select" onChange={(e) => _onChangeSkill(e,ind)}
                isClearable={true}
                isSearchable={true}
                captureMenuScroll={false}
                filterOption={createFilter({ ignoreAccents: false })}
                placeholder={"Select Skill "+ ind+"..."}
                name={"skill"+ind}
                options={skills.filter((x) => x.tag.includes(tag) && x.name !== translate(x.name)).sort(sortAlpha).map((s) => {return {"value":s.id,"label":translate(s.name),"img":s.icon}})}
                formatOptionLabel={skill => (
                    <div className="skill-option flex flex-row gap-2">
                        <div><img loading="lazy" src={`img/icons/skills/${skill.img}.png`} className="w-[24px]" alt="Icon"/></div>
                        <div><span>{skill.label}</span></div>
                    </div>
                )}
            />
            
            
            </div>
            {skill !== null ?
            <div className='grid grid-cols-2 w-full'>
            {[1,2,3,4,5].map((index) => (
                <div key={index} className='w-full'>
                    <SelectWithImage index={index} ind={ind} onChange={_onChangeSupport}/>
                </div>
            ))}
            </div>
            :<div className='w-full'></div>}
        </div>
        
        {skill !== null ?<div className='text-center'>Energy required : {tabEnergy[tabSupport.filter((e) => e !== null).length-1]|0}</div>:null}
        </>
    )
}
export default React.memo(BuildSkill);