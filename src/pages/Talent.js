import profession from './../data/profession.json';
import talent from './../data/talent.json';
import {useContext,useState} from 'react';
import { AppContext } from '../context/AppContext';

function Talent() {
    const {translate,replaceTag} = useContext(AppContext);
    const [currentMainProf,setCurrentMainProf] = useState(null);
    const [spec1,setSpec1] = useState(null);
    const [spec2,setSpec2] = useState(null);

    const onProfValueChange = (e) => {
        setCurrentMainProf(profession.find((p) => p.id === e.target.value));
    }
    const onProf1ValueChange = (e) => {
        setSpec1(profession.find((p) => p.id === e.target.value));
    }
    const onProf2ValueChange = (e) => {
        setSpec2(profession.find((p) => p.id === e.target.value));
    }
    return (
        <div className='flex flex-row '>
            <div className='w-[20%] mr-2 gap-2 flex flex-col'>
                {currentMainProf !== null ? 
                    <div className='flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img className='h-6' src={`img/icons/TalentIcon/${currentMainProf.icon}.png`} alt="Icon"/></div>
                            <div>{translate(currentMainProf.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => setCurrentMainProf(null)}>x</button></div>
                    </div>
                :<div>Select initial Profession</div>}
                {spec1 !== null ? 
                    <div className='flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec1.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img className='h-6' src={`img/icons/TalentIcon/${spec1.icon}.png`} alt="Icon"/></div>
                            <div>{translate(spec1.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => setSpec1(null)}>x</button></div>
                    </div>
                :<div>Select Sub profession 1</div>}

                {spec2 !== null ? 
                    <div className='flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec2.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img className='h-6' src={`img/icons/TalentIcon/${spec2.icon}.png`} alt="Icon"/></div>
                            <div>{translate(spec2.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => setSpec2(null)}>x</button></div>
                    </div>
                :<div>Select Sub profession 2</div>}
            </div>
            <div>
                <div className={`${currentMainProf === null ? "": "hidden"} grid grid-cols-3 gap-2 mb-2`}>
                    {profession.filter((p) => p.before_id === "0").map((p) => (
                        <div key={p.id} className='border p-2 rounded-lg shadow-lg '>
                            <div className='flex flex-col justify-between bg-no-repeat bg-right-top' style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}>
                                <div>
                                    <div><img src={`img/icons/TalentIcon/${p.icon}.png`} alt="Icon"/></div>
                                    <div>{translate(p.name)}</div>
                                    <div dangerouslySetInnerHTML={{__html: replaceTag(translate(p.des).replaceAll("#4","").replace("|","<br>"))}}></div>
                                </div>
                                <div className='text-center'><input type="radio" value={p.id} checked={currentMainProf !== null && currentMainProf.id === p.id} name="profession" onChange={onProfValueChange}/></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {profession.filter((p) => p.before_id === "0").map((p) => (
                    <div key={p.id} className={`${currentMainProf !== null && spec1 === null  ? "":"hidden"} subProf-${p.id} flex flex-row gap-2 mb-2`}>
                        {profession.filter((p2) => p2.before_id === p.id).map((subp) => (
                            <div style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}} key={p.id+"-"+subp.id} className='bg-no-repeat bg-right-top flex flex-col justify-between w-[33%] border p-2 rounded-lg shadow-lg '>
                                <div className='text-center font-bold'>{translate(p.name)}</div>
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <div className='flex flex-col items-center'>
                                        <img src={`img/icons/TalentIcon/${subp.icon}.png`} className='h-20' alt="Icon"/>
                                        <div className='text-center font-bold text-xl'>{translate(subp.name)}</div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: replaceTag(translate(subp.des).replaceAll("#4","").replace("|","<br>"))}}></div> 
                                </div>
                                <div className='text-center'><input type="radio" value={subp.id} checked={spec1 !== null && spec1.id === subp.id} name="profession1" onChange={onProf1ValueChange}/></div>
                            </div>
                        ))}
                    </div>
                ))}
                {profession.filter((p) => p.before_id === "0").map((p) => (
                    <div key={p.id} className={`${currentMainProf !== null && spec2 === null && spec1 !== null  ? "":"hidden"} subProf-${p.id} flex flex-row gap-2 mb-2`}>
                        {profession.filter((p2) => p2.before_id === p.id).map((subp) => (
                            <div style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}} key={p.id+"-"+subp.id} className='bg-no-repeat bg-right-top flex flex-col w-[33%] border p-2 rounded-lg shadow-lg '>
                                <div className='flex justify-center'><img src={`img/icons/TalentIcon/${subp.icon}.png`} alt="Icon"/></div>
                                <div className='text-center'>{translate(subp.name)}</div>
                                <div dangerouslySetInnerHTML={{__html: replaceTag(translate(subp.des).replaceAll("#4","").replace("|","<br>"))}}></div> 
                                <div className='text-center'><input type="radio" value={subp.id} checked={spec2 !== null && spec2.id === subp.id} name="profession2" onChange={onProf2ValueChange}/></div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            
        </div>
    )

}
export default Talent