import React, { useState,useContext } from "react"
import mod from './../data/modifiers.json';

function Modifier()
{
    let lastGroup = null;
    let modTab = {};
    mod.sort((a,b) => a.group - a.group).forEach((mod) => {
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
                    
                </div>                
            ))}
        </div>
    )
}
export default Modifier;