import {createContext,useState,useEffect} from 'react';
import en from './../data/en.json';
import {Tooltip} from 'flowbite-react'

const AppContext = createContext();

const AppContextProvider = (props) => {

    const [currentPage,setCurrentPage] = useState(null);

    const [skills,setSkills] = useState(null);
    
    useEffect(() => {
        import('./../data/skills.json').then(data => {
            console.log("loaded skills");
            setSkills(data.default);
        })
    },[]) 

    const translate = (key) => {
        let data = en.find((e) => e.index === key);
        if(data !== undefined) {
            let myReg = /<e[^>]*>(.*?)<\/e>/img;
            return data.value.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>").replace("\\n","<br>");
        } else {
            return key;
        }

        /*
                <Tooltip key={tree.id+"-"+index} content={<div>{tree.affix.map((affix) => (
                    <div key={affix} dangerouslySetInnerHTML={{__html: replaceTag(affix)}}></div>
                ))}</div>}>
                <div onClick={() => setVisible(!visible)} className={`relative border rounded-md p-2 hover:cursor-pointer items-center flex flex-col ${index === 2 ? 'mr-10':''} `}>
                    <div><img loading="lazy" className='w-[54px]' src={`img/icons/CoreTalentIcon/${tree.icon}.png`} alt="Icon"/></div>
                    <div>{translate(tree.name)}</div>
                </div>     
                </Tooltip>
        */
    }
    const replaceTag = (str) => {
        if(Array.isArray(str)) {
            str = str[0];
        }
        if(str === null){
            return "";
        }
        let myReg = /<e[^>]*>(.*?)<\/e>/img;
        return str.replace(myReg,"<a style='color:#00ffff;font-weight:bold' href=''>$1</a>").replace("\\n","<br>");
    }
    const sortAlpha = (a,b) => {
        let transA = translate(a.name);
        let transB = translate(b.name);

        return transA.localeCompare(transB);
    }

    return (
        <AppContext.Provider value={{translate,replaceTag,setCurrentPage,currentPage,sortAlpha,skills}}>
            { props.children }
        </AppContext.Provider>
    )
}
export { AppContextProvider, AppContext }