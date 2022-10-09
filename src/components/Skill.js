import React,{useContext,useState} from "react";
import { AppContext } from "../context/AppContext";
import HyperLinkTooltip from "./HyperLinkTooltip";

function Skill({skill,index,showDetail}) {
    const {translate} = useContext(AppContext)
    const [showDetailLevel,setShowDetailLevel] = useState(false);
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
        if(p1Replace !== undefined && p1Replace.indexOf("/") > -1) {
            p1Replace = p1Replace.replace("1/2","0.5").replace("1/3","0.3","1/4","0.25","1/5","0.2");
        }
        if(p2Replace !== undefined && p2Replace.indexOf("/") > -1) {
            p2Replace = p2Replace.replace("1/2","0.5").replace("1/3","0.3","1/4","0.25","1/5","0.2");
        }
        if(p3Replace !== undefined && p3Replace.indexOf("/") > -1) {
            p3Replace = p3Replace.replace("1/2","0.5").replace("1/3","0.3","1/4","0.25","1/5","0.2");
        }
        myReturn = myReturn.replace("$P1$",p1Replace).replace("$+P1$%",p1Replace+"%").replace("$+P1$",p1Replace)
        myReturn = myReturn.replace("$P2$",p2Replace).replace("$+P2$%",p2Replace+"%").replace("$+P2$",p2Replace)
        myReturn = myReturn.replace("$P3$",p3Replace).replace("$+P3$%",p3Replace+"%").replace("$+P3$",p3Replace)
        //let myReg = /<e[^>]*>(.*?)<\/e>/img;

        return myReturn//.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>");
    }
    const changeDetailLevel = (e) => {
        setShowDetailLevel(!showDetailLevel);
    }
    if(skill === undefined) {
        return null;
    }
    return (
    <div key={skill.id+"-"+index} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2'>
        <div className='flex flex-row gap-2 items-start'>
            <div><img loading="lazy" src={`img/icons/skills/${skill.icon}.png`} className="w-[64px]" alt="Icon"/></div>
            <div className='flex flex-col'>
                <div className='title'>{translate(skill.name)}</div>
                <div className='flex gap-2 flex-wrap'>
                {skill.tag.map((tag) => (
                    <div key={tag+"-"+skill.id} className='float-left border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>{tag}</div>
                ))}
                </div>
                <div className='text-red-400 text-sm'>{translate(skill.weapon_restrict_description)}</div>
            </div>
        </div>
        <div className='flex flex-col gap'>
            <div className="flex flex-row justify-between">
                <div>{translate(skill.description1)}</div>
                {showDetail !== false &&
                <button className='p-1 text-[#f67370] border items-center flex rounded-md  px-2 font-bold bg-gradient-to-b from-[#222222] to-[#282828] border-[#111827]'>
                    <label className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" onChange={changeDetailLevel} className="sr-only peer" />
                        <div className="w-11 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show advanced stats</span>
                    </label>
                </button>
                }
            </div>
            {/* <div className="mb-2" dangerouslySetInnerHTML={{__html: translate(skill.detail)}}></div> */}
            <HyperLinkTooltip className="mb-2" str={translate(skill.detail)}/>
            {skill.affix.map((affix,i) => (
                <div key={skill.id+"-"+i}>
                    {/* <div dangerouslySetInnerHTML={{__html: displayAffixParam(affix.param,affix.text)}}></div> */}
                    <HyperLinkTooltip str={displayAffixParam(affix.param,affix.text)}/>
                    {showDetailLevel &&
                    <div className='text-gray-400 grid grid-cols-3 md:grid-cols-8 gap-2 flex-wrap'>
                        {Array.isArray(affix.param) &&
                            affix.param.map((p) => (
                                Array.isArray(p) &&
                                p.sort((a,b) => parseInt(a.level) - parseInt(skill.level)).map((pdata) => (
                                    <div key={pdata.level+"-"+pdata.value}>(Level {pdata.level} : {pdata.value})</div>
                                ))
                            ))
                        }
                    </div>
                    }
                </div>
            ))}
            {/* {showDetailLevel ? <div>
                <div className='title'>Damage multiplier</div>
                {skill.damage_effective.split(';').map((d) => (
                    <div className='flex flex-row gap-2 border-b border-slate-600 px-2'>
                        <div>Level {d.split(':')[0]}</div>
                        <div>{d.split(':')[d.split(':').length-1]}%</div>
                    </div>
                ))}
            </div>
            :null} */}
        </div>
    </div>
    )
}

export default React.memo(Skill);
