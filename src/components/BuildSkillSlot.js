import { BuildContext } from '../context/BuildContext';
import {useContext} from 'react';

function BuildSkillSlot(props)
{
    const {changePrimarySecondary,setCurrentModalType,openModal,skill1,skill2,skill3,skill4,skill5} = useContext(BuildContext);
    const primary = props.primary;
    const secondary = props.secondary
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
    let currentSupport = currentSkill.support[secondary]
    console.log("currentSupport",currentSupport)
    console.log("currentSkill",currentSkill)
    console.log("secondary",secondary)
    const onClickSkill = () => {
        setCurrentModalType("Support");
        changePrimarySecondary(primary,secondary);
        openModal();
    }
    return(
        <div className='flex flex-col justify-center items-center'>
            <div onClick={() => onClickSkill()} style={{fontSize:"35px"}} className='w-[50px] h-[50px] hover:cursor-pointer border rounded-full items-center justify-center flex flex-col'>
                {currentSupport !== undefined && Object.keys(currentSupport).length > 0 ? 
                    <>
                    <div>
                        <img loading="lazy" src={`img/icons/skills/${currentSupport.img}.png`} className="w-[50px]" alt="Icon"/>
                    </div>
                    </>
                    :
                    <div className='-mt-[5px]'>+</div>
                }
            </div>
            {currentSupport !== undefined && Object.keys(currentSupport).length > 0 ? <div className='mt-[20%] max-w-[120px] absolute flex-wrap text-sm text-center'>{currentSupport.label}</div>:null}    
        </div>
    )
}
export default BuildSkillSlot;