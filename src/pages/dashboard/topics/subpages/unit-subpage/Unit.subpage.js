import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import UnitsListCard from "components/units-list-card/UnitsListCard.components";
//EFFECTS
import useInput from "effects/useInput.effect";
//ACTIONS
import {
   getSingleTopicAsync,
   publishTopicAsync,
} from "redux/topics/topics.actions.js";
import { setSelectedUnit, deleteUnitAsync } from "redux/units/units.actions";
//IMAGES
import plusIcon from "assets/images/topics/plus.png";

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
   const history = useHistory();

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
      if (window.confirm("Вы уверены?")) {
         deleteUnitAsync(selectedUnit?.id, singleTopicData?.id);
      }
   };

   const publishTopic = () => {
      publishTopicAsync(id, history);
   };

   const actionItems = [
      {
         name: "Редактировать",
         action: () =>
            history.push(
               `/topics/${singleTopicData?.id}/units/${selectedUnit?.id}/edit`
            ),
      },
      { name: "Удалить", action: () => onConfirm() },
   ];

   return (
      <div className="unit-subpage">
         <div className="unit-subpage__heading-block">
            <h1>{singleTopicData?.text}</h1>
            <div>
               <Input
                  name="search"
                  value={inputState.search}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  type="text"
                  placeholder="Поиск"
                  required
               />
            </div>
         </div>
         <div className="unit-subpage__settings-panel">
            <Button
               onClick={() =>
                  history.push(`/topics/${singleTopicData?.id}/units/new`)
               }
               className="unit-subpage__settings-panel__plus-button"
               src={plusIcon}>
               Новый юнит
            </Button>
            <Button
               onClick={publishTopic}
               isLoading={publishTopicLoading}
               disabled={singleTopicData?.samples?.length <= 0}
               className="unit-subpage__settings-panel__publish-button">
               Опубликовать
            </Button>
            <Button
               onClick={() => console.log("filtr")}
               className="unit-subpage__settings-panel__filtr-button">
               Фильтр
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
   publishTopicAsync: (topicID, history) =>
      dispatch(publishTopicAsync(topicID, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnitSubpage);
