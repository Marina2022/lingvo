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
// import { setSelectedUnit, deleteUnitAsync } from "../../../../redux/units/units.actions";
//IMAGES
import plusIcon from "../../../../assets/images/topics/plus.png";
import { t } from "i18next";
import { addCrumbs } from "../../layout/breadcrumbs";
import GridContainer from "../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../components/grid-item/GridItem.component";

const Units = (props) => {
   const {
      getSingleTopicAsync,
      singleTopicData,
      isSingleTopicLoading,
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

   useEffect(() => { topicId && getSingleTopicAsync(topicId)}, [getSingleTopicAsync, topicId])

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const publishTopic = () => {
      publishTopicAsync(topicId, navigate);
   };

   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   
   const outlet = useOutlet();
   const __addCrumbs = addCrumbs

   useEffect(() => {
      // A new crumb to add to breadcrumbs
      const newCrumb = { key: lastKey + 1, name:singleTopicData?.text, path:singleTopicData?.id }
      // Verifies if new crumb is not in the breadcrumbs yet
      if (!crumbs.find(c => !Object.keys(newCrumb).find(key => c[key] !== newCrumb[key]))) {
         // Adds new crumb
         setCrumbs(c => __addCrumbs(c, newCrumb))
      }
   }, [__addCrumbs, crumbs, lastKey, outlet, setCrumbs, singleTopicData?.id, singleTopicData?.text])

   return (
      outlet ?
      <Outlet context={[crumbs, setCrumbs, lastKey + 1]} /> :      
      <div className="unit-subpage">
         <GridContainer item xs={12} justifyContent="space-between">
            <GridItem xs={12} sm={6}>
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
            </GridItem>
            <GridItem container xs={12} sm={6} justifyContent="flex-end">
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
            </GridItem>
         </GridContainer>
         <div className="unit-subpage__samples-list">
            <UnitsListCard
               itemsList={singleTopicData?.samples || []}
               isLoading={isSingleTopicLoading}
               filter={inputState.search}
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
   publishTopicAsync: (topicID, navigate) =>
      dispatch(publishTopicAsync(topicID, navigate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
