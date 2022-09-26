
import React from 'react';

import { AppContext } from "../context/AppContext";
import { useContext,useState,useEffect } from "react";
import BuildSkillSlot from './BuildSkillSlot';
import { BuildContext } from '../context/BuildContext';


function BuildSkill2(props) {
    const {translate,sortAlpha,skills} = useContext(AppContext)
    const {changePrimarySecondary,setCurrentModalType,openModal,getSkillByPrimary} = useContext(BuildContext)
    let ind = props.ind;
    // let onChangeCurrentModalType = props.onChangeCurrentModalType;
    // let onChangeSupport=props.onChangeSupport;
    // const changePrimarySecondary = props.changePrimarySecondary
    // let onChangeSkill=props.onChangeSkill;
    // const openModal = props.openModal
    let tag = props.tag
    if(tag === undefined) {
        tag = "Active";
    }

    /* // energy 0 , 10 , 15 , 50 , 100 */
    const tabEnergy = [0,10,25,75,175];

    const [currentEnergyCost,setCurrentEnergyCost] = useState(0);
    const [skill,setSkill] = useState(null);
    const [isVisible,setIsVisible] = useState(false);
    
    
    
    const [tabSupport,setTabSupport] = useState([null,null,null,null,null,null]);
    const [isSupportVisible , setIsSupportVisible] = useState([false,false,false,false,false,false]);
    

    if(skills == null) {
        return null;
    }

    const onClickSkill = (primary,secondary) => {
        console.log("onClikSkill buildSkill2")
        console.log(primary,secondary);
        setCurrentModalType("Active");
        changePrimarySecondary(primary,secondary);
        openModal();
    }
    let currentSkill = getSkillByPrimary(ind);
    console.log("currentSkill",currentSkill,ind)
    return (
        <>
        
        <div className='grid grid-cols-5 grid-rows-4 relative border p-2'>
            {/* 1st line */}
            <div></div>
            <div></div>
            <BuildSkillSlot secondary={1} primary={ind} />
            <div></div>
            <div></div>

            {/* 2nd line */}
            <BuildSkillSlot secondary={2} primary={ind} />
            <div></div>
            {/* main skill */}
            <div className='flex flex-col items-center row-span-2 self-center'>
                <div onClick={() => onClickSkill(ind,0)} style={{fontSize:"80px"}} className='w-[6rem] h-[6rem] hover:cursor-pointer border rounded-full items-center justify-center flex flex-col'>
                    {Object.keys(currentSkill).length > 0 ? 
                        <div>
                            <img loading="lazy" src={`img/icons/skills/${currentSkill.img}.png`} className="w-[80px]" alt="Icon"/>
                        </div>
                        :
                        <div className='-mt-[14px]'>+</div>
                    }
                </div>
                {Object.keys(currentSkill).length > 0 ? <div className='text-sm'><span>{translate(currentSkill.label)}</span></div>:null}
            </div>
            <div></div>
            <BuildSkillSlot secondary={3} primary={ind}/>
            
            <div></div>
            <div></div>
            <div></div>
            <div></div>

            <div></div>
            <BuildSkillSlot secondary={4} primary={ind}/>
            <div></div>
            <BuildSkillSlot secondary={5} primary={ind}/>
            <div></div>
        </div>
        
        {skill !== null ?<div className='text-center'>Energy required : {tabEnergy[tabSupport.filter((e) => e !== null).length-1]|0}</div>:null}
        </>
    )
}
export default React.memo(BuildSkill2);