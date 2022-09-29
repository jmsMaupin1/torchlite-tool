
import React,{useContext,useState,useEffect} from 'react';
import {Tooltip} from 'flowbite-react'
import { AppContext } from '../context/AppContext';
import HyperLinkTooltip from './HyperLinkTooltip';

function TalentNode(props)
{
    const column = props.column;
    const y = props.y
    const x = props.x
    const type = props.type
    const removePoint = props.removePoint
    const addPoint = props.addPoint;
    const profPoint= props.profPoint;
    const search = props.search

    const [isHightlight,setIsHightlight] = useState(false);
    let shouldHl = false;

    useEffect(() => {
        if(column !== undefined && column.affix !== undefined && search !== null)
        {
            column.affix.forEach((a) => {
                if(a.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    // eslint-disable-next-line
                    shouldHl = true;
                }
            })
        }
        setIsHightlight(shouldHl);
    },[search])

    return (
        <React.Fragment key={"column"+y}>
            <div className={`separator w-[54px] h-[1px] ${column !== undefined && column.before_id !== "" ? "border -mt-1":"" }`}></div>
            <div className={`flex flex-col justify-between min-w-[54px] ${(x-1) === 0 ? "place-self-start items-center" : ""}`}>
                {(x-1) === 0 ? <div className='mb-2 font-bold bg-white text-black rounded-md px-1'>{(y-1)*3}</div>:null}
                {column !== undefined ? 
                <Tooltip key={column.id} className='' content={<>
                        <div>{column.affix.map((affix) => (
                            <HyperLinkTooltip key={affix} str={affix}/>
                    ))}</div>
                    </>} trigger="hover">
                    <div className='hover:cursor-pointer flex flex-col items-center text-sm' onContextMenu={(e) => removePoint(e,column,type)} onClick={() => addPoint(column,type)}>
                        <div className='rounded-full' style={{boxShadow: (isHightlight ? "0px 0px 2px 3px red": "")}}>
                            <img loading="lazy" className={`${profPoint[column.position] === undefined || profPoint[column.position] === 0 ? "contrast-0":""} rounded-full border-4 w-[54px] `} src={`img/icons/${column.position === "0|0" ? "CoreTalentIcon": "TalentIcon"}/${column.icon}.png`} alt="Icon"/>
                        </div>
                        <div>{profPoint[column.position] !== undefined ? profPoint[column.position] : 0}/{column.level_up_time}</div>
                    </div>
                </Tooltip>
                :null}
            </div>
        </React.Fragment>
    );
}
export default TalentNode;