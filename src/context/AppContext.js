import {createContext,useState,useEffect} from 'react';
import en from './../data/en.json';


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