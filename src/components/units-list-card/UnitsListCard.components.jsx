import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../components/loader-wrapper/LoaderWrapper.component";
import Player from "./Player.component";

import { deleteUnitAsync } from "../../redux/units/units.actions";

import {ReactComponent as VolumeUp} from "../../assets/images/icons/volume-up.svg"
import {ReactComponent as PencilFill} from "../../assets/images/icons/pencil-fill.svg"
import {ReactComponent as Trash} from "../../assets/images/icons/trash3-fill.svg"

import { t } from "i18next";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

const UnitsListCard = (props) => {
   const {      
      itemsList,
      isLoading,
      filter,
      onVolumeClick,
      deleteUnitAsync,
   } = props;

   const navigate = useNavigate()
   const { topicId } = useParams()

   const onConfirm = (topicId, unitId) => {
      if (window.confirm(t("messages.requests.is_sure"))) {
         deleteUnitAsync(unitId, topicId);
      }
   };

   return (
      <LoaderWrapper isLoading={isLoading}>
         <div className="units-list-card">
            {itemsList
               .filter(item => !filter || Object.values(item).join("|").toLowerCase().includes(filter.toLowerCase()))
               .map((item, idx) => (
               <div key={idx} className="units-list-card__item">
                  <div className="units-list-card__item--info-block">
                     <div className="value-text">{item?.value}</div>
                     <div className="translation-text">{item?.translation}</div>
                  </div>
                  <div className="list-card__item--actions-block">

                     {item?.voices.map((sound) => (
                        <Player
                           title={t("actions.play")}
                           key={sound.id}
                           url={sound?.url}
                           onClick={() =>
                              onVolumeClick ? onVolumeClick(item) : false
                           }
                           className="volume-icon__block">
                           <VolumeUp width="24" height="24" />
                        </Player>
                     ))}

                     <div className="unit-action" 
                          title={t("actions.edit")} 
                          onClick={() => navigate(`units/${item?.id}`)}>
                        <PencilFill width="24" height="24"/>
                     </div>

                     <div className="unit-action" 
                          title={t("actions.delete")} 
                          onClick={() => onConfirm(item?.id, topicId)}>
                        <Trash width="24" height="24"/>
                     </div>

                  </div>
               </div>
            ))}
         </div>
      </LoaderWrapper>
   );
};

const mapDispatchToProps = (dispatch) => ({
   deleteUnitAsync: (unitID, topicID) =>
      dispatch(deleteUnitAsync(unitID, topicID)),
});

export default connect(mapDispatchToProps)(UnitsListCard);

