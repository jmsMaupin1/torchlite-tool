import { useContext,useState } from "react";
import { AppContext } from "../context/AppContext";
import {Tooltip} from 'flowbite-react'
import HyperLinkTooltip from "./HyperLinkTooltip";

function CoreTooltip(props) {
    const {translate} = useContext(AppContext);

    const [visible,setVisible] = useState(false);

    let currentTree = props.currentTree;
    let mainProfPoint = props.mainProfPoint;
    let onSpecCoreChange = props.onSpecCoreChange;
    let coreNumber = props.coreNumber;

    const returnSlice = () => {
        if(coreNumber === 1) {
            return currentTree.filter((e) => e.position === "0|0").slice(0,3)
        }
        if(coreNumber === 2) {
            return currentTree.filter((e) => e.position === "0|0").slice(3);
        }
    }
    const returnCoreNumber = () => {
        if(coreNumber === 1) {
            return mainProfPoint.core1
        }
        if(coreNumber === 2) {
            return mainProfPoint.core2;
        }
    }

    return (
    <>
        <div className={`absolute z-10 w-50 flex flex-row ${!visible ? "hidden":""}`}>
        {returnSlice().map((tree,index) => (
            <Tooltip key={tree.id+"-"+index} content={<div>{tree.affix.map((affix) => (
                    <HyperLinkTooltip key={affix} str={affix}/>
                ))}</div>}>
            <div onClick={() => {onSpecCoreChange(tree.id,coreNumber);setVisible(false)}} className={`bg-slate-900 border rounded-md p-2 hover:cursor-pointer items-center flex flex-col ${index === 2 ? 'mr-10':''} `}>
                <div><img loading="lazy" className='w-[54px]' src={`img/icons/CoreTalentIcon/${tree.icon}.png`} alt="Icon"/></div>
                <div>{translate(tree.name)}</div>
            </div>
            </Tooltip>
        ))}
        </div>
        {returnCoreNumber() != null ?
            currentTree.filter((e) => e.position === "0|0" && e.id === returnCoreNumber()).map((tree,index) => (
                <Tooltip key={tree.id+"-"+index} content={<div>{tree.affix.map((affix) => (
                    <HyperLinkTooltip key={affix} str={affix}/>
                ))}</div>}>
                <div onClick={() => setVisible(!visible)} className={`relative border rounded-md p-2 hover:cursor-pointer items-center flex flex-col ${index === 2 ? 'mr-10':''} `}>
                    <div><img loading="lazy" className='w-[54px]' src={`img/icons/CoreTalentIcon/${tree.icon}.png`} alt="Icon"/></div>
                    <div>{translate(tree.name)}</div>
                </div>     
                </Tooltip>                                   
            ))
        :
        <div onClick={() => setVisible(!visible)} style={{fontSize:"80px"}} className='grow-0 hover:cursor-pointer border rounded-full'>+</div>}
    </>
    )
}
export default CoreTooltip;