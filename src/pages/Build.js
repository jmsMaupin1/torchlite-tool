import { useContext,useState,useEffect,lazy,Suspense } from "react";
import { AppContext } from "../context/AppContext";
import { debounce } from "lodash";
const BuildSkill = lazy(() => import("../components/BuildSkill"));

function Build() {
    const {translate} = useContext(AppContext)
    const [currentName,setCurrentName] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [currentType,setCurrentType] = useState(null);

    const onChangeName = debounce(async (e) => {
        if(e.target.value === "") {
            setCurrentName(null);
        } else {
            setCurrentName(e.target.value);
        }
    },1000)

    const formatSkillOption = (skill) => {
        return(
            <div className="skill-option flex flex-row gap-2">
            <img loading="lazy" src={`img/icons/skills/${skill.img}.png`} className="w-[24px]" alt="Icon"/>
            <span>{skill.label}</span>
            </div>
        )
        
    }
    const onChangeSkill = (e,ind) => {
        console.log(e.value,ind);
        
    }
    const onChangeSupport = (e,ind,index) =>
    {
        console.log(e.value,ind,index);
        let skillIndex = ind;
        let supportIndex = index;
        let value = e.value;
    }
    // 5 actives , 3 passives
    // 1 spell , 5 support max
    
    return(
        <div>
            
            <div className='flex flex-col gap-2'>
                {[1,2,3,4,5].map((ind) => (
                    <Suspense fallback={<div>Loading...</div>}>
                        <BuildSkill key={ind} ind={ind} onChangeSupport={onChangeSupport} onChangeSkill={onChangeSkill}/>
                    </Suspense>
                ))}
            </div>
            <div className="flex flex-col">
                <div>passive 1</div>
                <div>passive 2</div>
                <div>passive 3</div>                
            </div>
        </div>
    )
}
export default Build