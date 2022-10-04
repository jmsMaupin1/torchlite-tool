import {useContext} from 'react'
import {Tooltip} from 'flowbite-react'
import { AppContext } from '../context/AppContext';

function HyperLinkTooltip({str,className,style})
{
    const {en} = useContext(AppContext);
    
    if(Array.isArray(str)) {
        str = str[0];
    }
    if(str === null || str === undefined){
        return "";
    }
    let myReg = /<e([^>]*)[^>]*>(.*?)<\/e>/img
    let myMatch = myReg.exec(str);
    let content = null;
    if(myMatch !== null) {
        let myId = myMatch[1].replace("id=","").replace(" ","")
        content = en.find((h) => h.index === "hyperlink|des|"+myId)
        if(content !== undefined) {
            content = content.value.replaceAll("\\n","<br>");
        }
    }
    let myStringReturn = str.replace(myReg,"<a style='color:#ffc130;font-weight:bold' class='tooltip hover:cursor-pointer' href=''>$2</a>").replaceAll("\\n","<br>")
    if(content== null) {
        return (
            <div style={style} className={className} dangerouslySetInnerHTML={{__html: myStringReturn}}></div>
        )
    } else {
        return (
            <Tooltip content={<div dangerouslySetInnerHTML={{__html: content}}></div>} trigger="hover">
                <div style={style} className={className} dangerouslySetInnerHTML={{__html: myStringReturn}}></div>
            </Tooltip>
        )
    }
    
}
export default HyperLinkTooltip;