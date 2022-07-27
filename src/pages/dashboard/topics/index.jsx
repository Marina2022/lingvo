import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS
import Tab from "../../../components/tab/Tab.component";
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//TABS
// import PublishedTopics from "./components/topics-published";
// import DraftTopicsTab from "./components/topics-draft";
//ACTIONS
import { getTopicsAsync } from "../../../redux/topics/topics.actions";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//IMAGES
import plusIcon from "../../../assets/images/topics/plus.png";
import { t } from 'i18next'
import { BuildBreadcrumbs } from "../layout/breadcrumbs";
import TopicList from "./components/topic-list";
import GridItem from "../../../components/grid-item/GridItem.component";
import GridContainer from "../../../components/grid-container/GridContainer.component";

const Topics = (props) => {
   const { getTopicsAsync, publishedTopicsCount, draftTopicsCount } = props;
   const navigate = useNavigate();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   useEffect(() => {
      getTopicsAsync();
   }, [getTopicsAsync]);

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const list = [
      {
         eventKey: "topics",
         title: t("trainings.training_list.published", {count:publishedTopicsCount}),
         content: <TopicList published filter={inputState.search} />,
      },
      {
         eventKey: "drafts",
         title: t("trainings.training_list.drafts", {count:draftTopicsCount}),
         content: <TopicList filter={inputState.search} />,
      },
   ];

   const [crumbs, setCrumbs] = useState([{ key: 0, name: t("trainings.title"), path: "topics" }]);

   const outlet = useOutlet()

   useEffect(() => {
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (!outlet) {
         setCrumbs([{ key: 0, name: t("trainings.title"), path: "topics"}])
      }
   }
   , [outlet])

   const [key, setKey] = useState(list[0]?.eventKey);

   const TopicBody = () => {
      return <>
         <div className="topics-page__heading-block">
            <GridContainer item xs={12} justifyContent="space-between">
               <GridItem xs={12} sm={8}>
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
               <GridItem xs={12} sm={4}>
                  <div className="settings-panel">
                     <Button
                        onClick={() => navigate("/topics/new")}
                        className="settings-panel__plus-icon"
                        src={plusIcon}>
                        {t("actions.create")}
                     </Button>
                  </div>
               </GridItem>
            </GridContainer>
         </div>
         <Tab tabsList={list} keyParam={[key, setKey]}/>
      </>
   }

   return (
      <div className="topics-page">
         <BuildBreadcrumbs crumbs={crumbs} />
         {
            outlet ?
            // shows child element
            <Outlet context={[crumbs, setCrumbs, 0]}/> : 
            // shows topic element
            <TopicBody />
         }
      </div>
   )
   
};

const mapStateToProps = (state) => {
   const { topics } = state;

   return {
      publishedTopicsCount: topics.publishedTopicsCount,
      draftTopicsCount: topics.draftTopicsCount,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getTopicsAsync: () => dispatch(getTopicsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
