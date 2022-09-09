import React, { useState } from "react"
import skills from './../data/skills.json';
import en from './../data/en.json';

function Skills()
{
    const translate = (key) => {
        let data = en.find((e) => e.index === key);
        if(data !== undefined) {
            return data.value;
        } else {
            return key;
        }
    }
    let listTypeInit = [];
    skills.forEach((skill) => {
        skill.tag.forEach((t) => {
            listTypeInit.push(t);
        })
    })

    const [skillList,setSkillList] = useState(skills.map((x) => {x.enabled = true;return x}));
    const [listType,setListType] = useState([...new Set(listTypeInit)]);
    const [currentType,setCurrentType] = useState(null);

    const onChangeType = (e) => {
        setCurrentType(e.target.value);
    }
    return (
        <>
        <div>
            <div className='flex flex-col'>
            <select onChange={onChangeType}>
            <option value={null}>Select tag</option>
            {listType.map((type) => (
                <option key={type} value={type}>{type}</option>
            ))}
            </select>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-10 mx-auto'>
            {skills.filter((el) => el.detail !== "" && (el.tag.includes(currentType) || currentType == null)).map((b) => (
                <div key={b.id} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2'>
                    <div className='flex flex-row gap-2 items-start'>
                        <div><img src={`img/icons/skills/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                        <div className='flex flex-col'>
                            <div className='title'>{b.skillId} {translate(b.name)}</div>
                            <div className='flex gap-2'>
                            {b.tag.map((tag) => (
                                <div className='float-left border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>{tag}</div>
                            ))}
                            </div>
                            <div className='text-red-400'>{translate(b.weapon_restrict_description)}</div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col'>
                        <div>{translate(b.description1)}</div>
                        <div>{translate(b.detail)}</div>
                        {b.affix.map((affix) => (
                            <div>{(affix)}</div>
                        ))}
                        
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Skills;