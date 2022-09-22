import profession from './../data/profession.json';
import talent from './../data/talent.json';
import React, {useContext,useEffect,useRef,useState} from 'react';
import { AppContext } from '../context/AppContext';
import {Tooltip} from 'flowbite-react'
import CoreTooltip from '../components/CoreTooltip';

function Talent() {
    const {translate,replaceTag} = useContext(AppContext);
    const [currentMainProf,setCurrentMainProf] = useState(null);
    const [spec1,setSpec1] = useState(null);
    const [spec2,setSpec2] = useState(null);

    const [currentTree,setCurrentTree] = useState(null);
    const [currentTreeOrder,setCurrentTreeOrder] = useState(null);
    
    const [encodeSpec,setEncodeSpec] = useState(null);
    /* {
        "spec" : currentMainProf.id,
        "spec1": spec1.id,
        "spec2": spec2.id,
        tree: ["1,1:3","1,2:1"], format position:value, : => separator
        tree1: [],
        tree2: []
    }*/
    const [mainProfPoint,setMainProfPoint] = useState({"nb": 0,"core1":null,"core2":null});
    const [spec1Point,setSpec1Point] = useState({"nb": 0,"core1":null,"core2":null});
    const [spec2Point,setSpec2Point] = useState({"nb": 0,"core1":null,"core2":null});
    
    const [mainProfStat,setMainProfStat] = useState(null);
    const [spec1Stat,setSpec1Stat] = useState(null);
    const [spec2Stat,setSpec2Stat] = useState(null);

    const [currentTreeSpec1,setCurrentTreeSpec1] = useState(null);
    const [currentTreeOrderSpec1,setCurrentTreeOrderSpec1] = useState(null);


    const [currentTreeSpec2,setCurrentTreeSpec2] = useState(null);
    const [currentTreeOrderSpec2,setCurrentTreeOrderSpec2] = useState(null);


    const talentStep = [0,3,6,9,12,15,18,21,24]

    const _setCurrentMainProf = (data) => {
        if(data == null) {
            setMainProfPoint({"nb": 0,"core1":null,"core2":null})
            setMainProfStat(null);
            setCurrentTree(null)
        }
        setCurrentMainProf(data);
    }
    const _setSpec1 = (data) => {
        if(data == null) {
            setSpec1Point({"nb": 0,"core1":null,"core2":null})
            setSpec1Stat(null);
            setCurrentTreeSpec1(null)
        }
        setSpec1(data);
    }
    const _setSpec2 = (data) => {
        if(data == null) {
            setSpec2Point({"nb": 0,"core1":null,"core2":null})
            setSpec2Stat(null);
            setCurrentTreeSpec2(null)
        }
        setSpec2(data);
    }
    const onProfValueChange = (e) => {
        setCurrentMainProf(profession.find((p) => p.id === e.target.value))
    }
    const onProf1ValueChange = (e) => {
        setSpec1(profession.find((p) => p.id === e.target.value));
    }
    const onProf2ValueChange = (e) => {
        setSpec2(profession.find((p) => p.id === e.target.value));
    }
    const onSpecCoreChange = (e,index) => {
        let temp = {...mainProfPoint}
        if(index === 1) {
            temp.core1 = e;
        }
        if(index === 2) {
            temp.core2 = e;
        }
        //this.refs.Tooltip.hide();
        setMainProfPoint(temp);
    }
    const onSpec1CoreChange = (e,index) => {
        let temp = {...spec1Point}
        if(index === 1) {
            temp.core1 = e;
        }
        if(index === 2) {
            temp.core2 = e;
        }
        //this.refs.Tooltip.hide();
        setSpec1Point(temp);
    }
    const onSpec2CoreChange = (e,index) => {
        let temp = {...spec2Point}
        if(index === 1) {
            temp.core1 = e;
        }
        if(index === 2) {
            temp.core2 = e;
        }
        //this.refs.Tooltip.hide();
        setSpec2Point(temp);
    }

    useEffect(() => {
        if(currentMainProf !== null)
            displayTalent()

    },[currentMainProf])

    useEffect(() => {
        computedStatFromTree()
    },[mainProfPoint])

    useEffect(() => {
        computedStatFromSpec1Tree()
    },[spec1Point])

    useEffect(() => {
        computedStatFromSpec2Tree()
    },[spec2Point])

    useEffect(() => {
        if(spec1 !== null)
            displayTalentSpec1()

    },[spec1])

    useEffect(() => {
        if(spec2 !== null)
            displayTalentSpec2()

    },[spec2])

    const displayTalent = () => {
        let talentId = currentMainProf.talent_id.split('|');
        let startId = talentId[0];
        let endId = talentId[1];
        let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
        setCurrentTree(currentTalent);
        setCurrentTreeOrder(test([...currentTalent]));
    }
    
    const displayTalentSpec1 = () => {
        let talentId = spec1.talent_id.split('|');
        let startId = talentId[0];
        let endId = talentId[1];
        let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
        setCurrentTreeSpec1(currentTalent);
        setCurrentTreeOrderSpec1(test([...currentTalent]));
    }
    const displayTalentSpec2 = () => {
        let talentId = spec2.talent_id.split('|');
        let startId = talentId[0];
        let endId = talentId[1];
        let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
        setCurrentTreeSpec2(currentTalent);
        setCurrentTreeOrderSpec2(test([...currentTalent]));
    }
    const removePoint = (e,object,current) => {
        e.preventDefault();
        let position = object.position
        let max = object.level_up_time
        let pointNeed = object.need_points;
        switch (current) {
            case "main":
                let _mainProfPoint = {...mainProfPoint}
                if(_mainProfPoint[position] === undefined) {
                    _mainProfPoint[position] = 0;
                }
                if(_mainProfPoint[position] > 0) {
                    _mainProfPoint[position] -= 1 
                    _mainProfPoint.nb--
                    setMainProfPoint(_mainProfPoint);
                }
                
                
                break;
            case "spec1":
                let _spec1Point = {...spec1Point}
                if(_spec1Point[position] === undefined) {
                    _spec1Point[position] = 0;
                }
                if(_spec1Point[position] > 0) {
                    _spec1Point[position] -= 1 
                    _spec1Point.nb -= 1 
                    setSpec1Point(_spec1Point);
                }
                
                break;
            case "spec2":
                let _spec2Point = {...spec2Point}
                if(_spec2Point[position] === undefined) {
                    _spec2Point[position] = 0;
                }
                if(_spec2Point[position] > 0) {
                    _spec2Point[position] -= 1 
                    _spec2Point.nb -= 1 
                    setSpec2Point(_spec2Point);
                }
                
                break;
            default:
                break;
        }
        // console.log(mainProfPoint)
        // console.log(spec1Point)
        // console.log(spec2Point)
    }
    const addPoint = (object,current) => {
        let max = object.level_up_time
        let pointNeed = parseInt(object.need_points);

        let position = object.position;
        switch (current) {
            case "main":
                let _mainProfPoint = {...mainProfPoint}
                if(_mainProfPoint[position] === undefined) {
                    _mainProfPoint[position] = 0;
                }

                
                if(_mainProfPoint[position] === parseInt(max)) {
                    console.log("already at max");
                } else {
                    if(pointNeed <= _mainProfPoint.nb) {
                        _mainProfPoint[position] += 1                     
                        _mainProfPoint.nb++
                        setMainProfPoint(_mainProfPoint);
                    } else {
                        console.log("not enought point");
                    }                    
                }
                break;
            case "spec1":
                let _spec1Point = {...spec1Point}
                if(_spec1Point[position] === undefined) {
                    _spec1Point[position] = 0;
                }
                if(_spec1Point[position] === parseInt(max)) {
                    console.log("already at max");
                } else {
                    if(pointNeed <= _spec1Point.nb) {
                    _spec1Point.nb++
                    _spec1Point[position] += 1 
                    setSpec1Point(_spec1Point);
                    } else {
                        console.log("not enought point");
                    }
                }
                break;
            case "spec2":
                let _spec2Point = {...spec2Point}
                if(_spec2Point[position] === undefined) {
                    _spec2Point[position] = 0;
                }
                if(_spec2Point[position] === parseInt(max)) {
                    console.log("already at max");
                } else {
                    if(pointNeed <= _spec2Point.nb) {
                    _spec2Point.nb++
                    _spec2Point[position] += 1 
                    setSpec2Point(_spec2Point);
                    } else {
                        console.log("not enought point");
                    }
                }
                break;
            default:
                break;
        }
        // console.log("mainProfPoint",mainProfPoint)
        // console.log("spec1Point",spec1Point)
        // console.log("spec2Point",spec2Point)
        // console.log("currentTree",currentTree)
        
    }
    const computedStatFromTree = () => {
        //mainProfPoint
        //currentTree
        let _mainProfStat = {}
        for (const [position, value] of Object.entries(mainProfPoint)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                if(value > 0) {
                    let currentNode = currentTree.find((e) => e.position === position);
                    let attr = currentNode.attr.split(';')
                    
                    attr.forEach((a) => {
                        if(_mainProfStat[a.split(':')[0]] === undefined) {
                            _mainProfStat[a.split(':')[0]] = 0
                        }
                        _mainProfStat[a.split(':')[0]] += (parseInt(value) * (parseInt(a.split(':')[1].replace("[","").replace("]",""))))
                    })                    
                }
            }
        }
        setMainProfStat(_mainProfStat);

    }
    const computedStatFromSpec1Tree = () => {
        let _spec1Stat = {}
        for (const [position, value] of Object.entries(spec1Point)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                if(value > 0) {
                    let currentNode = currentTreeSpec1.find((e) => e.position === position);
                    let attr = currentNode.attr.split(';')
                    
                    attr.forEach((a) => {
                        if(_spec1Stat[a.split(':')[0]] === undefined) {
                            _spec1Stat[a.split(':')[0]] = 0
                        }
                        _spec1Stat[a.split(':')[0]] += (parseInt(value) * (parseInt(a.split(':')[1].replace("[","").replace("]",""))))
                    })                    
                }
            }
        }
        setSpec1Stat(_spec1Stat);
    }
    const computedStatFromSpec2Tree = () => {
        let _spec2Stat = {}
        for (const [position, value] of Object.entries(spec2Point)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                if(value > 0) {
                    let currentNode = currentTreeSpec2.find((e) => e.position === position);
                    let attr = currentNode.attr.split(';')
                    
                    attr.forEach((a) => {
                        if(_spec2Stat[a.split(':')[0]] === undefined) {
                            _spec2Stat[a.split(':')[0]] = 0
                        }
                        _spec2Stat[a.split(':')[0]] += (parseInt(value) * (parseInt(a.split(':')[1].replace("[","").replace("]",""))))
                    })                    
                }
            }
        }
        setSpec2Stat(_spec2Stat);
    }
    const test = (currentTree) => {
        //"position": "3|1", line 3 , column 1
        let tabTalent = [];
        for(let x=1;x<=9;x++) {
            // line
            for(let y=1;y<= 9;y++) {
                //column
                let e = currentTree.find((e) => e.position === `${x}|${y}`)
                if(tabTalent[x] === undefined) {tabTalent[x] = []}
                if(tabTalent[x][y] === undefined) {tabTalent[x][y] = {}}
                tabTalent[x][y] = e;               
                
            }
        }
        // console.table(tabTalent);
        // console.log(tabTalent.length);
        // let needDelete = true;
        // for(let i=1;i<=9;i++) {
        //     if(tabTalent[9][i] !== undefined) {
        //         needDelete = false;
        //     }
        // }
        // if(needDelete) {
        //     for(let i=1;i<=9;i++) {
        //         tabTalent[i].splice(9,1)
        //     }
        // }
        // needDelete = true
        // for(let i=1;i<=9;i++) {
        //     if(tabTalent[8][i] !== undefined) {
        //         needDelete = false;
        //     }
        // }
        // if(needDelete) {
        //     for(let i=1;i<=9;i++) {
        //         tabTalent[i].splice(8,1)
        //     }
        // }
        
        return tabTalent
    }
    return (
        <div className='flex md:flex-row flex-col '>
            <div className='md:w-[20%] mr-2 gap-2 flex flex-col'>
                {currentMainProf !== null ? 
                    <div className='hover:cursor-pointer flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${currentMainProf.icon}.png`} alt="Icon"/></div>
                            <div>{translate(currentMainProf.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => _setCurrentMainProf(null)}>x</button></div>
                    </div>
                :<div>Select initial Profession</div>}
                {spec1 !== null ? 
                    <div className='hover:cursor-pointer flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec1.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${spec1.icon}.png`} alt="Icon"/></div>
                            <div>{translate(spec1.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => _setSpec1(null)}>x</button></div>
                    </div>
                :<div>Select Sub profession 1</div>}

                {spec2 !== null ? 
                    <div className='hover:cursor-pointer flex flex-row h-10 gap-2 items-center border bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec2.background.split('|')[0]}.png`}}>
                        <div className='flex flex-row gap-2'>
                            <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${spec2.icon}.png`} alt="Icon"/></div>
                            <div>{translate(spec2.name)}</div>
                        </div>
                        <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer' onClick={() => _setSpec2(null)}>x</button></div>
                    </div>
                :<div>Select Sub profession 2</div>}
            </div>
            <div className='w-full'>
                <div className='border border-green-600 bg-green-900 rounded-lg mb-2 p-2 flex flex-row gap-4 justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div><img loading="lazy" src="img/rightBtn.png" alt="Right click" style={{transform: 'rotateY(180deg)'}}/></div>
                        <div>add point</div>
                        <div><img loading="lazy" src="img/rightBtn.png" alt="Right click" /></div>
                        <div>remove point</div>
                    </div>                    
                    <div className='flex flex-row gap-2 items-center'>(for mobile : go on pc <img loading="lazy" src="/img/Kappa.png" style={{display: "inline-block"}} alt="Kappa"/> )</div>
                </div>
                <div className={`${currentMainProf === null ? "": "hidden"} text-center text-xl font-bold`}>Select initial Profession</div>
                <div className={`${currentMainProf === null ? "": "hidden"} grid grid-cols-1 md:grid-cols-3 gap-2 mb-2`}>
                    {profession.filter((p) => p.before_id === "0").map((p) => (
                        <div key={p.id} className='border p-2 rounded-lg shadow-lg '>
                            <div className='flex flex-col justify-between bg-no-repeat bg-right-top' style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}>
                                <div>
                                    <div><img loading="lazy" src={`img/icons/TalentIcon/${p.icon}.png`} alt="Icon"/></div>
                                    <div>{translate(p.name)}</div>
                                    <div dangerouslySetInnerHTML={{__html: replaceTag(translate(p.des).replaceAll("#4","").replace("|","<br>"))}}></div>
                                </div>
                                <div className='text-center'><input type="radio" value={p.id} checked={currentMainProf !== null && currentMainProf.id === p.id} name="profession" onChange={onProfValueChange}/></div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* SPEC 1 */}
                <div className={`${spec1 === null ? "": "hidden"} text-center text-xl font-bold`}>Select 2nd Profession</div>
                {profession.filter((p) => p.before_id === "0").map((p) => (
                    <div key={p.id} className={`${currentMainProf !== null && spec1 === null  ? "":"hidden"} subProf-${p.id} flex flex-col md:flex-row gap-2 mb-2`}>
                        {profession.filter((p2) => p2.before_id === p.id).map((subp) => (
                            <div key={p.id+"-"+subp.id} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}  className='bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg '>
                                <div className='text-center font-bold'>{translate(p.name)}</div>
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <div className='flex flex-col items-center'>
                                        <img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className='h-20' alt="Icon"/>
                                        <div className='text-center font-bold text-xl'>{translate(subp.name)}</div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: replaceTag(translate(subp.des).replaceAll("#4","").replace("|","<br>"))}}></div> 
                                </div>
                                <div className='text-center'><input type="radio" value={subp.id} checked={spec1 !== null && spec1.id === subp.id} name="profession1" onChange={onProf1ValueChange}/></div>
                            </div>
                        ))}
                    </div>
                ))}
                {/* SPEC 2 */}
                <div className={`${spec2 === null ? "": "hidden"} text-center text-xl font-bold`}>Select 3th Profession</div>
                {profession.filter((p) => p.before_id === "0").map((p) => (
                    <div key={p.id} className={`${currentMainProf !== null && spec2 === null && spec1 !== null  ? "":"hidden"} subProf-${p.id} flex flex-col md:flex-row gap-2 mb-2`}>
                        {profession.filter((p2) => p2.before_id === p.id).map((subp) => (
                            <div key={p.id+"-"+subp.id} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}  className={`${spec1 !== null && spec1.id === subp.id ? "grayscale text-gray-500":""} bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg `}>
                                <div className='text-center font-bold'>{translate(p.name)}</div>
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <div className='flex flex-col items-center'>
                                        <img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className={`h-20 ${spec1 !== null && spec1.id === subp.id ? "contrast-0":""}`} alt="Icon"/>
                                        <div className='text-center font-bold text-xl'>{translate(subp.name)}</div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{__html: replaceTag(translate(subp.des).replaceAll("#4","").replace("|","<br>"))}}></div> 
                                </div>
                                <div className='text-center'>{spec1 !== null && spec1.id === subp.id ? "":<input type="radio" value={subp.id} checked={spec2 !== null && spec2.id === subp.id} name="profession2" onChange={onProf2ValueChange}/>}</div>
                            </div>
                        ))}
                    </div>
                ))}

                {currentTree !== null ? 
                <div style={{backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf !== null ? currentMainProf.background.split('|')[0] :null}.png`}} className='bg-no-repeat bg-contain bg-right-top  border rounded-md shadow-lg p-2 mb-2 '>
                <div className='text-center flex flex-col justify-center'>
                    <div className='font-bold text-xl'>{translate(currentMainProf.name)}</div>
                    <div>Core Talent</div>
                    <hr className='self-center border-slate-600 mb-4 w-[50%]'></hr>
                </div>
                <div className='flex flex-row gap-4 justify-evenly'>
                    <div className='coreTalent flex flex-row gap-2'>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTree} mainProfPoint={mainProfPoint} onSpecCoreChange={onSpecCoreChange} coreNumber={1} spec={0}/>
                            </div>
                            <div>{mainProfPoint.nb} / {currentTree.filter((e) => e.position === "0|0").slice(0,3)[0].need_points}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTree} mainProfPoint={mainProfPoint} onSpecCoreChange={onSpecCoreChange} coreNumber={2} spec={0}/>                            
                            </div>
                            <div>{mainProfPoint.nb} / {currentTree.filter((e) => e.position === "0|0").slice(3)[0].need_points}</div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>Tree</div>
                <div className='text-center'>{mainProfPoint.nb}</div>
                <div className="flex flex-row gap-2 justify-between">
                    <div>
                        <div>STATS</div>
                        {mainProfStat != null ? 
                            <div className='flex flex-col'>
                            {Object.entries(mainProfStat).map(([affix,stat]) => (
                                <div key={affix} dangerouslySetInnerHTML={{__html: translate("affix_class|description|"+affix).replace("$P1$",stat).replace("$+P1$","+"+stat)}}></div>
                            ))}
                            </div>
                        :null}
                    </div>
                    <div>
                    {currentTreeOrder.map((line,x) => (
                        <div key={"line"+x} className='flex flex-row  justify-center items-center'>
                        {line.map((column,y) => (
                            <React.Fragment key={"column"+y}>
                            <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
                            <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                                {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                                {column !== undefined ? 
                                <Tooltip key={column.id} className='' content={<>
                                        {/* <div>ID: {column.id}</div><div>level up time {column.level_up_time}</div>
                                        <div>need points {column.need_points}</div>
                                        <div>before {column.before_id}</div>
                                        <div>position {column.position}</div> */}
                                        <div>{column.affix.map((affix) => (
                                            <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                                    ))}</div>                                
                                    </>} trigger="hover">
                                <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,"main")} onClick={() => addPoint(column,"main")}>
                                    <div><img loading="lazy" className={`${mainProfPoint[column.position] === undefined || mainProfPoint[column.position] === 0 ? "contrast-0":""} rounded-full border-4 w-[54px]`} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/></div>
                                    <div>{mainProfPoint[column.position] !== undefined ? mainProfPoint[column.position] : 0}/{column.level_up_time}</div>
                                </div>
                                </Tooltip>
                                :null}
                            </div>
                            </React.Fragment>
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
                :null}
                {currentTreeSpec1 !== null ? 
                <div style={{backgroundImage: `url("img/icons/TalentGodsIcon/${spec1 !== null ? spec1.background.split('|')[0] :null}.png`}} className='bg-no-repeat bg-contain bg-right-top border rounded-md shadow-lg p-2 mb-2'>
                <div className='text-center flex flex-col justify-center'>
                    <div className='font-bold text-xl'>{translate(spec1.name)}</div>
                    <div>Core Talent</div>
                    <hr className='self-center border-slate-600 mb-4 w-[50%]'></hr>
                </div>
                <div className='flex flex-row gap-4 justify-evenly'>
                    <div className='coreTalent flex flex-row gap-2'>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTreeSpec1} mainProfPoint={spec1Point} onSpecCoreChange={onSpec1CoreChange} coreNumber={1} spec={1}/>
                            </div>
                            <div>{spec1Point.nb} / {currentTreeSpec1.filter((e) => e.position === "0|0").slice(0,3)[0].need_points}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTreeSpec1} mainProfPoint={spec1Point} onSpecCoreChange={onSpec1CoreChange} coreNumber={2} spec={1}/>
                            </div>
                            <div>{spec1Point.nb} / {currentTreeSpec1.filter((e) => e.position === "0|0").slice(3)[0].need_points}</div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>Tree</div>
                <div className='text-center'>{spec1Point.nb}</div>
                <div className='flex flex-row justify-between'>
                    <div>
                        <div>STATS</div>
                        {spec1Stat != null ? 
                            <div className='flex flex-col'>
                            {Object.entries(spec1Stat).map(([affix,stat]) => (
                                <div key={affix} dangerouslySetInnerHTML={{__html: translate("affix_class|description|"+affix).replace("$P1$",stat).replace("$+P1$","+"+stat)}}></div>
                            ))}
                            </div>
                        :null}
                    </div>
                    <div>
                    {currentTreeOrderSpec1.map((line,x) => (
                        <div key={"line"+x} className='flex flex-row  justify-center items-center'>
                        {line.map((column,y) => (
                            <React.Fragment key={"column"+y}>
                            <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
                            <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                                {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                                {column !== undefined ? 
                                <Tooltip key={column.id} className='' content={<>
                                        {/* <div>ID: {column.id}</div><div>level up time {column.level_up_time}</div>
                                        <div>need points {column.need_points}</div>
                                        <div>before {column.before_id}</div>
                                        <div>position {column.position}</div> */}
                                        <div>{column.affix.map((affix) => (
                                            <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                                    ))}</div>                                
                                    </>} trigger="hover">
                                <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,"spec1")} onClick={() => addPoint(column,"spec1")}>
                                    <div><img loading="lazy" className={`${spec1Point[column.position] === undefined || spec1Point[column.position] === 0 ? "contrast-0":""} rounded-full  border-4 w-[54px]`} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/></div>
                                    <div>{spec1Point[column.position] !== undefined ? spec1Point[column.position] : 0}/{column.level_up_time}</div>
                                </div>
                                </Tooltip>
                                :null}
                            </div>
                            </React.Fragment>
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
                :null}
                {currentTreeSpec2 !== null ? 
                <div style={{backgroundImage: `url("img/icons/TalentGodsIcon/${spec2 !== null ? spec2.background.split('|')[0] :null}.png`}} className='bg-no-repeat bg-contain bg-right-top  border rounded-md shadow-lg p-2 mb-2'>
                <div className='text-center flex flex-col justify-center'>
                    <div className='font-bold text-xl'>{translate(spec2.name)}</div>
                    <div>Core Talent</div>
                    <hr className='self-center border-slate-600 mb-4 w-[50%]'></hr>
                </div>
                <div className='flex flex-row gap-4 justify-evenly'>
                    <div className='coreTalent flex flex-row gap-2'>
                    <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTreeSpec2} mainProfPoint={spec2Point} onSpecCoreChange={onSpec2CoreChange} coreNumber={1} spec={2}/>
                            </div>
                            <div>{spec2Point.nb} / {currentTreeSpec2.filter((e) => e.position === "0|0").slice(0,3)[0].need_points}</div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row justify-between'>
                                <CoreTooltip currentTree={currentTreeSpec2} mainProfPoint={spec2Point} onSpecCoreChange={onSpec2CoreChange} coreNumber={2} spec={2}/>
                            </div>
                            <div>{spec2Point.nb} / {currentTreeSpec2.filter((e) => e.position === "0|0").slice(3)[0].need_points}</div>
                        </div>
                    </div>
                </div>
                <div className='text-center'>Tree</div>
                <div className='text-center'>{spec2Point.nb}</div>
                <div className='flex flex-row justify-between'>
                    <div>
                        <div>STATS</div>
                        {spec2Stat != null ? 
                            <div className='flex flex-col'>
                            {Object.entries(spec2Stat).map(([affix,stat]) => (
                                <div key={affix} dangerouslySetInnerHTML={{__html: translate("affix_class|description|"+affix).replace("$P1$",stat).replace("$+P1$","+"+stat)}}></div>
                            ))}
                            </div>
                        :null}
                    </div>
                    <div>
                        {currentTreeOrderSpec2.map((line,x) => (
                            <div key={"line"+x} className='flex flex-row  justify-center items-center'>
                            {line.map((column,y) => (
                                <React.Fragment key={"column"+y}>
                                <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
                                <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                                    {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                                    {column !== undefined ? 
                                    <Tooltip key={column.id} className='' content={<>
                                            {/* <div>ID: {column.id}</div><div>level up time {column.level_up_time}</div>
                                            <div>need points {column.need_points}</div>
                                            <div>before {column.before_id}</div>
                                            <div>position {column.position}</div> */}
                                            <div>{column.affix.map((affix) => (
                                                <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                                        ))}</div>                                
                                        </>} trigger="hover">
                                    <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,"spec2")} onClick={() => addPoint(column,"spec2")}>
                                        <div><img loading="lazy" className={`${spec2Point[column.position] === undefined || spec2Point[column.position] === 0 ? "contrast-0":""} rounded-full  border-4 w-[54px]`} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/></div>
                                        <div>{spec2Point[column.position] !== undefined ? spec2Point[column.position] : 0}/{column.level_up_time}</div>
                                    </div>
                                    </Tooltip>
                                    :null}
                                </div>
                                </React.Fragment>
                            ))}
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                :null}
            </div>
            
        </div>
    )

}
export default Talent