import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../../../components/input/Input.component";
import Button from "../../../../../components/button/Button.component";
import UnitsListCard from "../../../../../components/units-list-card/UnitsListCard.components";
//EFFECTS
import useInput from "../../../../../effects/useInput.effect";
//ACTIONS
import {
   getSingleTopicAsync,
   publishTopicAsync,
} from "../../../../../redux/topics/topics.actions.js";
import { setSelectedUnit, deleteUnitAsync } from "../../../../../redux/units/units.actions";
//IMAGES
import plusIcon from "../../../../../assets/images/topics/plus.png";
import { t } from "i18next";

const UnitSubpage = (props) => {
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

   let { id } = useParams();

   useEffect(() => {
      if (id) {
         getSingleTopicAsync(id);
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
      publishTopicAsync(id, navigate);
   };

   const actionItems = [
      {
         name: t("actions.edit"),
         action: () =>
            navigate(
               `/topics/${singleTopicData?.id}/units/${selectedUnit?.id}/edit`
            ),
      },
      { name: t("actions.delete"), action: () => onConfirm() },
   ];

   return (
      <div className="unit-subpage">
         <div className="unit-subpage__heading-block">
            <h1>{t("units.title1", {theme:singleTopicData?.text})}</h1>
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
                  navigate(`/topics/${singleTopicData?.id}/units/new`)
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

export default connect(mapStateToProps, mapDispatchToProps)(UnitSubpage);
