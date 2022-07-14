import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../components/loader-wrapper/LoaderWrapper.component";
import DropDown from "../../components/drop-down/DropDown.component";
import Player from "./Player.component";
//IMAGES
import actionsIcon from "../../assets/images/list-card/actions-icon.png";
import volumeIcon from "../../assets/images/list-card/volume-icon.png";

const UnitsListCard = (props) => {
   const {
      itemsList,
      isLoading,
      actionItems,
      onMenuClick,
      onVolumeClick,
   } = props;

   return (
      <LoaderWrapper isLoading={isLoading}>
         <div className="units-list-card">
            {itemsList.map((item, idx) => (
               <div key={idx} className="units-list-card__item">
                  <div className="units-list-card__item--info-block">
                     <div className="value-text">{item?.value}</div>
                     <div className="translation-text">{item?.translation}</div>
                  </div>
                  <div className="list-card__item--actions-block">
                     {item?.voices.map((sound) => (
                        <Player
                           key={sound.id}
                           url={sound?.url}
                           onClick={() =>
                              onVolumeClick ? onVolumeClick(item) : false
                           }
                           className="volume-icon__block">
                           <img src={volumeIcon} alt="volumeIcon" />
                        </Player>
                     ))}

                     {actionItems && (
                        <div
                           onClick={() =>
                              onMenuClick ? onMenuClick(item) : false
                           }>
                           <DropDown
                              src={actionsIcon}
                              menuItems={actionItems}
                           />
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </LoaderWrapper>
   );
};

export default UnitsListCard;
