import React, { useState,useContext } from "react"
import { AppContext } from "../context/AppContext";

function Modifier()
{
    const {modifiers} = useContext(AppContext);
    let lastGroup = null;
    let modTab = {};
    modifiers.sort((a,b) => a.group - a.group).forEach((mod) => {
        if(lastGroup === null || lastGroup != mod.group) {
            if(modTab[mod.group] == undefined) {
                modTab[mod.group] = [];    
            }
            modTab[mod.group].push(mod);
        }
    })
    console.log(Object.keys(modTab));
    return (
        <div>
            {Object.keys(modTab).map((e,i) => (
                <div className=''>
                    {e}
                </div>                
            ))}
        </div>
    )
}
export default Modifier;