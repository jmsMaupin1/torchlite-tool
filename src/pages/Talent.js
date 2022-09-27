
import React, {useContext,useState} from 'react';
import { AppContext } from '../context/AppContext';
import profession from './../data/profession.json';
import talent from './../data/talent.json';

function Talent() {
    const {translate,replaceTag} = useContext(AppContext);
    const [currentClass,setCurrentClass] = useState(null);

    const displayCore = (_currentProf) => {
        let talentId = _currentProf.talent_id.split('|');
        let startId = talentId[0];
        let endId = talentId[1];
        let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId && t.position === "0|0");
        return currentTalent;
    }
    const onChangeClass = (e) => {
        if(e.target.value === "") {
            setCurrentClass(null);    
        } else {
            setCurrentClass(e.target.value);
        }
        
    }

    return (
        <div className='flex flex-col container p-2'>
            <div className='flex flex-row items-center gap-2 mb-2'>
                <label>Select class</label><select onChange={onChangeClass} className='w-auto bg-[#282828] border rounded border-slate-500'>
                    <option value=""> -- Select Class --</option>
                    {profession.filter((p) => p.before_id === "0").map((p) => (
                        <option key={p.id} value={p.id}>{translate(p.name)}</option>                        
                    ))}
                </select>
            </div>
            {profession.filter((e) => (e.id === currentClass || e.before_id === currentClass) || currentClass== null).map((subp) => (
                <div key={subp.id} className={`subProf-${subp.id} flex flex-col md:flex-row mb-2 w-full`}>
                    <div className={`relative flex flex-row justify-between border p-2 rounded-lg shadow-lg bg-no-repeat bg-contain bg-right-top`} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${subp.background.split('|')[0]}.png")`}}>
                        <div className='flex flex-col items-center w-1/5'>
                            <div className='text-center font-bold text-xl title'>{translate(subp.name)}</div>
                            <img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className={`h-20`} alt="Icon"/>
                            <div dangerouslySetInnerHTML={{__html: replaceTag(translate(subp.des).replaceAll("#4","").replace("|","<br>"))}}></div> 
                        </div>
                        <div className='grid grid-cols-3 gap-2 w-4/5'>
                            {displayCore(subp).map((tree) => (
                                <div key={tree.id} className='shadow-2xl border-[#212121] border p-2'>
                                    <div className='flex flex-row gap-4 items-center border-b border-[#212121] pb-1 mb-1'>
                                        <img loading="lazy" className='w-[54px]' src={`img/icons/CoreTalentIcon/${tree.icon}.png`} alt="Icon"/>
                                        <div className='title'>{translate(tree.name)}</div>
                                    </div>
                                    
                                    <div>
                                        {tree.affix.map((affix) => (
                                            <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                                        ))}
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )

}
export default Talent