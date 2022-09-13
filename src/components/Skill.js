import React,{useContext} from "react";
import { AppContext } from "../context/AppContext";

function Skill({skill,index}) {
    const {translate} = useContext(AppContext)
    const displayAffixParam = (param,text) => {
        let myReturn = text;
        let p1Replace = "";
        let p2Replace = "";
        let p3Replace = "";
        if(param[0] !== undefined) {
            if(Array.isArray(param[0])) {
                p1Replace = param[0].find((e) => e.level = 1).value;
            } else {
                p1Replace = param[0];
            }
            if(myReturn !== undefined) {
                if(myReturn.indexOf("P2") > -1) {
                    p2Replace = p1Replace;
                }
                if(myReturn.indexOf("P3") > -1) {
                    p3Replace = p1Replace;
                }
            }
            
        }
        if(param[1] !== undefined) {
            if(Array.isArray(param[1])) {
                p2Replace = param[1].find((e) => e.level = 1).value;
            } else {
                p2Replace = param[1];
            }
        }

        if(p1Replace !== undefined && p1Replace.indexOf("-") === -1) {
            p1Replace = "+"+p1Replace;
        }
        if(p2Replace !== undefined && p2Replace.indexOf("-") === -1) {
            p2Replace = "+"+p2Replace;
        }
        if(p3Replace !== undefined && p3Replace.indexOf("-") === -1) {
            p3Replace = "+"+p3Replace;
        }
        myReturn = myReturn.replace("$P1$",p1Replace).replace("$+P1$%",p1Replace+"%").replace("$+P1$",p1Replace)
        myReturn = myReturn.replace("$P2$",p2Replace).replace("$+P2$%",p2Replace+"%").replace("$+P2$",p2Replace)
        myReturn = myReturn.replace("$P3$",p3Replace).replace("$+P3$%",p3Replace+"%").replace("$+P3$",p3Replace)
        let myReg = /<e[^>]*>(.*?)<\/e>/img;

        return myReturn.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>");
    }
    return (
    <div key={skill.id+"-"+index} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2'>
        <div className='flex flex-row gap-2 items-start'>
            <div><img src={`img/icons/skills/${skill.icon}.png`} className="w-[64px]" alt="Icon"/></div>
            <div className='flex flex-col'>
                <div className='title'>{translate(skill.name)}</div>
                <div className='flex gap-2'>
                {skill.tag.map((tag) => (
                    <div key={tag+"-"+skill.id} className='float-left border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>{tag}</div>
                ))}
                </div>
                <div className='text-red-400'>{translate(skill.weapon_restrict_description)}</div>
            </div>
        </div>
        
        <div className='flex flex-col gap'>
            <div>{translate(skill.description1)}</div>
            <div className="mb-2" dangerouslySetInnerHTML={{__html: translate(skill.detail)}}></div>
            {skill.affix.map((affix,i) => (
                <div key={skill.id+"-"+i}>
                    <div dangerouslySetInnerHTML={{__html: displayAffixParam(affix.param,affix.text)}}></div>
                    <div className='text-gray-400 grid grid-cols-8 gap-2 flex-wrap'>
                        {Array.isArray(affix.param) ? 
                            affix.param.map((p) => (
                                Array.isArray(p) ? 
                                p.sort((a,b) => parseInt(a.level) - parseInt(skill.level)).map((pdata) => (
                                    <div key={pdata.level+"-"+pdata.value}>(Level {pdata.level} : {pdata.value})</div>
                                ))
                                :null
                            ))
                        :null}
                    </div>    
                </div>
            ))}
            
        </div>
    </div>
    )
}

export default React.memo(Skill);