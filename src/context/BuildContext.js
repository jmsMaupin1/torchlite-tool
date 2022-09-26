import {createContext,useState,useEffect,useRef} from 'react';
const BuildContext = createContext();

const BuildContextProvider = (props) => {

    const [modalVisible,setModalVisible] = useState(false);    
    const [currentModalType,setCurrentModalType] = useState(null);
    const [currentPrimary,setCurrentPrimary] = useState(null);
    const [currentSecondary,setCurrentSecondary] = useState(null);

    const [skill1,setSkill1] = useState({skill: {},support: [{},{},{},{},{}]})
    const [skill2,setSkill2] = useState({skill: {},support: [{},{},{},{},{}]})
    const [skill3,setSkill3] = useState({skill: {},support: [{},{},{},{},{}]})
    const [skill4,setSkill4] = useState({skill: {},support: [{},{},{},{},{}]})
    const [skill5,setSkill5] = useState({skill: {},support: [{},{},{},{},{}]})

    const changePrimarySecondary = (primary,secondary) => {
        setCurrentPrimary(primary);
        setCurrentSecondary(secondary);
    }
    const openModal = () => {
        //console.log("openModal");
        setModalVisible(true);
    }
    const closeModal = () => {
        //console.log("close modal");
        setModalVisible(false);
    }
    const getSkillByPrimary = (primary)  => {
        let currentSkill = null;
        switch (primary) {
            case 1:
                currentSkill = skill1
                break;
            case 2:
                currentSkill = skill2
                break;
            case 3:
                currentSkill = skill3
                break;
            case 4:
                currentSkill = skill4
                break;
            case 5:
                currentSkill = skill5
                break;
            default:
                break;
        }
        return currentSkill.skill;
    }
    const onChangeSkill = (e) => {
        //primary skill
        let currentSkill = null;
        let currentFnc = null;
        switch (currentPrimary) {
            case 1:
                currentSkill = {...skill1}
                currentFnc = setSkill1
                break;
            case 2:
                currentSkill = {...skill2}
                currentFnc = setSkill2
                break;
            case 3:
                currentSkill = {...skill3}
                currentFnc = setSkill3
                break;
            case 4:
                currentSkill = {...skill4}
                currentFnc = setSkill4
                break;
            case 5:
                currentSkill = {...skill5}
                currentFnc = setSkill5
                break;
            default:
                break;
        }
        if(currentSecondary === 0) {
            currentSkill.skill = e;    
        } else {
            currentSkill.support[currentSecondary] = e;
        }
        
        currentFnc(currentSkill);
        closeModal();
    }

    return (
        <BuildContext.Provider value={{
            onChangeSkill,
            skill1,
            skill2,
            skill3,
            skill4,
            skill5,
            modalVisible,openModal,closeModal,setModalVisible,changePrimarySecondary,getSkillByPrimary,setCurrentModalType,currentModalType,currentPrimary,currentSecondary}}>
            { props.children }
        </BuildContext.Provider>
    )
}
export { BuildContextProvider, BuildContext }