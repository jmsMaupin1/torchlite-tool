import React, { useState } from "react"
import skills from './../data/skills.json';
import en from './../data/en.json';

function Skills()
{
    const translate = (key) => {
        let data = en.find((e) => e.index === key);
        if(data !== undefined) {
            let myReg = /<e[^>]*>(.*?)<\/e>/img;
            return data.value.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>").replace("\\n","<br>");
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
    const popUpDisplay = (text) => {
        let myReg = /<e[^>]*>(.*?)<\/e>/img;
        if(text.indexOf("Dash forward twice") > -1) {
            console.log(text);
            console.log(text.replace(myReg,"$1"));
        }
        return text.replace(myReg,"$1")
        

    }
    const displayAffixParam = (param,text) => {
        let myReturn = text;
        let p1Replace = "";
        let p2Replace = "";
        if(param[0] !== undefined) {
            if(Array.isArray(param[0])) {
                p1Replace = param[0].find((e) => e.level = 1).value;
            } else {
                p1Replace = param[0];
            }
        }
        if(param[1] !== undefined) {
            if(Array.isArray(param[1])) {
                p2Replace = param[1].find((e) => e.level = 1).value;
            } else {
                p2Replace = param[1];
            }
        }
        if(p1Replace.indexOf("-") > -1) {

        } else {
            p1Replace = "+"+p1Replace;
        }
        if(p2Replace.indexOf("-") > -1) {

        } else {
            p2Replace = "+"+p2Replace;
        }
        myReturn = myReturn.replace("$P1$",p1Replace).replace("$+P1$%",p1Replace+"%").replace("$+P1$",p1Replace)
        myReturn = myReturn.replace("$P2$",p2Replace).replace("$+P2$%",p2Replace+"%").replace("$+P2$",p2Replace)
        let myReg = /<e[^>]*>(.*?)<\/e>/img;

        return myReturn.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>");
    }
    return (
        <>
        <div>
            <div className='flex flex-col mb-2'>
                <div className="flex flex-row gap-2">
                    <label className="text-white">Skill tag</label>
                    <select onChange={onChangeType} className="w-[40%]">
                        <option value={null}>Select tag</option>
                        {listType.map((type,i) => (
                            <option key={type+i} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-10 mx-auto'>
            {skills.filter((el) => el.detail !== "" && (el.tag.includes(currentType) || currentType == null)).map((b,index) => (
                <div key={b.id+"-"+index} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2'>
                    <div className='flex flex-row gap-2 items-start'>
                        <div><img src={`img/icons/skills/${b.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                        <div className='flex flex-col'>
                            <div className='title'>{b.name} {translate(b.name)}</div>
                            <div className='flex gap-2'>
                            {b.tag.map((tag) => (
                                <div key={tag+"-"+b.id} className='float-left border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>{tag}</div>
                            ))}
                            </div>
                            <div className='text-red-400'>{translate(b.weapon_restrict_description)}</div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap'>
                        <div>{translate(b.description1)}</div>
                        <div className="mb-2" dangerouslySetInnerHTML={{__html: translate(b.detail)}}></div>
                        {b.affix.map((affix,i) => (
                            <div key={b.id+"-"+i}>
                                
                                <div dangerouslySetInnerHTML={{__html: displayAffixParam(affix.param,affix.text)}}></div>
                                <div className='text-gray-400 flex flex-row gap-2'>
                                    {Array.isArray(affix.param) ? 
                                        affix.param.map((p) => (
                                            Array.isArray(p) ? 
                                            p.sort((a,b) => parseInt(a.level) - parseInt(b.level)).map((pdata) => (
                                                <div>(Level {pdata.level} : {pdata.value})</div>
                                            ))
                                            :null
                                        ))
                                    :null}
                                </div>    
                            </div>
                        ))}
                        
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}
export default Skills;