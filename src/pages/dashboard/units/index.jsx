import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, useLocation, useOutlet, useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
import UnitsListCard from "./unit-list";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//ACTIONS
import {
   getSingleTopicAsync,
   publishTopicAsync,
} from "../../../redux/topics/topics.actions.js";
// import { setSelectedUnit, deleteUnitAsync } from "../../../../redux/units/units.actions";
//IMAGES
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { t } from "i18next";
import { addCrumbs } from "../layout/breadcrumbs";
import { Grid } from "@mui/material";

const Units = (props) => {
   const {
      stateTopicsIsSingleTopicLoading,
      stateTopicsPublishTopicLoading,
      stateTopicsSingleTopicData,

      dispatchGetSingleTopicAsync,
      dispatchPublishTopicAsync,
   } = props;

   const { inputState, handleInput, handleInvalidMessage, invalidMessages, } = useInput();
   
   const navigate = useNavigate();
   
   const { topicId } = useParams();

   const location = useLocation()

   useEffect(() => { 
      if (
         location.pathname.match(/^\/topics\/\d+$/i) &&
         !stateTopicsIsSingleTopicLoading && 
         topicId && parseInt(topicId) !== stateTopicsSingleTopicData?.id
      ) {
         dispatchGetSingleTopicAsync(topicId) 
      } 
   }, [dispatchGetSingleTopicAsync, location, stateTopicsIsSingleTopicLoading, stateTopicsSingleTopicData?.id, topicId])

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const publishTopic = () => {
      dispatchPublishTopicAsync(topicId, () => dispatchGetSingleTopicAsync(topicId));
   };

   const [crumbs, setCrumbs, lastKey] = useOutletContext();
   
   const outlet = useOutlet();
   const __addCrumbs = addCrumbs

   useEffect(() => {
      // A new crumb to add to breadcrumbs
      const newCrumb = { key: lastKey + 1, name:stateTopicsSingleTopicData?.text, path:stateTopicsSingleTopicData?.id }
      // Verifies if new crumb is not in the breadcrumbs yet
      if (!crumbs.find(c => !Object.keys(newCrumb).find(key => c[key] !== newCrumb[key]))) {
         // Adds new crumb
         setCrumbs(c => __addCrumbs(c, newCrumb))
      }
      if (outlet) {
         setCrumbs(c => __addCrumbs(c, { key: lastKey + 2, name: t("tasks.title"), disable: true}))
      }
   }, [__addCrumbs, crumbs, lastKey, outlet, setCrumbs, stateTopicsSingleTopicData?.id, stateTopicsSingleTopicData?.text])

   return (
      outlet 
      ? <Outlet context={[crumbs, setCrumbs, lastKey + 2]} /> 
      : <>
         <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={6} md={3}>
               <Button 
                  variant="contained"
                  onClick={ () => navigate(`new`) }
                  src={<AddOutlinedIcon/>}
               >
                  {t("actions.create")}
               </Button>
            </Grid>
            <Grid item xs={6} md={3}>
               <Button
                  onClick={publishTopic}
                  isLoading={stateTopicsPublishTopicLoading}
                  disabled={stateTopicsSingleTopicData?.samples?.length <= 0}
                  variant="outlined"
               >
                  {t("actions.publish")}
               </Button>
            </Grid>
         </Grid>
         <UnitsListCard
            itemsList={stateTopicsSingleTopicData?.samples || []}
            isLoading={stateTopicsIsSingleTopicLoading}
            filter={inputState.search}
         />
      </>
   );
};

const mapStateToProps = (state) => {
   const { topics } = state;
   return {
      stateTopicsSingleTopicData: topics.singleTopicData,
      stateTopicsIsSingleTopicLoading: topics.isSingleTopicLoading,
      stateTopicsPublishTopicLoading: topics.publishTopicLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   dispatchGetSingleTopicAsync: (id) => dispatch(getSingleTopicAsync(id)),
   dispatchPublishTopicAsync: (topicID, callback) =>
      dispatch(publishTopicAsync(topicID, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Units);
