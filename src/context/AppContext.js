import {createContext} from 'react';
import en from './../data/en.json';

const AppContext = createContext();

const AppContextProvider = (props) => {

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
        let myReg = /<e[^>]*>(.*?)<\/e>/img;
        return str.replace(myReg,"<a style='color:white;font-weight:bold' href=''>$1</a>").replace("\\n","<br>");
    }
    return (
        <AppContext.Provider value={{translate,replaceTag}}>
            { props.children }
        </AppContext.Provider>
    )
}
export { AppContextProvider, AppContext }