import React, {useContext,useEffect,useState} from 'react';
import { AppContext } from '../context/AppContext';
import CoreTooltip from '../components/CoreTooltip';
import BuildSkill2 from '../components/BuildSkill2';
import TalentNode from '../components/TalentNode';
import {Modal} from 'flowbite-react'
import Select, {createFilter} from 'react-select'
import { BuildContext } from '../context/BuildContext';
import {useSearchParams } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaShareAlt } from "react-icons/fa";
import {MdTouchApp} from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import HyperLinkTooltip from '../components/HyperLinkTooltip';
import Loader from '../components/Loader';

function Build() {
    const {translate,topMenu,sortAlpha,profession,skills,talent,en} = useContext(AppContext);
     // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const {closeModal,modalVisible,currentModalType,onChangeSkill,
        skill1,
        setSkill,
        skill2,
        skill3,
        skill4,
        skill5,skill6,skill7,skill8,modalValue} = useContext(BuildContext)
    const [currentMainProf,setCurrentMainProf] = useState(null);
    const [spec1,setSpec1] = useState(null);
    const [spec2,setSpec2] = useState(null);
    
    const [currentTree,setCurrentTree] = useState(null);
    const [currentTreeOrder,setCurrentTreeOrder] = useState(null);
    const [currentNodeFilter,setCurrentNodeFilter] = useState(null);
    
    const [buildUrl,setBuildUrl] = useState(null);
    /* {
        "spec" : currentMainProf.id,
        "spec1": spec1.id,
        "spec2": spec2.id,
        tree: ["1,1:3","1,2:1"], format position:value, : => separator
        tree1: [],
        tree2: []
    }*/

    // navigation
    const fieldRefSkills = React.useRef(null);
    const fieldRefMainProf = React.useRef(null);
    const fieldRefSelectMainProf = React.useRef(null);
    const fieldRefSpec1 = React.useRef(null);
    const fieldRefSelectSpec1 = React.useRef(null);
    const fieldRefSpec2 = React.useRef(null);
    const fieldRefSelectSpec2 = React.useRef(null);
    

    // modal for selected gems
    const [sticky,setSticky] = useState(false);
    
    
    // keep track of point
    
    const [mainProfPoint,setMainProfPoint] = useState({"nb": 0,"core1":null,"core2":null});
    const [spec1Point,setSpec1Point] = useState({"nb": 0,"core1":null,"core2":null});
    const [spec2Point,setSpec2Point] = useState({"nb": 0,"core1":null,"core2":null});
    
    
    // keep track of stat
    const [mainProfStat,setMainProfStat] = useState(null);
    const [spec1Stat,setSpec1Stat] = useState(null);
    const [spec2Stat,setSpec2Stat] = useState(null);

    // spec1 tree
    const [currentTreeSpec1,setCurrentTreeSpec1] = useState(null);
    const [currentTreeOrderSpec1,setCurrentTreeOrderSpec1] = useState(null);

    //spec2 tree
    const [currentTreeSpec2,setCurrentTreeSpec2] = useState(null);
    const [currentTreeOrderSpec2,setCurrentTreeOrderSpec2] = useState(null);

    // skills
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
        if(currentMainProf !== null){
            displayTalent()
        }
        // eslint-disable-next-line
    },[currentMainProf])

    useEffect(() => {
            computedStatFromTree()
            // eslint-disable-next-line
    },[mainProfPoint])

    useEffect(() => {
            computedStatFromSpec1Tree()
            // eslint-disable-next-line
    },[spec1Point])

    useEffect(() => {
            computedStatFromSpec2Tree()
            // eslint-disable-next-line
    },[spec2Point])

    useEffect(() => {
        if(spec1 !== null)
            displayTalentSpec1()
        // eslint-disable-next-line
    },[spec1])

    useEffect(() => {
        if(spec2 !== null)
            displayTalentSpec2()
        // eslint-disable-next-line
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
        //let max = object.level_up_time
        //let pointNeed = object.need_points;
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
                    toast.error("Already at max !")
                } else {
                    if(pointNeed <= _mainProfPoint.nb) {
                        _mainProfPoint[position] += 1                     
                        _mainProfPoint.nb++
                        setMainProfPoint(_mainProfPoint);
                    } else {
                        toast.error("Not enought points !")
                    }                    
                }
                break;
            case "spec1":
                let _spec1Point = {...spec1Point}
                if(_spec1Point[position] === undefined) {
                    _spec1Point[position] = 0;
                }
                if(_spec1Point[position] === parseInt(max)) {
                    toast.error("Already at max !")
                } else {
                    if(pointNeed <= _spec1Point.nb) {
                    _spec1Point.nb++
                    _spec1Point[position] += 1 
                    setSpec1Point(_spec1Point);
                    } else {
                        toast.error("Not enought points !")
                    }
                }
                break;
            case "spec2":
                let _spec2Point = {...spec2Point}
                if(_spec2Point[position] === undefined) {
                    _spec2Point[position] = 0;
                }
                if(_spec2Point[position] === parseInt(max)) {
                    toast.error("Already at max !")
                } else {
                    if(pointNeed <= _spec2Point.nb) {
                    _spec2Point.nb++
                    _spec2Point[position] += 1 
                    setSpec2Point(_spec2Point);
                    } else {
                        toast.error("Not enought points !")
                    }
                }
                break;
            default:
                break;
        }        
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
    const filterNode = (e) => {
        //console.log("filter",e.target.value);
        setCurrentNodeFilter(e.target.value);
    }
    // eslint-disable-next-line
    const handleScroll = () => {
        if(topMenu.current !== null)
            window.scrollY > topMenu.current.getBoundingClientRect().bottom ? setSticky(true): setSticky(false)
    }
    
    // This function handles the scroll performance issue
    // eslint-disable-next-line
    const debounce = (func, wait = 20, immediate = true) => {
        let timeOut
        return () => {
            let context = this,
            args = arguments
            const later = () => {
            timeOut = null
            if (!immediate) func.apply(context, args)
            }
            const callNow = immediate && !timeOut
            clearTimeout(timeOut)
            timeOut = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", debounce(handleScroll))
        return () => {
          window.removeEventListener("scroll", () => handleScroll)
        }
    }, [debounce, handleScroll])

    useEffect(() => {
        if(searchParams.get("skills") !== null && skills !== null && en !== null) {
            loadBuild();
        }
        // eslint-disable-next-line
    },[searchParams.get("skills"),skills,en])

    useEffect(() => {
        saveBuild();
    // eslint-disable-next-line
    },[skill1,skill2,skill3,skill4,skill5,skill6,skill7,skill8,currentMainProf,spec1,spec2,mainProfPoint,spec1Point,spec2Point])

    const saveBuild = () => {
        // skills
            let string = "skills="+skill1.skill.value+":"+skill1.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill2.skill.value !== undefined ? skill2.skill.value : 0)+":"+skill2.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill3.skill.value !== undefined ? skill3.skill.value : 0)+":"+skill3.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill4.skill.value !== undefined ? skill4.skill.value : 0)+":"+skill4.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill5.skill.value !== undefined ? skill5.skill.value : 0)+":"+skill5.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill6.skill.value !== undefined ? skill6.skill.value : 0)+":"+skill6.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill7.skill.value !== undefined ? skill7.skill.value : 0)+":"+skill7.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")+","
            string += (skill8.skill.value !== undefined ? skill8.skill.value : 0)+":"+skill8.support.map((e) => {return e.value !== undefined ? e.value : 0}).join("-")
            
        // specs
            string += "&specs="+(currentMainProf != null ? currentMainProf.id: 0)+","+(spec1 !== null ? spec1.id : 0)+","+(spec2 !== null ? spec2.id : 0)

        // tree point
        let tabMainTree = [];
        for (const [position, value] of Object.entries(mainProfPoint)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                tabMainTree.push(position+":"+value);
            }
        }
        string += "&trees=core1:"+mainProfPoint.core1+"-core2:"+mainProfPoint.core2+"-"+tabMainTree.join("-")+","

        
        let tabSpec1Tree = [];
        for (const [position, value] of Object.entries(spec1Point)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                tabSpec1Tree.push(position+":"+value);
            }
        }
        string += "core1:"+spec1Point.core1+"-core2:"+spec1Point.core2+"-"+tabSpec1Tree.join("-")+","

        let tabSpec2Tree = [];
        for (const [position, value] of Object.entries(spec2Point)) {
            if(position !== "nb" && position !== "core1" && position !== "core2") {
                tabSpec2Tree.push(position+":"+value);
            }
        }
        string += "core1:"+spec2Point.core1+"-core2:"+spec2Point.core2+"-"+tabSpec2Tree.join("-")
        
        const currentURL = window.location.href
        const pathname = window.location.pathname
        
        //tricks for github pages
        let prefix = "";
        if(currentURL.includes("th3conc3pt3ur.github.io")) {
            prefix = "/torchlight-helper"
        }

        let _buildUrl = currentURL.replace(pathname,"")+prefix+"/build?"+string;
        setBuildUrl(_buildUrl);
    }

    const loadBuild = () => {
        // load Skills
        // skill / support = {"value":"","label": "","img": ""}
        //const [skill1,setSkill1] = useState({skill: {},support: [{},{},{},{},{}]})

        let mySkills = searchParams.get("skills")
        let tabSkills = mySkills.split(',');
        tabSkills.forEach((skill,index) => {
            let tempSkill = skill.split(":");
            let mainSkill = tempSkill[0];
            let supportSkill = tempSkill[1].split('-')
            let dataSkill = skills.find((e) => e.id === mainSkill);
            supportSkill = supportSkill.map((supp) => {
                let currentSupp = skills.find((e) => e.id === supp);
                if(currentSupp === undefined) {
                    return {}
                } else {
                    return {"value":currentSupp.id,"label": translate(currentSupp.name),"img": currentSupp.icon}
                }
                
            })
            let currentSkill = null;
            if(dataSkill !== undefined) {
                currentSkill = {"skill": {"value": dataSkill.id,"label": translate(dataSkill.name),"img": dataSkill.icon},"support": supportSkill}
                setSkill((index+1),currentSkill)
            } else {
                setSkill((index+1),{skill: {},support: [{},{},{},{},{}]})
            }
        })
        
        // load Specs
        let mySpecs = searchParams.get('specs').split(',');
        let myMainSpec = profession.find((p) => p.id === mySpecs[0]);
        let mySpec1 = profession.find((p) => p.id === mySpecs[1]);
        let mySpec2 = profession.find((p) => p.id === mySpecs[2]);
        if(myMainSpec !== undefined) {
            setCurrentMainProf(myMainSpec)
            let talentId = myMainSpec.talent_id.split('|');
            let startId = talentId[0];
            let endId = talentId[1];
            let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
            setCurrentTree(currentTalent);
            setCurrentTreeOrder(test([...currentTalent]));

        }   
        if(mySpec1 !== undefined) {
            setSpec1(mySpec1)
            let talentId = mySpec1.talent_id.split('|');
            let startId = talentId[0];
            let endId = talentId[1];
            let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
            setCurrentTreeSpec1(currentTalent);
            setCurrentTreeOrderSpec1(test([...currentTalent]));
        }
        if(mySpec2 !== undefined){
            setSpec2(mySpec2)
            let talentId = mySpec2.talent_id.split('|');
            let startId = talentId[0];
            let endId = talentId[1];
            let currentTalent = talent.filter((t) => t.id <= endId && t.id >= startId);
            setCurrentTreeSpec2(currentTalent);
            setCurrentTreeOrderSpec2(test([...currentTalent]));
        }
            
        let myTrees = searchParams.get("trees").split(",")
        let _mainProfPoint = {"nb": 0,"core1":null,"core2":null}
        let _spec1Point = {"nb": 0,"core1":null,"core2":null}
        let _spec2Point = {"nb": 0,"core1":null,"core2":null}
        myTrees.forEach((tree,index) => {
            let data = tree.split('-');
            let cptPointMain = 0;
            let cptPointSpec1 = 0;
            let cptPointSpec2 = 0;
            
            data.forEach((node) => {
                if(node !== '') {
                    let temp = node.split(':');
                    let position = temp[0];
                    let value = temp[1];
                    if(value !== "0") {
                        if(index === 0) {
                            _mainProfPoint[position] = value
                            if(position !== "core1" && position !== "core2")
                                cptPointMain += parseInt(value);
                        }
                        if(index === 1) {
                            _spec1Point[position] = value
                            if(position !== "core1" && position !== "core2")
                                cptPointSpec1+= parseInt(value);
                        }
                        if(index === 2) {
                            _spec2Point[position] = value
                            if(position !== "core1" && position !== "core2")
                                cptPointSpec2+= parseInt(value);
                        }
                    }
                }
            })
            if(index === 0) 
                _mainProfPoint.nb = cptPointMain
            if(index === 1)
                _spec1Point.nb = cptPointSpec1
            if(index === 2)
                _spec2Point.nb = cptPointSpec2
        })
        setMainProfPoint(_mainProfPoint)
        setSpec1Point(_spec1Point)
        setSpec2Point(_spec2Point)
    }

    if(profession === null || en === null) {
        return (<Loader className='w-full container mx-auto max-h-40 flex'/>)
    }
    return (
        <div className='flex md:flex-row flex-col gap-2 p-2'>
            <ToastContainer theme={"dark"} autoClose={2000} />
            <div className={`md:w-[20%] gap-2 flex flex-col relative `}>
                <div className={`gap-2  flex flex-col ${sticky ? 'sticky top-2':''}`}>
                    <CopyToClipboard text={buildUrl} onCopy={() => toast.success("Build url copied !")}>
                        <button className='bg-[#282828] hover:bg-gray-900 border rounded-md h-10 flex flex-row gap-2 items-center px-2'><FaShareAlt /> Copy build url</button>
                    </CopyToClipboard>
                    <div onClick={() => fieldRefSkills.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between'>
                        <div className='flex flex-row gap-2 px-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <div>Skills</div>
                                {skill1.skill !== null && skill1.skill.img !== undefined ? <div><img loading="lazy" className='h-6' src={`img/icons/skills/${skill1.skill.img}.png`} alt="Icon"/></div>:null}
                                {skill2.skill !== null && skill2.skill.img !== undefined ? <div><img loading="lazy" className='h-6' src={`img/icons/skills/${skill2.skill.img}.png`} alt="Icon"/></div>:null}
                                {skill3.skill !== null && skill3.skill.img !== undefined ? <div><img loading="lazy" className='h-6' src={`img/icons/skills/${skill3.skill.img}.png`} alt="Icon"/></div>:null}
                                {skill4.skill !== null && skill4.skill.img !== undefined ? <div><img loading="lazy" className='h-6' src={`img/icons/skills/${skill4.skill.img}.png`} alt="Icon"/></div>:null}
                                {skill5.skill !== null && skill5.skill.img !== undefined ? <div><img loading="lazy" className='h-6' src={`img/icons/skills/${skill5.skill.img}.png`} alt="Icon"/></div>:null}
                            </div>
                        </div>
                    </div>
                    
                    {currentMainProf !== null ? 
                        <div onClick={() => fieldRefMainProf.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf.background.split('|')[0]}.png`}}>
                            <div className='flex flex-row gap-2'>
                                <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${currentMainProf.icon}.png`} alt="Icon"/></div>
                                <div>{translate(currentMainProf.name)}</div>
                            </div>
                            <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer hover:bg-gray-900' onClick={() => _setCurrentMainProf(null)}>x</button></div>
                        </div>
                    :<div onClick={() => fieldRefSelectMainProf.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2'>1. Select initial Profession</div>}
                    {spec1 !== null ? 
                        <div onClick={() => fieldRefSpec1.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec1.background.split('|')[0]}.png`}}>
                            <div className='flex flex-row gap-2'>
                                <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${spec1.icon}.png`} alt="Icon"/></div>
                                <div>{translate(spec1.name)}</div>
                            </div>
                            <div className='mr-2'><button className='text-gray-300 hover:cursor-pointer hover:bg-gray-900' onClick={() => _setSpec1(null)}>x</button></div>
                        </div>
                    :<div onClick={() => fieldRefSelectSpec1.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2'>2. Select Sub profession 1</div>}

                    {spec2 !== null ? 
                        <div onClick={() => fieldRefSpec2.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer flex flex-row h-10 gap-2 items-center border rounded-md bg-no-repeat bg-right-top justify-between' style={{backgroundSize: '50%',backgroundImage: `url("img/icons/TalentGodsIcon/${spec2.background.split('|')[0]}.png`}}>
                            <div className='flex flex-row gap-2'>
                                <div><img loading="lazy" className='h-6' src={`img/icons/TalentIcon/${spec2.icon}.png`} alt="Icon"/></div>
                                <div>{translate(spec2.name)}</div>
                            </div>
                            <div className='mr-2'><button className='text-gray-300 hover:bg-gray-900 hover:cursor-pointer' onClick={() => _setSpec2(null)}>x</button></div>
                        </div>
                    :<div onClick={() => fieldRefSelectSpec2.current.scrollIntoView()} className='bg-[#282828] hover:bg-gray-900 hover:cursor-pointer h-10 border rounded-md items-center flex flex-row p-2'>3. Select Sub profession 2</div>}
                    
                </div>
            </div>
            <div className='w-full'>
                {skills !== null ?
                <Modal className='dark' show={modalVisible} size="md" popup={true} onClose={closeModal}>
                    <Modal.Header>
                        Select skills
                    </Modal.Header>
                    <Modal.Body>
                        <div className=''>
                            <Select id="selectModal" className="w-full" classNamePrefix="select" menuIsOpen={true}
                                isClearable={true}
                                isSearchable={true}
                                captureMenuScroll={false}
                                filterOption={createFilter({ ignoreAccents: false })}
                                onChange={(e) => onChangeSkill(e)}
                                options={skills.filter((x) => (x.tag.includes(currentModalType) || currentModalType === "") && x.name !== translate(x.name)).sort(sortAlpha).map((s) => {return {"value":s.id,"label":translate(s.name),"img":s.icon}})}
                                formatOptionLabel={skill => (
                                    <div className="skill-option flex flex-row gap-2">
                                        <div><img loading="lazy" src={`img/icons/skills/${skill.img}.png`} className="w-[24px] aspect-square" alt="Icon"/></div>
                                        <div><span>{skill.label}</span></div>
                                    </div>
                                )}
                                value={modalValue}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                :null}
                
                <div className='flex flex-col'>
                    <div ref={fieldRefSkills} className={`mb-2 `}>
                        <div className={`text-center text-xl font-bold rounded-t-md bg-gradient-to-b from-yellow-400 to-yellow-600 text-black`}>Actives Skills</div>
                        <div className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2 rounded-b-md '>
                            {/* 5 actif skills */}
                            {[1,2,3,4,5].map((ind) => (
                                <BuildSkill2 key={"actif"+ind} ind={ind} tag="Active"/>
                            ))}
                        </div>
                        <div className={`mt-2 text-center text-xl font-bold rounded-t-md bg-gradient-to-b from-yellow-400 to-yellow-600 text-black`}>Passives Skills</div>
                        <div className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-2'>
                            {/* 3 passives skills */}
                            {[6,7,8].map((ind) => (
                                <BuildSkill2 key={"passives"+ind} ind={ind} tag="Passive"/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='border border-green-600 bg-green-900 rounded-lg mb-2 p-2 flex flex-row gap-4 justify-between'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div><img loading="lazy" src="img/rightBtn.png" alt="Right click" style={{transform: 'rotateY(180deg)'}}/></div>
                        <div>add point</div>
                        <div>
                            <img loading="lazy" className='hidden md:block' src="img/rightBtn.png" alt="Right click" />
                            <div><MdTouchApp className='md:hidden' alt="Long Press" /></div>
                        </div>
                        <div>remove point</div>
                    </div>
                </div>
                <div ref={fieldRefSelectMainProf} className={`${currentMainProf === null ? "": "hidden"} text-center text-xl font-bold`}>Select initial Profession</div>
                <div><input type="text" onChange={(e) => filterNode(e)} className={`w-auto bg-[#282828] border rounded border-slate-500 ${currentMainProf === null ? "hidden": "hidden"}`} placeholder={"Filter node..."} /></div>
                <div className={`${currentMainProf === null ? "": "hidden"} grid grid-cols-1 md:grid-cols-3 gap-2 mb-2`}>
                    {profession.filter((p) => p.before_id === "0").map((p) => (
                        <div key={p.id} className='bg-[#282828] border p-2 rounded-lg shadow-lg '>
                            <div className='bg-contain flex flex-col justify-between bg-no-repeat bg-right-top' style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}>
                                <div>
                                    <div><img loading="lazy" src={`img/icons/TalentIcon/${p.icon}.png`} alt="Icon"/></div>
                                    <div>{translate(p.name)}</div>
                                    <HyperLinkTooltip str={translate(p.des).replaceAll("#4","").replace("|","<br>")}/>
                                </div>
                                <div className='text-center'><input type="radio" value={p.id} checked={currentMainProf !== null && currentMainProf.id === p.id} name="profession" onChange={onProfValueChange}/></div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* SPEC 1 */}
                <div ref={fieldRefSelectSpec1} className={`${currentMainProf === null || spec1 !== null ? "hidden": ""} text-center text-xl font-bold`}>Select 2nd Profession</div>
                <div className={`${currentMainProf !== null && spec1 === null  ? "":"hidden"} subProf-${currentMainProf != null ? currentMainProf.id: ""} flex flex-col md:flex-row gap-2 mb-2`}>
                    {profession.filter((p) => currentMainProf !== null && p.before_id === currentMainProf.id).map((subp) => (
                        <div key={subp.id+"-"+subp.id} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${subp.background.split('|')[0]}.png`}}  className='bg-[#282828] bg-contain bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg '>
                            <div className='text-center font-bold'>{translate(subp.name)}</div>
                            <div className='flex flex-row justify-between items-center gap-4'>
                                <div className='flex flex-col items-center'>
                                    <img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className='h-20' alt="Icon"/>
                                    <div className='text-center font-bold text-xl'>{translate(subp.name)}</div>
                                </div>
                                <HyperLinkTooltip str={translate(subp.des).replaceAll("#4","").replace("|","<br>")}/>
                            </div>
                            <div className='text-center'><input type="radio" value={subp.id} checked={spec1 !== null && spec1.id === subp.id} name="profession1" onChange={onProf1ValueChange}/></div>
                        </div>
                    ))}
                </div>
                
                {/* SPEC 2 */}
                <div ref={fieldRefSelectSpec2} className={`${spec1 === null || spec2 !== null ? "hidden": ""} text-center text-xl font-bold`}>Select 3th Profession</div>
                {profession.filter((p) => p.before_id === "0").map((p) => (
                    <div key={p.id} className={`${currentMainProf !== null && spec2 === null && spec1 !== null  ? "":"hidden"} subProf-${p.id} flex flex-col md:flex-row gap-2 mb-2`}>
                        {profession.filter((p2) => p2.before_id === p.id).map((subp) => (
                            <div key={p.id+"-"+subp.id} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${p.background.split('|')[0]}.png`}}  className={`${spec1 !== null && spec1.id === subp.id ? "grayscale text-gray-500":""} bg-[#282828] bg-contain bg-no-repeat bg-right-top flex flex-col justify-between w-full md:w-[33%] border p-2 rounded-lg shadow-lg `}>
                                <div className='text-center font-bold'>{translate(p.name)}</div>
                                <div className='flex flex-row justify-between items-center gap-4'>
                                    <div className='flex flex-col items-center'>
                                        <img loading="lazy" src={`img/icons/TalentIcon/${subp.icon}.png`} className={`h-20 ${spec1 !== null && spec1.id === subp.id ? "contrast-0":""}`} alt="Icon"/>
                                        <div className='text-center font-bold text-xl'>{translate(subp.name)}</div>
                                    </div>
                                    <HyperLinkTooltip str={translate(subp.des).replaceAll("#4","").replace("|","<br>")}/>
                                </div>
                                <div className='text-center'>{spec1 !== null && spec1.id === subp.id ? "":<input type="radio" value={subp.id} checked={spec2 !== null && spec2.id === subp.id} name="profession2" onChange={onProf2ValueChange}/>}</div>
                            </div>
                        ))}
                    </div>
                ))}
                
                {currentTree !== null ? 
                <div ref={fieldRefMainProf} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${currentMainProf !== null ? currentMainProf.background.split('|')[0] :null}.png`}} className='bg-[#282828] bg-no-repeat bg-contain bg-right-top  border rounded-md shadow-lg p-2 mb-2 flex flex-col'>
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
                                //<div key={affix} dangerouslySetInnerHTML={{__html: translate("affix_class|description|"+affix).replace("$P1$",stat).replace("$+P1$","+"+stat)}}></div>
                                <HyperLinkTooltip key={affix} str={translate("affix_class|description|"+affix).replace("$P1$",stat).replace("$+P1$","+"+stat)}/>
                            ))}
                            </div>
                        :null}
                    </div>
                    <div>
                    {currentTreeOrder.map((line,x) => (
                        <div key={"line"+x} className='flex flex-row  justify-center items-center'>
                        {line.map((column,y) => (
                            <TalentNode search={currentNodeFilter} key={"talentNode"+y} type={"main"} column={column} y={y} profPoint={mainProfPoint} x={x} removePoint={removePoint} addPoint={addPoint} />
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
                :null}
                {currentTreeSpec1 !== null ? 
                <div ref={fieldRefSpec1} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${spec1 !== null ? spec1.background.split('|')[0] :null}.png`}} className='bg-[#282828] bg-no-repeat bg-contain bg-right-top border rounded-md shadow-lg p-2 mb-2'>
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
                            <TalentNode search={currentNodeFilter} key={"talentNode"+y} type={"spec1"} column={column} y={y} profPoint={spec1Point} x={x} removePoint={removePoint} addPoint={addPoint} />
                            // <React.Fragment key={"column"+y}>
                            // <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
                            // <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                            //     {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                            //     {column !== undefined ? 
                            //     <Tooltip key={column.id} className='' content={<>
                            //             {/* <div>ID: {column.id}</div><div>level up time {column.level_up_time}</div>
                            //             <div>need points {column.need_points}</div>
                            //             <div>before {column.before_id}</div>
                            //             <div>position {column.position}</div> */}
                            //             <div>{column.affix.map((affix) => (
                            //                 <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                            //         ))}</div>                                
                            //         </>} trigger="hover">
                            //     <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,"spec1")} onClick={() => addPoint(column,"spec1")}>
                            //         <div><img loading="lazy" className={`${spec1Point[column.position] === undefined || spec1Point[column.position] === 0 ? "contrast-0":""} rounded-full  border-4 w-[54px]`} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/></div>
                            //         <div>{spec1Point[column.position] !== undefined ? spec1Point[column.position] : 0}/{column.level_up_time}</div>
                            //     </div>
                            //     </Tooltip>
                            //     :null}
                            // </div>
                            // </React.Fragment>
                        ))}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
                :null}
                {currentTreeSpec2 !== null ? 
                <div ref={fieldRefSpec2} style={{backgroundImage: `url("img/icons/TalentGodsIcon/${spec2 !== null ? spec2.background.split('|')[0] :null}.png`}} className='bg-[#282828] bg-no-repeat bg-contain bg-right-top  border rounded-md shadow-lg p-2 mb-2'>
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
                                <TalentNode search={currentNodeFilter} key={"talentNode"+y} type={"spec2"} column={column} y={y} profPoint={spec2Point} x={x} removePoint={removePoint} addPoint={addPoint} />
                                // <React.Fragment key={"column"+y}>
                                // <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
                                // <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                                //     {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                                //     {column !== undefined ? 
                                //     <Tooltip key={column.id} className='' content={<>
                                //             {/* <div>ID: {column.id}</div><div>level up time {column.level_up_time}</div>
                                //             <div>need points {column.need_points}</div>
                                //             <div>before {column.before_id}</div>
                                //             <div>position {column.position}</div> */}
                                //             <div>{column.affix.map((affix) => (
                                //                 <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                                //         ))}</div>                                
                                //         </>} trigger="hover">
                                //     <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,"spec2")} onClick={() => addPoint(column,"spec2")}>
                                //         <div><img loading="lazy" className={`${spec2Point[column.position] === undefined || spec2Point[column.position] === 0 ? "contrast-0":""} rounded-full  border-4 w-[54px]`} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/></div>
                                //         <div>{spec2Point[column.position] !== undefined ? spec2Point[column.position] : 0}/{column.level_up_time}</div>
                                //     </div>
                                //     </Tooltip>
                                //     :null}
                                // </div>
                                // </React.Fragment>
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
export default Build