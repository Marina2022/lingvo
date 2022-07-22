import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useOutlet, useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../../components/input/Input.component";
import Button from "../../../../components/button/Button.component";
import UnitsListCard from "../../../../components/units-list-card/UnitsListCard.components";
//EFFECTS
import useInput from "../../../../effects/useInput.effect";
//ACTIONS
import {
   getSingleTopicAsync,
   publishTopicAsync,
} from "../../../../redux/topics/topics.actions.js";
import { setSelectedUnit, deleteUnitAsync } from "../../../../redux/units/units.actions";
//IMAGES
import plusIcon from "../../../../assets/images/topics/plus.png";
import { t } from "i18next";

const Units = (props) => {
   const {
      getSingleTopicAsync,
      selectedUnit,
      setSelectedUnit,
      singleTopicData,
      isSingleTopicLoading,
      deleteUnitAsync,
      publishTopicAsync,
      publishTopicLoading,
   } = props;
   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();
   const navigate = useNavigate();
   
   let { topicId } = useParams();

   useEffect(() => {
      if (topicId) {
         getSingleTopicAsync(topicId);
      }
      //eslint-disable-next-line
   }, []);

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const onConfirm = () => {
      if (window.confirm(t("requests.is_sure"))) {
         deleteUnitAsync(selectedUnit?.id, singleTopicData?.id);
      }
   };

   const publishTopic = () => {
      publishTopicAsync(topicId, navigate);
   };

   const actionItems = [
      { name: t("actions.edit")  , action: () => navigate(`units/${selectedUnit?.id}`), },
      { name: t("actions.delete"), action: () => onConfirm() },
   ];

   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   // const [initCrumbs, setInitCrumbs] = useState([...crumbs])
   // setCrumbs(c => [...c, { name:singleTopicData?.text, path:singleTopicData?.id }])
   
   const outlet = useOutlet();

   useEffect(() => {
      // outlet ?
      setCrumbs(c => [...c, { key: lastKey + 1, name:singleTopicData?.text, path:singleTopicData?.id }]) 
      // :
      // setCrumbs(initCrumbs)
   }, [lastKey, setCrumbs, singleTopicData?.id, singleTopicData?.text])

   return (
      outlet ?
      <Outlet context={[crumbs, setCrumbs, lastKey + 1]} /> :      
      <div className="unit-subpage">
         <div className="unit-subpage__heading-block">
            <div>
               <Input
                  name="search"
                  value={inputState.search}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  type="text"
                  placeholder={t("actions.search")}
                  required
               />
            </div>
         </div>
         <div className="unit-subpage__settings-panel">
            <Button
               onClick={() =>
                  navigate(`units/new`)
               }
               className="unit-subpage__settings-panel__plus-button"
               src={plusIcon}>
               {t("actions.create")}
            </Button>
            <Button
               onClick={publishTopic}
               isLoading={publishTopicLoading}
               disabled={singleTopicData?.samples?.length <= 0}
               className="unit-subpage__settings-panel__publish-button">
               {t("actions.publish")}
            </Button>
            <Button
               onClick={() => console.log("filtr")}
               className="unit-subpage__settings-panel__filtr-button">
               {t("actions.filter")}
            </Button>
         </div>
         <div className="unit-subpage__samples-list">
            <UnitsListCard
               itemsList={singleTopicData?.samples || []}
               isLoading={isSingleTopicLoading}
               actionItems={actionItems}
               onMenuClick={setSelectedUnit}
            />
         </div>
      </div>
   );
};

const mapStateToProps = (state) => {
   const { topics, units } = state;
   return {
      selectedUnit: units.selectedUnit,
      singleTopicData: topics.singleTopicData,
      isSingleTopicLoading: topics.isSingleTopicLoading,
      publishTopicLoading: topics.publishTopicLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getSingleTopicAsync: (id) => dispatch(getSingleTopicAsync(id)),
   setSelectedUnit: (unit) => dispatch(setSelectedUnit(unit)),
   deleteUnitAsync: (unitID, topicID) =>
      dispatch(deleteUnitAsync(unitID, topicID)),
   publishTopicAsync: (topicID, navigate) =>
      dispatch(publishTopicAsync(topicID, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
