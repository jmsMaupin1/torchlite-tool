import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import HyperLinkTooltip from "../components/HyperLinkTooltip";

function BaseCard({cardData}) {
    const {translate} = useContext(AppContext);

    if(!cardData) return ;

    return(
        <div key={cardData?.id} className='flex flex-col border rounded shadow-md bg-[#222] text-white p-2 gap-2 justify-between'>
            <div className='flex flex-row gap-2 items-center'>
                <div><img loading="lazy" src={`img/icons/${cardData?.icon}.png`} className="w-[64px]" alt="Icon"/></div>
                <div className='flex flex-col'>
                    <div className='title'>{translate(cardData?.name)}</div>
                    <div className='border border-[#333] rounded-md  px-2 text-[#bfbfbf] text-sm'>Require level {cardData?.require_level}</div>
                    <div className='border border-[#333] rounded-md px-2 text-[#bfbfbf] text-sm'>{translate(cardData?.description1)}</div>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {cardData?.suffix !== undefined && cardData?.suffix !== [] ?
                    cardData?.suffix.map((s,i) => (
                        <HyperLinkTooltip key={"suffix-"+i} className='text-center' str={s}/>
                    ))
                    : null}
            </div>
            {/* position = "2/3" weapon, we don't display base_attr for  */}
            {cardData?.base_attr_display !== undefined && cardData?.position?.indexOf("2") === -1 && cardData?.position?.indexOf("2|3") === -1 &&
                <div className=''>
                    <div className='base_list flex flex-col text-center'>
                        {cardData?.base_attr_display?.map((attr,i) => (
                            <div key={i}>{attr}</div>
                        ))}
                    </div>
                </div>
                }
        </div>
    )
}
export default React.memo(BaseCard);
