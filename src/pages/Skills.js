import React, { useContext, useEffect, useState } from "react"
import skills from './../data/skills.json';
import skillTag from './../data/skill_tag.json';
import { AppContext } from "../context/AppContext";
import Skill from "../components/Skill";
import { debounce } from "lodash";
import Loader from "../components/Loader";

function Skills()
{
    const {translate} = useContext(AppContext)
    let listTypeInit = [];
    skillTag.forEach((s) => {
        let myTranslate = translate(s.des);
        if(s.visible === "1" && myTranslate.indexOf("Abandoned") === -1) {
            listTypeInit.push(translate(s.des));
        }
    })
    listTypeInit.sort();
    
    const [skillList,setSkillList] = useState(skills.map((x) => {x.enabled = true;return x}));
    const [listType,setListType] = useState([...listTypeInit]);
    const [currentType,setCurrentType] = useState(null);
    const [currentName,setCurrentName] = useState(null);
    const [isLoading,setIsLoading] = useState(false);


    const onChangeType = (e) => {
        if(e.target.value === "") 
            setCurrentType(null);
        else
            setCurrentType(e.target.value);
    }
    const onChangeName = debounce(async (e) => {
        if(e.target.value === "") {
            setCurrentName(null);
        } else {
            setCurrentName(e.target.value);
        }
    },1000)

    useEffect(() => {
        computedSkillList();
        if(isLoading === true) {
            setIsLoading(false);
        }
    },[currentName,currentType])

    const computedSkillList = () => {
        let temp = [...skillList];
        temp = skillList.filter((el) => 
            el.detail !== "" && el.detail !== translate(el.detail) && (el.tag.includes(currentType) || currentType == null)
        );

        if(currentName !== null) {
            temp = temp.filter((el) => translate(el.name).toLowerCase().includes(currentName.toLowerCase()))
        }
        return temp;
    }
    return (
        <>
        <div>
            <div className='md:hidden title text-xl p-2 text-center border-b border-slate-500'>Skills</div>
            <div className='flex flex-col md:flex-row mb-2 gap-2 md:items-center p-2'>
                <div className="flex flex-col md:flex-row gap-2">
                    <label className="text-white">Skill tag</label>
                    <select onChange={onChangeType} className="bg-[#282828] border rounded border-slate-500 w-full md:w-auto">
                        <option value={""}>Select tag</option>
                        {listType.map((type,i) => (
                            <option key={type+i} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                    <label className="text-white">Skill </label>
                    <input onChange={(e) => {setIsLoading(true);onChangeName(e);}} placeholder={"Name of the skill..."} className="bg-[#282828] border rounded border-slate-500 pl-1" />
                </div>
                {isLoading ? <Loader text=""/>: null}
            </div>
        </div>
        
        <div className='grid grid-cols-1 gap-10 mx-auto p-2'>
            {computedSkillList().map((b,index) => (
                <Skill key={"skill"+index}skill={b} index={index}/>
            ))}
        </div>
        </>
    )
}
export default Skills;